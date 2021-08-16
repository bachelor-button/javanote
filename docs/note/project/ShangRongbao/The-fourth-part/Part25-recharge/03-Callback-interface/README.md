# 03-回调接口

## 一、定义回调接口

1、controller

UserAccountController 中创建回调方法

```java
@ApiOperation(value = "用户充值异步回调")
@PostMapping("/notify")
public String notify(HttpServletRequest request) {
Map<String, Object> paramMap = RequestHelper.switchMap(request.getParameterMap());
log.info("用户充值异步回调：" + JSON.toJSONString(paramMap));

    //校验签名
    if(RequestHelper.isSignEquals(paramMap)) {
        //充值成功交易
        if("0001".equals(paramMap.get("resultCode"))) {
            return userAccountService.notify(paramMap);
        } else {
            log.info("用户充值异步回调充值失败：" + JSON.toJSONString(paramMap));
            return "success";
        }
    } else {
        log.info("用户充值异步回调签名错误：" + JSON.toJSONString(paramMap));
        return "fail";
    }

}
```

2、Service

接口：

UserAccountService

```java
String notify(Map<String, Object> paramMap);
```

实现：UserAccountServiceImpl

```java
@Transactional(rollbackFor = Exception.class)
@Override
public String notify(Map<String, Object> paramMap) {

    log.info("充值成功：" + JSONObject.toJSONString(paramMap));

    String bindCode = (String)paramMap.get("bindCode"); //充值人绑定协议号
    String chargeAmt = (String)paramMap.get("chargeAmt"); //充值金额

    //优化
    baseMapper.updateAccount(bindCode, new BigDecimal(chargeAmt), new BigDecimal(0));

    //增加交易流水
    //TODO

    return "success";

}
```

3、创建 Mapper 方法

接口：UserAccountMapper

```java
void updateAccount(
@Param("bindCode")String bindCode,
@Param("amount")BigDecimal amount,
@Param("freezeAmount")BigDecimal freezeAmount);
```

XML：UserAccountMapper.xml

```xml
<update id="updateAccount">
    update
    user_account
    set
    amount = amount + #{amount},
    freeze_amount = freeze_amount + #{freezeAmount}
    where
    user_id = (select id from user_info where bind_code = #{bindCode})
</update>
```

## 二、增加交易流水

1、枚举

TransTypeEnum

```java
CHARGE(1,"充值"),
INVEST_LOCK(2,"投标锁定"),
INVEST_UNLOCK(3,"放款解锁"),
CANCEL_LEND(4,"撤标"),
BORROW_BACK(5,"放款到账"),
RETURN_DOWN(6,"还款扣减"),
INVEST_BACK(7,"出借回款"),
WITHDRAW(8,"提现"),
;
```

2、创建 BO 对象

```java
package com.atguigu.srb.core.pojo.bo;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransFlowBO {

    private String agentBillNo;
    private String bindCode;
    private BigDecimal amount;
    private TransTypeEnum transTypeEnum;
    private String memo;

}
```

3、保存交易流水业务

接口：TransFlowService

```java
void saveTransFlow(TransFlowBO transFlowBO);
```

实现：
TransFlowServiceImpl

```java
@Resource
private UserInfoMapper userInfoMapper;

@Override
public void saveTransFlow(TransFlowBO transFlowBO) {

    //获取用户基本信息 user_info
    QueryWrapper<UserInfo> userInfoQueryWrapper = new QueryWrapper<>();
    userInfoQueryWrapper.eq("bind_code", transFlowBO.getBindCode());
    UserInfo userInfo = userInfoMapper.selectOne(userInfoQueryWrapper);

    //存储交易流水数据
    TransFlow transFlow = new TransFlow();
    transFlow.setUserId(userInfo.getId());
    transFlow.setUserName(userInfo.getName());
    transFlow.setTransNo(transFlowBO.getAgentBillNo());
    transFlow.setTransType(transFlowBO.getTransTypeEnum().getTransType());
    transFlow.setTransTypeName(transFlowBO.getTransTypeEnum().getTransTypeName());
    transFlow.setTransAmount(transFlowBO.getAmount());
    transFlow.setMemo(transFlowBO.getMemo());
    baseMapper.insert(transFlow);

}
```

4、notify 中调用

UserAccountServiceImpl

```java
@Resource
private TransFlowService transFlowService;

@Transactional(rollbackFor = Exception.class)
@Override
public String notify(Map<String, Object> paramMap) {

    ......

    //增加交易流水
    String agentBillNo = (String)paramMap.get("agentBillNo"); //商户充值订单号
    TransFlowBO transFlowBO = new TransFlowBO(
        agentBillNo,
        bindCode,
        new BigDecimal(chargeAmt),
        TransTypeEnum.RECHARGE,
        "充值");
    transFlowService.saveTransFlow(transFlowBO);

    return "success";

}
```
