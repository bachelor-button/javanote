# 04-投标

## 一、后端接口

1、实现思路

投标时要在服务器端校验数据：

标的状态必须为募资中

标的不能超卖

账户可用余额充足

2、创建 VO

创建 InvestVO

```java
package com.atguigu.srb.core.pojo.vo;

@Data
@ApiModel(description = "投标信息")
public class InvestVO {

    private Long lendId;

    //投标金额
    private String investAmount;

    //用户id
    private Long investUserId;

    //用户姓名
    private String investName;

}
```

3、Controller

LendItemController

```java
package com.atguigu.srb.core.controller.api;

@Api(tags = "标的的投资")
@RestController
@RequestMapping("/api/core/lendItem")
@Slf4j
public class LendItemController {

 @Resource
LendItemService lendItemService;

    @ApiOperation("会员投资提交数据")
    @PostMapping("/auth/commitInvest")
    public R commitInvest(@RequestBody InvestVO investVO, HttpServletRequest request) {

        String token = request.getHeader("token");
        Long userId = JwtUtils.getUserId(token);
        String userName = JwtUtils.getUserName(token);
        investVO.setInvestUserId(userId);
        investVO.setInvestName(userName);

        //构建充值自动提交表单
        String formStr = lendItemService.commitInvest(investVO);
        return R.ok().data("formStr", formStr);
    }

}
```

4、Service

接口：LendItemService

```java
String commitInvest(InvestVO investVO);
```

实现：LendItemServiceImpl

```java
@Resource
private LendMapper lendMapper;

@Resource
private LendService lendService;

@Resource
private UserAccountService userAccountService;

@Resource
private UserBindService userBindService;

@Override
public String commitInvest(InvestVO investVO) {

    //输入校验==========================================
    Long lendId = investVO.getLendId();
    //获取标的信息
    Lend lend = lendMapper.selectById(lendId);

    //标的状态必须为募资中
    Assert.isTrue(
        lend.getStatus().intValue() == LendStatusEnum.INVEST_RUN.getStatus().intValue(),
        ResponseEnum.LEND_INVEST_ERROR);

    //标的不能超卖：(已投金额 + 本次投资金额 )>=标的金额（超卖）
    BigDecimal sum = lend.getInvestAmount().add(new BigDecimal(investVO.getInvestAmount()));
    Assert.isTrue(sum.doubleValue() <= lend.getAmount().doubleValue(),
                  ResponseEnum.LEND_FULL_SCALE_ERROR);

    //账户可用余额充足：当前用户的余额 >= 当前用户的投资金额（可以投资）
    Long investUserId = investVO.getInvestUserId();
    BigDecimal amount = userAccountService.getAccount(investUserId);//获取当前用户的账户余额
    Assert.isTrue(amount.doubleValue() >= Double.parseDouble(investVO.getInvestAmount()),
                  ResponseEnum.NOT_SUFFICIENT_FUNDS_ERROR);

    //在商户平台中生成投资信息==========================================
    //标的下的投资信息
    LendItem lendItem = new LendItem();
    lendItem.setInvestUserId(investUserId);//投资人id
    lendItem.setInvestName(investVO.getInvestName());//投资人名字
    String lendItemNo = LendNoUtils.getLendItemNo();
    lendItem.setLendItemNo(lendItemNo); //投资条目编号（一个Lend对应一个或多个LendItem）
    lendItem.setLendId(investVO.getLendId());//对应的标的id
    lendItem.setInvestAmount(new BigDecimal(investVO.getInvestAmount())); //此笔投资金额
    lendItem.setLendYearRate(lend.getLendYearRate());//年化
    lendItem.setInvestTime(LocalDateTime.now()); //投资时间
    lendItem.setLendStartDate(lend.getLendStartDate()); //开始时间
    lendItem.setLendEndDate(lend.getLendEndDate()); //结束时间

    //预期收益
    BigDecimal expectAmount = lendService.getInterestCount(
        lendItem.getInvestAmount(),
        lendItem.getLendYearRate(),
        lend.getPeriod(),
        lend.getReturnMethod());
    lendItem.setExpectAmount(expectAmount);

    //实际收益
    lendItem.setRealAmount(new BigDecimal(0));

    lendItem.setStatus(0);//默认状态：刚刚创建
    baseMapper.insert(lendItem);

    //组装投资相关的参数，提交到汇付宝资金托管平台==========================================
    //在托管平台同步用户的投资信息，修改用户的账户资金信息==========================================
    //获取投资人的绑定协议号
    String bindCode = userBindService.getBindCodeByUserId(investUserId);
    //获取借款人的绑定协议号
    String benefitBindCode = userBindService.getBindCodeByUserId(lend.getUserId());

    //封装提交至汇付宝的参数
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("agentId", HfbConst.AGENT_ID);
    paramMap.put("voteBindCode", bindCode);
    paramMap.put("benefitBindCode",benefitBindCode);
    paramMap.put("agentProjectCode", lend.getLendNo());//项目标号
    paramMap.put("agentProjectName", lend.getTitle());

    //在资金托管平台上的投资订单的唯一编号，要和lendItemNo保持一致。
    paramMap.put("agentBillNo", lendItemNo);//订单编号
    paramMap.put("voteAmt", investVO.getInvestAmount());
    paramMap.put("votePrizeAmt", "0");
    paramMap.put("voteFeeAmt", "0");
    paramMap.put("projectAmt", lend.getAmount()); //标的总金额
    paramMap.put("note", "");
    paramMap.put("notifyUrl", HfbConst.INVEST_NOTIFY_URL); //检查常量是否正确
    paramMap.put("returnUrl", HfbConst.INVEST_RETURN_URL);
    paramMap.put("timestamp", RequestHelper.getTimestamp());
    String sign = RequestHelper.getSign(paramMap);
    paramMap.put("sign", sign);

    //构建充值自动提交表单
    String formStr = FormHelper.buildForm(HfbConst.INVEST_URL, paramMap);
    return formStr;

}
```

5、UserBindService

创建一个通用的 Service 方法，以方便调用，根据 userId 获取用户绑定账号

接口：UserBindService

```java
String getBindCodeByUserId(Long userId);
```

实现：UserBindServiceImpl

```java
@Override
public String getBindCodeByUserId(Long userId){
QueryWrapper<UserBind> userBindQueryWrapper = new QueryWrapper<>();
userBindQueryWrapper.eq("user_id", userId);
UserBind userBind = baseMapper.selectOne(userBindQueryWrapper);
String bindCode = userBind.getBindCode();
return bindCode;
}
```

## 二、前端整合

投资

pages/lend/\_id.vue

```vue
//投资 commitInvest() { //校验用户是否登录 let userInfo = cookie.get('userInfo')
// console.log(typeof userInfo) // console.log(!userInfo) //true if (!userInfo)
{ window.location.href = '/login' return } //校验当前用户是否是投资人 let
userInfoObj = JSON.parse(userInfo) if (userInfoObj.userType == 2) { //借款人
this.$message.error('借款人无法投资') return }
console.log(this.lend.investAmount) console.log(this.invest.investAmount)
console.log(this.lend.amount) //判断标的是否超卖：标的已投金额 + 本次投资金额 >
标的总金额 if ( this.lend.investAmount + Number(this.invest.investAmount) >
this.lend.amount ) { this.$message.error('标的可投资金额不足') return }
//是否是100的整数倍 // console.log(this.invest.investAmount) //
console.log(Number(this.invest.investAmount)) // console.log(typeof
Number(this.invest.investAmount)) // return if (
Number(this.invest.investAmount) === 0 || this.invest.investAmount %
this.lend.lowestAmount != 0 ) {
this.$message.error(`投资金额必须是${this.lend.lowestAmount}的整数倍`) return }
//余额的判断 if (this.invest.investAmount > this.account) {
this.$message.error('余额不足，请充值') return } //数据提交 this.$alert( '
<div style="size: 18px;color: red;">您即将前往汇付宝确认标的</div>
', '前往汇付宝资金托管平台', { dangerouslyUseHTMLString: true,
confirmButtonText: '立即前往', callback: (action) => { console.log('action',
action) if (action === 'confirm') { this.invest.lendId = this.lend.id
this.$axios .$post('/api/core/lendItem/auth/commitInvest', this.invest)
.then((response) => { // console.log(response.data.formStr) // debugger
document.write(response.data.formStr) }) } }, } ) }
```
