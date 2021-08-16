# 02-管理平台放款

## 一、后端接口

1、Controller

AdminLendController

```java
@ApiOperation("放款")
@GetMapping("/makeLoan/{id}")
public R makeLoan(
@ApiParam(value = "标的 id", required = true)
@PathVariable("id") Long id) {
lendService.makeLoan(id);
return R.ok().message("放款成功");
}
```

2、满标放款

接口：
LendService

/\*\*
_ 满标放款
_ @param lendId
\*/
void makeLoan(Long lendId);

实现：LendServiceImpl

```java
@Resource
private UserInfoMapper userInfoMapper;

@Resource
private UserAccountMapper userAccountMapper;

@Resource
private LendItemService lendItemService;

@Resource
private TransFlowService transFlowService;

@Transactional(rollbackFor = Exception.class)
@Override
public void makeLoan(Long lendId) {
//获取标的信息
Lend lend = baseMapper.selectById(lendId);

    //放款接口调用
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("agentId", HfbConst.AGENT_ID);
    paramMap.put("agentProjectCode", lend.getLendNo());//标的编号
    String agentBillNo = LendNoUtils.getLoanNo();//放款编号
    paramMap.put("agentBillNo", agentBillNo);

    //平台收益，放款扣除，借款人借款实际金额=借款金额-平台收益
    //月年化
    BigDecimal monthRate = lend.getServiceRate().divide(new BigDecimal(12), 8, BigDecimal.ROUND_DOWN);
    //平台实际收益 = 已投金额 * 月年化 * 标的期数
    BigDecimal realAmount = lend.getInvestAmount().multiply(monthRate).multiply(new BigDecimal(lend.getPeriod()));

    paramMap.put("mchFee", realAmount); //商户手续费(平台实际收益)
    paramMap.put("timestamp", RequestHelper.getTimestamp());
    String sign = RequestHelper.getSign(paramMap);
    paramMap.put("sign", sign);

    log.info("放款参数：" + JSONObject.toJSONString(paramMap));
    //发送同步远程调用
    JSONObject result = RequestHelper.sendRequest(paramMap, HfbConst.MAKE_LOAD_URL);
    log.info("放款结果：" + result.toJSONString());

    //放款失败
    if (!"0000".equals(result.getString("resultCode"))) {
        throw new BusinessException(result.getString("resultMsg"));
    }

    //更新标的信息
    lend.setRealAmount(realAmount);
    lend.setStatus(LendStatusEnum.PAY_RUN.getStatus());
    lend.setPaymentTime(LocalDateTime.now());
    baseMapper.updateById(lend);

    //获取借款人信息
    Long userId = lend.getUserId();
    UserInfo userInfo = userInfoMapper.selectById(userId);
    String bindCode = userInfo.getBindCode();

    //给借款账号转入金额
    BigDecimal total = new BigDecimal(result.getString("voteAmt"));
    userAccountMapper.updateAccount(bindCode, total, new BigDecimal(0));

    //新增借款人交易流水
    TransFlowBO transFlowBO = new TransFlowBO(
        agentBillNo,
        bindCode,
        total,
        TransTypeEnum.BORROW_BACK,
        "借款放款到账，编号：" + lend.getLendNo());//项目编号
    transFlowService.saveTransFlow(transFlowBO);

    //获取投资列表信息
    List<LendItem> lendItemList = lendItemService.selectByLendId(lendId, 1);
    lendItemList.stream().forEach(item -> {

        //获取投资人信息
        Long investUserId = item.getInvestUserId();
        UserInfo investUserInfo = userInfoMapper.selectById(investUserId);
        String investBindCode = investUserInfo.getBindCode();

        //投资人账号冻结金额转出
        BigDecimal investAmount = item.getInvestAmount(); //投资金额
        userAccountMapper.updateAccount(investBindCode, new BigDecimal(0), investAmount.negate());

        //新增投资人交易流水
        TransFlowBO investTransFlowBO = new TransFlowBO(
            LendNoUtils.getTransNo(),
            investBindCode,
            investAmount,
            TransTypeEnum.INVEST_UNLOCK,
            "冻结资金转出，出借放款，编号：" + lend.getLendNo());//项目编号
        transFlowService.saveTransFlow(investTransFlowBO);
    });

    //放款成功生成借款人还款计划和投资人回款计划
    // TODO

}
```

3、根据 lendId 获取投资记录

接口：LendItemService

```java
List<LendItem> selectByLendId(Long lendId, Integer status);
```

实现：LendItemServiceImpl

```java
@Override
public List<LendItem> selectByLendId(Long lendId, Integer status) {
QueryWrapper<LendItem> queryWrapper = new QueryWrapper();
queryWrapper.eq("lend_id", lendId);
queryWrapper.eq("status", status);
List<LendItem> lendItemList = baseMapper.selectList(queryWrapper);
return lendItemList;
}
```

## 二、前端整合

srb-admin

1、定义 api

创建 src/api/core/lend.js

```js
makeLoan(id) {
return request({
url: `/admin/core/lend/makeLoan/${id}`,
method: 'get'
})
}
```

2、页面模板

src/views/core/lend/list.vue

```vue
<el-button
  v-if="scope.row.status == 1"
  type="warning"
  size="mini"
  @click="makeLoan(scope.row.id)"
>
放款
</el-button>
```

3、页面脚本

src/views/core/lend/list.vue

```vue
makeLoan(id) { this.$confirm('确定放款吗?', '提示', { confirmButtonText: '确定',
cancelButtonText: '取消', type: 'warning' }) .then(() => { return
lendApi.makeLoan(id) }) .then(response => { //放款成功则重新获取数据列表
this.fetchData() this.$message({ type: 'success', message: response.message })
}) .catch(error => { console.log('取消', error) if (error === 'cancel') {
this.\$message({ type: 'info', message: '已取消放款' }) } }) }
```

4、页面投资记录和回款计划

/views/core/lend/detail.vue

```vue
<h4>投资记录</h4>
<el-table :data="lendItemList" stripe style="width: 100%" border>
      <el-table-column type="index" label="序号" width="70" align="center" />
      <el-table-column prop="lendItemNo" label="投资编号" />
      <el-table-column prop="investName" label="投资用户" />
      <el-table-column prop="investAmount" label="投资金额" />
      <el-table-column label="年化利率">
        <template slot-scope="scope">
          {{ scope.row.lendYearRate * 100 }}%
        </template>
      </el-table-column>
      <el-table-column prop="investTime" label="投资时间" />
      <el-table-column prop="lendStartDate" label="开始日期" />
      <el-table-column prop="lendEndDate" label="结束日期" />
      <el-table-column prop="expectAmount" label="预期收益" />
      <el-table-column prop="investTime" label="投资时间" />
    </el-table>

<h4>还款计划</h4>
<el-table :data="lendReturnList" stripe style="width: 100%" border>
      <el-table-column type="index" label="序号" width="70" align="center" />
      <el-table-column prop="currentPeriod" label="当前的期数" />
      <el-table-column prop="principal" label="本金" />
      <el-table-column prop="interest" label="利息" />
      <el-table-column prop="total" label="本息" />
      <el-table-column prop="returnDate" label="还款日期" width="150" />
      <el-table-column prop="realReturnTime" label="实际还款时间" />
      <el-table-column label="是否逾期">
        <template slot-scope="scope">
          <span v-if="scope.row.overdue">
            是（逾期金额：{{ scope.row.overdueTotal }}元）
          </span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? '未还款' : '已还款' }}
        </template>
      </el-table-column>
    </el-table>
```
