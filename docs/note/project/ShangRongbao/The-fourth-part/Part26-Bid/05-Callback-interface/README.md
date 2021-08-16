# 05-回调接口

定义回调接口

1、controller

LendItemController 中创建回调方法

```java
@ApiOperation("会员投资异步回调")
@PostMapping("/notify")
public String notify(HttpServletRequest request) {

    Map<String, Object> paramMap = RequestHelper.switchMap(request.getParameterMap());
    log.info("用户投资异步回调：" + JSON.toJSONString(paramMap));

    //校验签名 P2pInvestNotifyVo
    if(RequestHelper.isSignEquals(paramMap)) {
        if("0001".equals(paramMap.get("resultCode"))) {
            lendItemService.notify(paramMap);
        } else {
            log.info("用户投资异步回调失败：" + JSON.toJSONString(paramMap));
            return "fail";
        }
    } else {
        log.info("用户投资异步回调签名错误：" + JSON.toJSONString(paramMap));
        return "fail";
    }
    return "success";

}
```

2、Service

实现回调的业务

接口：LendItemService

```java
void notify(Map<String, Object> paramMap);
```

实现：LendItemServiceImpl

```java
@Resource
private TransFlowService transFlowService;

@Resource
private UserAccountMapper userAccountMapper;

@Transactional(rollbackFor = Exception.class)
@Override
public void notify(Map<String, Object> paramMap) {

    log.info("投标成功");

    //获取投资编号
    String agentBillNo = (String)paramMap.get("agentBillNo");

    boolean result = transFlowService.isSaveTransFlow(agentBillNo);
    if(result){
        log.warn("幂等性返回");
        return;
    }

    //获取用户的绑定协议号
    String bindCode = (String)paramMap.get("voteBindCode");
    String voteAmt = (String)paramMap.get("voteAmt");

    //修改商户系统中的用户账户金额：余额、冻结金额
    userAccountMapper.updateAccount(bindCode, new BigDecimal("-" + voteAmt), new BigDecimal(voteAmt));

    //修改投资记录的投资状态改为已支付
    LendItem lendItem = this.getByLendItemNo(agentBillNo);
    lendItem.setStatus(1);//已支付
    baseMapper.updateById(lendItem);

    //修改标的信息：投资人数、已投金额
    Long lendId = lendItem.getLendId();
    Lend lend = lendMapper.selectById(lendId);
    lend.setInvestNum(lend.getInvestNum() + 1);
    lend.setInvestAmount(lend.getInvestAmount().add(lendItem.getInvestAmount()));
    lendMapper.updateById(lend);

    //新增交易流水
    TransFlowBO transFlowBO = new TransFlowBO(
        agentBillNo,
        bindCode,
        new BigDecimal(voteAmt),
        TransTypeEnum.INVEST_LOCK,
        "投资项目编号：" + lend.getLendNo() + "，项目名称：" + lend.getTitle());
    transFlowService.saveTransFlow(transFlowBO);

}
```

3、辅助方法

LendItemServiceImpl

```java
private LendItem getByLendItemNo(String lendItemNo) {
QueryWrapper<LendItem> queryWrapper = new QueryWrapper();
queryWrapper.eq("lend_item_no", lendItemNo);
return baseMapper.selectOne(queryWrapper);
}
```
