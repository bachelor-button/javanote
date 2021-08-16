# 01-阿里云存储OSS

## 一、开通“对象存储OSS”服务

为了解决海量数据存储与弹性扩容，项目中我们采用云存储的解决方案- 阿里云OSS。

### 1、开通“对象存储OSS”服务

![images](./images/1.jpg)

![images](./images/2.jpg)

### 2、进入管理控制台

![images](./images/29638109.png)

## 二、控制台使用

### 1、创建Bucket

命名：srb-file

读写权限：公共读

### 2、上传默认头像

创建文件夹avatar，上传默认的用户头像

![images](./images/35034037-b0b4-44ab-92df-c1a36358865e.png)

## 三、使用RAM子用户

### 1、进入子用户管理页面

![images](./images/e64cdcc4-4c79-4a7c-a918-df3eb8197fb0.png)

![images](./images/bda579f9-b920-4ebd-9b75-e5b6cf0595ab.png)

### 2、添加用户

![images](./images/07498f79-423f-496b-9e62-44c0e8bbb886.png)

### 3、获取子用户key

AccessKeyId, AccessKeySecret

### 4、设置用户权限

AliyunOSSFullAccess

![images](./images/ecaaa93f-552e-4850-9a7e-f5b20106b875.png)
