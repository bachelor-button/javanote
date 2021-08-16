# 07-Vue Router

## 一、认识路由

### 1、锚点的概念

案例：百度百科

特点：单页Web应用，预先加载页面内容

形式：url#锚点

### 2、路由的作用

Vue.js 路由允许我们通过锚点定义不同的 URL， 达到访问不同的页面的目的，每个页面的内容通过延迟加载渲染出来。

通过 Vue.js 可以实现多视图的单页Web应用（single page web application，SPA）

### 3、参考https://router.vuejs.org/zh/

## 二、路由实例

### 1、创建文件夹和文件

创建文件夹 07-router，创建index.html

### 2、复制js资源

vue.js

vue-router.js

### 3、引入js
```html
<script src="vue.js"></script>
<script src="vue-router.js"></script>
```

### 4、编写html
```html

<div id="app">
    <h1>Hello App!</h1>
    <p>
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <router-link to="/">首页</router-link>
        <router-link to="/invest">我要投资</router-link>
        <router-link to="/user">用户中心</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</div>
```

### 5、编写js
```js
<script>
    // 1. 定义（路由）组件。
    // 复杂的组件也可以从独立的vue文件中引入
    const welcome = { template: '<div>尚融宝主页</div>' }
    const invest = { template: '<div>投资产品</div>' }
    const user = { template: '<div>用户信息</div>' }

    // 2. 定义路由
    // 每个路由应该映射一个组件。
    const routes = [
        { path: '/', redirect: '/welcome' }, //设置默认指向的路径
        { path: '/welcome', component: welcome },
        { path: '/invest', component: invest },
        { path: '/user', component: user },
    ]

    // 3. 创建 router 实例，然后传 `routes` 配置
    const router = new VueRouter({
        routes, // （缩写）相当于 routes: routes
    })

    // 4. 创建和挂载根实例。
    // 从而让整个应用都有路由功能
    new Vue({
        el: '#app',
        router,
    })

    // 现在，应用已经启动了！
</script>
```

