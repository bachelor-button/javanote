# 01-NPM包管理器

## 一、简介

什么是NPM

NPM全称Node Package Manager，是Node.js包管理工具，是全球最大的模块生态系统，里面所有的模块都是开源免费的；也是Node.js的包管理工具，相当于前端的Maven 。

```shell
#在命令提示符输入 npm -v 可查看当前npm版本
npm -v
```

## 二、使用npm管理项目

创建08-npm文件夹

### 1、项目初始化

```shell
#建立一个空文件夹，在命令提示符进入该文件夹  执行命令初始化
npm init
#按照提示输入相关信息，如果是用默认值则直接回车即可。
#name: 项目名称
#version: 项目版本号
#description: 项目描述
#keywords: {Array}关键词，便于用户搜索到我们的项目
#最后会生成package.json文件，这个是包的配置文件，相当于maven的pom.xml
#我们之后也可以根据需要进行修改。

#如果想直接生成 package.json 文件，那么可以使用命令
npm init -y
```

### 2、修改npm镜像

NPM官方的管理的包都是从http://npmjs.com下载的，但是这个网站在国内速度很慢。

这里推荐使用淘宝 NPM 镜像http://npm.taobao.org/，淘宝 NPM 镜像是一个完整 npmjs.com 镜像，同步频率目前为 10分钟一次，以保证尽量与官方服务同步。

设置镜像地址：

```shell
# 经过下面的配置，以后所有的 npm install 都会经过淘宝的镜像地址下载

npm config set registry https://registry.npm.taobao.org

# 查看npm配置信息

npm config list
```

### 3、npm install命令

基本命令

```shell

# 使用 npm install 安装依赖包的最新版，

# 简写 npm i

# 模块安装的位置：项目目录\node_modules

# 同时package.json 文件中，依赖包会被添加到dependencies节点下，类似maven中的 <dependencies>

# 默认参数：--save 简写 -S 将当前依赖保存在dependencies节点下

npm install axios
```

下载特定版本的依赖

```shell
# 如果安装时想指定特定的版本

npm i axios@0.18.x
```

下载开发依赖
```shell
# devDependencies节点：开发时的依赖包，项目打包到生产环境的时候不包含的依赖

# 使用 -D参数将依赖添加到devDependencies节点

npm i --save-dev mockjs

# 或简写

npm i -D mockjs
```

根据依赖下载安装包
```shell
# npm管理的项目在备份和传输的时候一般不携带node_modules文件夹

# 安装会自动在项目目录下添加 package-lock.json文件，这个文件帮助锁定安装包的版本

npm i #根据package.json中的配置下载依赖，初始化项目
```

### 4、其它命令
```shell

# 更新包（更新到最新版本）

npm update 包名

# 卸载包

npm uninstall 包名
```

