# 05-获取借款人状态

## 一、获取借款人状态

1、BorrowerController

```java
@ApiOperation("获取借款人认证状态")
@GetMapping("/auth/getBorrowerStatus")
public R getBorrowerStatus(HttpServletRequest request){
    String token = request.getHeader("token");
    Long userId = JwtUtils.getUserId(token);
    Integer status = borrowerService.getStatusByUserId(userId);
    return R.ok().data("borrowerStatus", status);
}
```

2、service

接口：BorrowerService

```java
Integer getStatusByUserId(Long userId);
```

实现：BorrowerServiceImpl

```java
@Override
public Integer getStatusByUserId(Long userId) {

    QueryWrapper<Borrower> borrowerQueryWrapper = new QueryWrapper<>();
    borrowerQueryWrapper.select("status").eq("user_id", userId);
    List<Object> objects = baseMapper.selectObjs(borrowerQueryWrapper);

    if(objects.size() == 0){
        //借款人尚未提交信息
        return BorrowerStatusEnum.NO_AUTH.getStatus();
    }
    Integer status = (Integer)objects.get(0);
    return status;

}
```

## 二、前端开发

pages/user/borrower.vue

脚本

将 this.initSelected()在 this.getUserInfo()中调用

```vue
created() { this.getUserInfo() },
```

methods 中添加方法：

```vue
//获取借款人信息 getUserInfo() { this.$axios
.$get('/api/core/borrower/auth/getBorrowerStatus') .then((response) => {
this.borrowerStatus = response.data.borrowerStatus if (this.borrowerStatus ===
0) { //未认证 this.active = 0 //获取下拉列表 this.initSelected() } else if
(this.borrowerStatus === 1) { //认证中 this.active = 1 } else if
(this.borrowerStatus === 2) { //认证成功 this.active = 2 } else if
(this.borrowerStatus === -1) { //认证失败 this.active = 2 } }) }
```

将 data() 中 active 的初始化值设置为 null

```js
active: null, //步骤
```
