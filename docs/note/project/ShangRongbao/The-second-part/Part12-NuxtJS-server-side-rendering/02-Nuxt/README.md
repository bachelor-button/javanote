# 02-Nuxt.js入门

## 一、安装和运行

在线安装方式：参考：https://zh.nuxtjs.org/docs/2.x/get-started/installation

我们可以直接解压资料中的 nuxt-app.zip

## 二、页面、导航和路由

### 1、页面

创建pages目录，在pages目录中创建index.vue

```xml

<template>
    <h1>Hello world!</h1>
</template>
```

启动项目

```shell
npm run dev
```

访问项目：http://localhost:3000/

再在pages目录中创建一个about.vue页面用于后面的测试

```xml

<template>
    <h1>关于我们</h1>
</template>
```

访问页面：http://localhost:3000/about

### 2、导航

使用`<NuxtLink>`标签可以在程序中的不同页面之间导航，相当于`<a>`标签的作用。一般情况下我们使用`<NuxtLink>`连接程序内部的不同的路由地址，使用`<a>`标签连接站外地址。

pages/index.vue

```xml

<template>
    <div>

        <NuxtLink to="/about">
            关于我们
        </NuxtLink>
        <NuxtLink to="/lend">
            我要投资
        </NuxtLink>
        <NuxtLink to="/user">
            用户中心
        </NuxtLink>
        <a href="http://atguigu.com" target="_blank">尚硅谷</a>

        <h1>Home page</h1>
    </div>
</template>
```

### 3、自动路由

在vue项目中我们需要创建页面，并为每一个页面配置路由，而Nuxt会根据pages路径中的页面自动生成路由配置。

基本路由1：/user 指向 pages/user.vue页面

```xml

<template>
    <div>
        <h1>用户中心</h1>
    </div>
</template>
```

基本路由2：/lend 指向 pages/lend/index.vue页面

```xml

<template>
    <div>
        <h1>投资产品列表</h1>
        <NuxtLink to="/lend/1">
            产品1
        </NuxtLink>
        <NuxtLink to="/lend/2">
            产品2
        </NuxtLink>
    </div>
</template>
```

动态路由：/lend/1、lend/2 等 指向 pages/lend/_id.vue页面，并通过this.$route.params.id获取动态路径

```html

<template>
    <h1>投资产品 {{ id }}</h1>
</template>

<script>
export default {
  data() {
    return {
      id: null,
    }
  },

  created() {
    this.id = this.$route.params.id
  },
}



</script>
```

嵌套路由：如果 pages/user.vue 和 pages/user/index.vue 同时存在，我们可以利用嵌套路由

pages/user.vue

```html

<template>
    <div>
        <h1>用户中心</h1>
        <NuxtLink to="/user">
            用户信息
        </NuxtLink>
        <NuxtLink to="/user/account">
            用户账户
        </NuxtLink>

        <!-- user目录下的页面的路由出口 -->
        <NuxtChild/>
    </div>
</template>
```

pages/user/index.vue

```html

<template>
    <h1>用户信息</h1>
</template>
```

pages/user/account.vue

```html

<template>
    <h1>用户账户</h1>
</template>
```

## 二、布局Layout

### 1、默认布局

如果想拥有统一的页面风格，例如：一致的页头和页尾，可以使用Layout，布局文件的默认的名字是default.vue，放在layouts目录中

注意：新创建的layout重启前端服务器后应用

layouts/default.vue

```html

<template>
    <div>
        <Nuxt/>
        <div>default footer</div>
    </div>
</template>
```

### 2、自定义布局

也可以自定义Layout：layouts/my.vue

```html

<template>
    <div>
        <Nuxt/>
        <div>my footer</div>
    </div>
</template>
```

在page中使用layout属性指定布局文件：pages/user.vue

```html

<script>
export default {
  layout: 'my',
}



</script>
```

### 3、重启服务测试

## 三、配置文件

### 1、Meta Tags and SEO

我们可以在nuxt.config.js中配置如下内容，Nuxt会自动生成网站的`<head>` 标签，这也是搜索引擎优化的一个必要手段。

```js
module.exports = { head: { title: '尚融宝', meta: [
{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'meta-key-words', name: 'keywords', content:
'尚融宝官网_纽交所上市企业，网络借贷平台，解决个人小额借款、短期借款问题。 资金银行存管，安全保障。', }, { hid: 'description', name: 'description', content:
'尚融宝官网_纽交所上市企业，网络借贷平台，解决个人小额借款、短期借款问题。 资金银行存管，安全保障。', },
], link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }], }, }
```

注意：/favicon.ico 放在 static 目录下

### 2、样式

step1：创建 assets/css/main.css

```html
body { background-color: pink; }
```

step2： 在nuxt.config.js中配置样式（和head同级别）

```html
css: [
// CSS file in the project
'~/assets/css/main.css',
],
```

### 3、端口号

在nuxt.config.js中配置

```js
server: { port: 3001, // default: 3000 },
```

