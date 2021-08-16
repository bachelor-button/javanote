# 02-个人中心首页

## 一、后端接口

1、创建VO

```java
package com.atguigu.srb.core.pojo.vo; 

@Data
@ApiModel(description = "首页用户信息")
public class UserIndexVO {

    @ApiModelProperty(value = "用户id")
    private Long userId;

    @ApiModelProperty(value = "用户姓名")
    private String name;

    @ApiModelProperty(value = "用户昵称")
    private String nickName;

    @ApiModelProperty(value = "1：出借人 2：借款人")
    private Integer userType;

    @ApiModelProperty(value = "用户头像")
    private String headImg;

    @ApiModelProperty(value = "绑定状态（0：未绑定，1：绑定成功 -1：绑定失败）")
    private Integer bindStatus;

    @ApiModelProperty(value = "帐户可用余额")
    private BigDecimal amount;

    @ApiModelProperty(value = "冻结金额")
    private BigDecimal freezeAmount;

    @ApiModelProperty(value = "上次登录时间")
    private LocalDateTime lastLoginTime;

}
```

2、Controller

UserInfoController

```java
@ApiOperation("获取个人空间用户信息")
@GetMapping("/auth/getIndexUserInfo")
public R getIndexUserInfo(HttpServletRequest request) {

    String token = request.getHeader("token");
    Long userId = JwtUtils.getUserId(token);
    UserIndexVO userIndexVO = userInfoService.getIndexUserInfo(userId);
    return R.ok().data("userIndexVO", userIndexVO);

}
```

3、Service

接口：UserInfoService

```java
UserIndexVO getIndexUserInfo(Long userId); 
```

实现：UserInfoServiceImpl

```java
@Override
public UserIndexVO getIndexUserInfo(Long userId) {

    
    //用户信息
    UserInfo userInfo = baseMapper.selectById(userId);

    //账户信息
    QueryWrapper<UserAccount> userAccountQueryWrapper = new QueryWrapper<>();
    userAccountQueryWrapper.eq("user_id", userId);
    UserAccount userAccount = userAccountMapper.selectOne(userAccountQueryWrapper);

    //登录信息
    QueryWrapper<UserLoginRecord> userLoginRecordQueryWrapper = new QueryWrapper<>();
    userLoginRecordQueryWrapper
        .eq("user_id", userId)
        .orderByDesc("id")
        .last("limit 1");
    UserLoginRecord userLoginRecord = userLoginRecordMapper.selectOne(userLoginRecordQueryWrapper);
    result.put("userLoginRecord", userLoginRecord);

    //组装结果数据
    UserIndexVO userIndexVO = new UserIndexVO();
    userIndexVO.setUserId(userInfo.getId());
    userIndexVO.setUserType(userInfo.getUserType());
    userIndexVO.setName(userInfo.getName());
    userIndexVO.setNickName(userInfo.getNickName());
    userIndexVO.setHeadImg(userInfo.getHeadImg());
    userIndexVO.setBindStatus(userInfo.getBindStatus());
    userIndexVO.setAmount(userAccount.getAmount());
    userIndexVO.setFreezeAmount(userAccount.getFreezeAmount());
    userIndexVO.setLastLoginTime(userLoginRecord.getCreateTime());

    return userIndexVO;

}
```

## 二、前端整合

脚本

pages/user/index.vue

```vue
fetchUserData() {
  this.$axios
    .$get('/api/core/userInfo/auth/getIndexUserInfo')
    .then((response) => {
      this.userIndexVO = response.data.userIndexVO
    })

}, 
```
