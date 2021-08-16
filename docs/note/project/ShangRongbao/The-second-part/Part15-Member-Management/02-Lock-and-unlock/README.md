# 02-锁定和解锁

## 一、后端接口实现

### 1、Service

接口：UserInfoService
```java
void lock(Long id, Integer status);
```

实现：UserInfoServiceImpl
```java
@Override
public void lock(Long id, Integer status) {
    //        UserInfo userInfo = this.getById(id);//select
    //        userInfo.setStatus(1);
    //        this.updateById(userInfo);//update
    UserInfo userInfo = new UserInfo();
    userInfo.setId(id);
    userInfo.setStatus(status);
    baseMapper.updateById(userInfo);
}
```

### 2、Controller

AdminUserInfoController
```java
@ApiOperation("锁定和解锁")
@PutMapping("/lock/{id}/{status}")
public R lock(
    @ApiParam(value = "用户id", required = true)
    @PathVariable("id") Long id,

    @ApiParam(value = "锁定状态（0：锁定 1：解锁）", required = true)
    @PathVariable("status") Integer status){

    userInfoService.lock(id, status);
    return R.ok().message(status==1?"解锁成功":"锁定成功");
}
```

## 二、前端整合

### 1、定义api

src/api/core/user-info.js
```html
  lock(id, status) {
    return request({
      url: `/admin/core/userInfo/lock/${id}/${status}`,
      method: 'put'
    })
  }
```

### 2、定义页面组件脚本

src/views/core/user-info/list.vue
```html
    // 锁定和解锁
    lock(id, status) {
      userInfoApi.lock(id, status).then(response => {
        this.$message.success(response.message)
        this.fetchData()
      })
    }
```

### 3、定义页面组件模板

src/views/core/user-info/list.vue：
```html
<el-table-column label="操作" align="center" width="200">
    <template slot-scope="scope">
        <el-button
                   v-if="scope.row.status == 1"
                   type="primary"
                   size="mini"
                   @click="lock(scope.row.id, 0)"
                   >
            锁定
        </el-button>
        <el-button
                   v-else
                   type="danger"
                   size="mini"
                   @click="lock(scope.row.id, 1)"
                   >
            解锁
        </el-button>
    </template>
</el-table-column>
```

