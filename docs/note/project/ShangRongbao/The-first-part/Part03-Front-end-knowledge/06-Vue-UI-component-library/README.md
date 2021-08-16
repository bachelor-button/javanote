# 06-Vue UI组件库

## 一、常用组件库

### 1、Mint UI

主页：<http://mint-ui.github.io/#!/zh-cn>

说明：饿了么开源的基于Vue的移动端UI组件库

### 2、Element-UI

主页：<http://element-cn.eleme.io/#/zh-CN>

说明： 饿了么开源的基于 Vue 的PC端UI组件库

## 二、Element-UI实例

### 1、引入脚本库

创建06-UI文件夹，复制05-vue中综合案例相关代码

### 2、引入css和脚本

在html的head中引入css和js

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<script src="vue.js"></script>
<script src="axios.js"></script>
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

### 3、渲染用户列表

```html
<div id="app">
    <el-button>默认按钮</el-button>
    <el-table :data="userList" stripe border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
    </el-table>
</div>
```

### 4、浏览器中运行
