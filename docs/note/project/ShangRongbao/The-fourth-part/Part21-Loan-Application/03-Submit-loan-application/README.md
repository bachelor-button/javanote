# 03-提交借款申请

## 一、后端实现

1、实现思路

借款人提交借款要判断借款人账户绑定状态与借款人信息审批状态，只有这两个状态都成立才能借款，这两个状态都在会员表中

目标：将借款申请表单中用户填写的数据保存在 borrow_info 数据库表中

2、枚举

BorrowInfoStatusEnum

```java
    NO_AUTH(0, "未提交"),
    CHECK_RUN(1, "审核中"),
    CHECK_OK(2, "审核通过"),
    CHECK_FAIL(-1, "审核不通过"),
    ;
```

状态（0：未提交，1：审核中， 2：审核通过， -1：审核不通过）

3、Controller

BorrowInfoController

```java
@ApiOperation("提交借款申请")
@PostMapping("/auth/save")
public R save(@RequestBody BorrowInfo borrowInfo, HttpServletRequest request) {

    String token = request.getHeader("token");
    Long userId = JwtUtils.getUserId(token);
    borrowInfoService.saveBorrowInfo(borrowInfo, userId);
    return R.ok().message("提交成功");

}
```

4、Service

接口：BorrowInfoService

```java
void saveBorrowInfo(BorrowInfo borrowInfo, Long userId);
```

实现：BorrowInfoServiceImpl

```java
@Override
public void saveBorrowInfo(BorrowInfo borrowInfo, Long userId) {

    //获取userInfo的用户数据
    UserInfo userInfo = userInfoMapper.selectById(userId);

    //判断用户绑定状态
    Assert.isTrue(
        userInfo.getBindStatus().intValue() == UserBindEnum.BIND_OK.getStatus().intValue(),
        ResponseEnum.USER_NO_BIND_ERROR);

    //判断用户信息是否审批通过
    Assert.isTrue(
        userInfo.getBorrowAuthStatus().intValue() == BorrowerStatusEnum.AUTH_OK.getStatus().intValue(),
        ResponseEnum.USER_NO_AMOUNT_ERROR);

    //判断借款额度是否足够
    BigDecimal borrowAmount = this.getBorrowAmount(userId);
    Assert.isTrue(
        borrowInfo.getAmount().doubleValue() <= borrowAmount.doubleValue(),
        ResponseEnum.USER_AMOUNT_LESS_ERROR);

    //存储数据
    borrowInfo.setUserId(userId);
    //百分比转成小数
    borrowInfo.setBorrowYearRate( borrowInfo.getBorrowYearRate().divide(new BigDecimal(100)));
    borrowInfo.setStatus(BorrowInfoStatusEnum.CHECK_RUN.getStatus());
    baseMapper.insert(borrowInfo);

}
```

## 二、前端

提交借款申请s

pages/user/apply.vue

```js
    //提交借款申请
    save() {
      // this.submitBtnDisabled = true
      this.$axios
        .$post('/api/core/borrowInfo/auth/save', this.borrowInfo)
        .then((response) => {
          this.active = 1
        })
    },
```
