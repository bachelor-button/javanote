# 03-显示登录日志

## 一、后端接口实现

### 1、Controller

AdminUserLoginRecordController

```java
package com.atguigu.srb.core.controller.admin;

@Api(tags = "会员登录日志接口")
@RestController
@RequestMapping("/admin/core/userLoginRecord")
@Slf4j
@CrossOrigin
public class AdminUserLoginRecordController {

    @Resource
    private UserLoginRecordService userLoginRecordService;

    @ApiOperation("获取会员登录日志列表")
    @GetMapping("/listTop50/{userId}")
    public R listTop50(
            @ApiParam(value = "用户id", required = true)
            @PathVariable Long userId) {
        List<UserLoginRecord> userLoginRecordList = userLoginRecordService.listTop50(userId);
        return R.ok().data("list", userLoginRecordList);
    }
}
```

### 2、Service

接口：UserLoginRecordService

```java
List<UserLoginRecord> listTop50(Long userId);
```

实现： UserLoginRecordServiceImpl

```java
@Override
public List<UserLoginRecord> listTop50(Long userId) {
    QueryWrapper<UserLoginRecord> userLoginRecordQueryWrapper = new QueryWrapper<>();
    userLoginRecordQueryWrapper
        .eq("user_id", userId)
        .orderByDesc("id")
        .last("limit 50");
    List<UserLoginRecord> userLoginRecords = baseMapper.selectList(userLoginRecordQueryWrapper);
    return userLoginRecords;
}
```

## 二、前端整合

### 1、定义api

```html
src/api/core/user-info.js

getuserLoginRecordTop50(userId) {
return request({
url: `/admin/core/userLoginRecord/listTop50/${userId}`,
method: 'get'
})
}
```

### 2、定义页面组件脚本

```html
    // 根据id查询会员日志记录
showLoginRecord(id) {
//打开对话框
this.dialogTableVisible = true
//加载数据列表
userInfoApi.getuserLoginRecordTop50(id).then(response => {
this.loginRecordList = response.data.list
})
}
```

### 3、定义页面组件模板

src/views/core/user-info/list.vue

在操作列添加按钮：

```html

<el-button
        type="primary"
        size="mini"
        @click="showLoginRecord(scope.row.id)"
>
    登录日志
</el-button>
```

在模板最后添加对话框

```html
<!-- 用户登录日志 -->
<el-dialog title="用户登录日志" :visible.sync="dialogTableVisible">
    <el-table :data="loginRecordList" border stripe>
        <el-table-column type="index"/>
        <el-table-column prop="ip" label="IP"/>
        <el-table-column prop="createTime" label="登录时间"/>
    </el-table>
</el-dialog>
```

