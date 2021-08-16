# 02-搭建管理平台前端程序

## 一、vue-element-admin

vue-element-admin是基于element-ui的一套后台管理系统集成方案。

GitHub地址：https://github.com/PanJiaChen/vue-element-admin

项目在线预览：https://panjiachen.gitee.io/vue-element-admin

![images](./images/b0211ac7-bdbb-4649-8aab-67b0e3080c25.png)

## 二、vue-admin-template

### 1、简介

vueAdmin-template是基于vue-element-admin的一套后台管理系统基础模板（最少精简版），可作为模板进行二次开发。

GitHub地址：https://github.com/PanJiaChen/vue-admin-template

根据用户角色来动态生成侧边栏的分支：https://github.com/PanJiaChen/vue-admin-template/tree/permission-control

 

### 2、安装和运行

```shell
# 解压压缩包vue-admin-template-permission-control.zip
# 重命名为srb-admin
# 进入目录
cd srb-admin

# 安装依赖
npm install

# 启动。执行后，浏览器自动弹出并访问http://localhost:9528/
npm run dev
```

3 安装过程中可能出现的问题

```shell
# npm的安装需要git(git的安全验证和远程)，本机文件权限(文件访问权限)，本机环境变量(path环境)等配置，甚至python和c的配置(npm需要python2.7的支持)
# 常见有如下错误
```

![images](./images/0f8f1326-e598-43a5-b506-c05e09e07be8.jpg)

则执行下面的命令（使用管理员方式打开命令行，关闭VSCode），再install

```shell

npm i -g --production windows-build-tools
# 显示如下 All done! 结果后，再执行下面的命令
npm i -g node-gyp
```

安装完成后会打印

![images](./images/eca42a03-d8fb-4bd8-a5d9-7219acf8e672.png)

安装过程中如果报如下错误

![images](./images/0720025e-1933-4b7d-92da-f4c6ba658bbb.jpg)

则执行下面的命令

```shell
npm i -g node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass
```

## 三、前端配置

### 1、禁用ESLint语法检查

vue.config.js第30行处禁用ESLint语法检查

```js
lintOnSave: false,
```

### 2、添加prettier格式化配置

在vue项目根目录下新建一个文件.prettierrc

```json
{
  "semi": false,
  "singleQuote": true,
  "htmlWhitespaceSensitivity": "ignore"
}
```

### 3、修改页面标题

src/settings.js 第3行处修改页面标题

![images](./images/713d1260-6247-4d17-9394-92a42cc875f1.png)

### 4、国际化设置

src/main.js 第7行处修改语言

![images](./images/265654f8-5593-4153-b395-9c5bc40b0d61.png)

测试平台语言的修改

![images](./images/9e0001ab-b578-4b5d-a523-e4dff9c15fb6.png)

### 5、下拉菜单修改

![images](./images/cfed1d13-0046-471b-8e43-c3ca92d9c9ca.png)

### 6、登录页修改

src/views/login/index.vue

修改页面标题、登录按钮等
