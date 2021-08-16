# 04-获取借款申请状态

## 一、获取借款状态

1、BorrowInfoController

```java
@ApiOperation("获取借款申请审批状态")
@GetMapping("/auth/getBorrowInfoStatus")
public R getBorrowerStatus(HttpServletRequest request){
        String token = request.getHeader("token");
        Long userId = JwtUtils.getUserId(token);
        Integer status = borrowInfoService.getStatusByUserId(userId);
        return R.ok().data("borrowInfoStatus", status);
    }
```

2、service

接口：BorrowInfoService

```java
Integer getStatusByUserId(Long userId);
```

实现：

BorrowInfoServiceImpl

```java
@Override
public Integer getStatusByUserId(Long userId) {
    QueryWrapper<BorrowInfo> borrowInfoQueryWrapper = new QueryWrapper<>();
    borrowInfoQueryWrapper.select("status").eq("user_id", userId);
    List<Object> objects = baseMapper.selectObjs(borrowInfoQueryWrapper);

    if(objects.size() == 0){
        //借款人尚未提交信息
        return BorrowInfoStatusEnum.NO_AUTH.getStatus();
    }
    Integer status = (Integer)objects.get(0);
    return status;

}
```

## 二、前端开发

脚本

pages/user/apply.vue

将 `this.getBorrowAmount()`和 `this.initSelected()`移植到 `this.getBorrowInfoStatus()`中

```js
created() {
     //获取审批状态
     this.getBorrowInfoStatus()
},
```

methods 中添加方法：

```js
//获取借款审批状态
getBorrowInfoStatus() {
    this.$axios.$get('/api/core/borrowInfo/auth/getBorrowInfoStatus').then((response) => {
    this.borrowInfoStatus = response.data.borrowInfoStatus
    if (this.borrowInfoStatus === 0) {
    //未认证
    this.active = 0
    //获取借款额度
    this.getBorrowAmount()

    //初始化下拉列表
    this.initSelected()
    } else if (this.borrowInfoStatus === 1) {
            //审批中
            this.active = 1
    } else if (this.borrowInfoStatus === 2) {
            //审批成功
            this.active = 2
    } else if (this.borrowInfoStatus === -1) {
            //审批失败
            this.active = 2
    } })

},
```

将 `data()`中 active 的初始化值设置为 `null`

```js
active: null, //步骤
```
