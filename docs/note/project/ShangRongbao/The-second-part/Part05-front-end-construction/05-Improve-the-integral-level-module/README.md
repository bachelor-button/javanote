# 05-完善积分等级模块

## 一、删除数据

### 1、定义api

src/api/core/integral-grade.js

```js
removeById(id) {
    return request({
        url: `/admin/core/integralGrade/remove/${id}`,
        method: 'delete'
    })
}
```

### 2、页面组件模板

src/views/core/integral-grade/list.vue，在table组件中添加删除列

```js
<el-table-column label="操作" width="200" align="center">
    <template slot-scope="scope">
        <el-button
                   type="danger"
                   size="mini"
                   icon="el-icon-delete"
                   @click="removeById(scope.row.id)"
                   >
            删除
        </el-button>
    </template>
</el-table-column>
```

### 3、删除数据脚本

```js
// 根据id删除数据
removeById(id) {
  this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      integralGradeApi.removeById(id).then(response => {
        this.$message.success(response.message)
        this.fetchData()
      })
    })
    .catch(error => {
      this.$message.info('取消删除')
    })
}
```

## 二、新增数据

### 1、定义api

src/api/core/integral-grade.js

```js
save(integralGrade) {
    return request({
        url: '/admin/core/integralGrade/save',
        method: 'post',
        data: integralGrade
    })
}
```

### 2、 定义页面data

src/views/core/integral-grade/form.vue，完善data定义

```js
<script>
export default {
  data() {
    return {
      integralGrade: {}, // 初始化数据
      saveBtnDisabled: false // 保存按钮是否禁用，防止表单重复提交
    }
  }
}
</script>
```

### 3、页面组件模板

src/views/core/integral-grade/form.vue，完善template

```html

<template>
    <div class="app-container">
        <!-- 输入表单 -->
        <el-form label-width="120px">
            <el-form-item label="借款额度">
                <el-input-number v-model="integralGrade.borrowAmount" :min="0"/>
            </el-form-item>
            <el-form-item label="积分区间开始">
                <el-input-number v-model="integralGrade.integralStart" :min="0"/>
            </el-form-item>
            <el-form-item label="积分区间结束">
                <el-input-number v-model="integralGrade.integralEnd" :min="0"/>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled"
                           type="primary"
                           @click="saveOrUpdate()">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
```

### 4、新增数据脚本

src/views/core/integral-grade/form.vue，引入api

```js
import integralGradeApi from '@/api/core/integral-grade'
```

定义保存方法

```js
methods: {
    saveOrUpdate() {
      // 禁用保存按钮
      this.saveBtnDisabled = true
      this.saveData()
    },

    // 新增数据
    saveData() {
      // debugger
      integralGradeApi.save(this.integralGrade).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push('/core/integral-grade/list')
      })
    }
}
```

## 三、回显数据

### 1、列表页编辑按钮

src/views/core/integral-grade/list.vue，表格“操作”列中增加“修改”按钮

```html
<router-link :to="'/core/integral-grade/edit/' + scope.row.id" style="margin-right:5px;">
    <el-button type="primary" size="mini" icon="el-icon-edit">
        修改
    </el-button>
</router-link>
```

### 2、 定义api

src/api/core/integral-grade.js

```html
getById(id){
return request({ url: `/admin/core/integralGrade/get/${id}`, method: 'get' })
}
```

### 3、获取数据脚本

src/views/core/integral-grade/form.vue，methods中定义回显方法

```java
// 根据id查询记录 fetchDataById(id) {
integralGradeApi.getById(id).then(response => { 
this.integralGrade =response.data.record })
}
```

页面渲染成功后获取数据

因为已在路由中定义如下内容： path: 'edit/:id' ，因此可以使用 this.$route.params.id获取路由中的id

```js

//页面渲染成功 created() { if (this.$route.params.id) { this.fetchDataById(this.$route.params.id)
} },
```

## 四、更新数据

### 1、 定义api

src/api/core/integral-grade.js

```js
updateById(integralGrade) { return request({ url: '/admin/core/integralGrade/update', method: 'put', data: integralGrade
})
}
```

### 2、更新数据 脚本

src/views/core/integral-grade/form.vue，methods中定义updateData

```js
// 根据id更新记录 updateData() { // 数据的获取 integralGradeApi.updateById(this.integralGrade).then(response => { this.$message({
type: 'success', message: response.message })
this.$router.push('/core/integral-grade/list')
})
}
```

完善saveOrUpdate方法

```js
saveOrUpdate() { // 禁用保存按钮 this.saveBtnDisabled = true if (!this.integralGrade.id) { this.saveData()
} else { this.updateData()
} },
```

