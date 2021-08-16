# 02-OpenFeign

需求

发送短信时校验手机号是否注册

## 一、校验手机号是否注册

1、UserInfoController

service-core 中添加 controller 方法：

```java
@ApiOperation("校验手机号是否注册")
@GetMapping("/checkMobile/{mobile}")
public boolean checkMobile(@PathVariable String mobile){
return userInfoService.checkMobile(mobile);
}
```

2、UserInfoService

接口：

boolean checkMobile(String mobile);

实现：

```java
@Override
public boolean checkMobile(String mobile) {
QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
queryWrapper.eq("mobile", mobile);
Integer count = baseMapper.selectCount(queryWrapper);
return count > 0;
}
```

## 二、OpenFeign 的引入

1、引入依赖

service-base 模块中

配置 OpenFeign 的依赖（实际是在服务消费者端需要 OpenFeign 的依赖）

```xml
<!--服务调用-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

2、启动类添加注解

在 service-sms 的启动类添加如下注解

@EnableFeignClients

## 三、接口的远程调用

service-sms 中添加远程调用

1、CoreUserInfoClient

接口：

```java
package com.atguigu.srb.sms.client;

@FeignClient(value = "service-core")
public interface CoreUserInfoClient {

    @GetMapping("/api/core/userInfo/checkMobile/{mobile}")
    boolean checkMobile(@PathVariable String mobile);

}
```

2、ApiSmsController

引入 client

@Resource
private CoreUserInfoClient coreUserInfoClient;

在

获取验证码

方法中调用远程方法校验手机号是否存在

```java
//手机号是否注册
boolean result = coreUserInfoClient.checkMobile(mobile);
System.out.println("result = " + result);
Assert.isTrue(result == false, ResponseEnum.MOBILE_EXIST_ERROR);

//生成验证码
.....
```

## 四、超时控制

openfeign 默认的连接超时时间为 1 秒，测试时很可能会出现远程调用超时错误。

可以在配置文件中添加如下配置：

```properties
feign:
client:
config:
default:
connectTimeout: 10000 #连接超时配置
readTimeout: 600000 #执行超时配置
```

## 五、OpenFeign 日志

1、作用

OpenFeign 提供了日志打印功能，我们可以通过配置来调整日志级别，从而了解 OpenFeign 中 Http 请求的细节。即对 OpenFeign 远程接口调用的情况进行监控和日志输出。

2、日志级别

NONE：默认级别，不显示日志

BASIC：仅记录请求方法、URL、响应状态及执行时间

HEADERS：除了 BASIC 中定义的信息之外，还有请求和响应头信息

FULL：除了

HEADERS 中定义的信息之外，还有请求和响应正文及元数据信息

3、配置日志 bean

在 service-base 中创建配置文件

```java
package com.atguigu.srb.base.config;

@Configuration
public class OpenFeignConfig {

    @Bean
    Logger.Level feignLoggerLevel(){
        return Logger.Level.FULL;
    }

}
```

4、开启日志

sms 的

application.yml 中指定监控的接口，以及日志级别

```yaml
logging:
level:
com.atguigu.srb.sms.client.CoreUserInfoClient: DEBUG #以什么级别监控哪个接口
```

5、修改 logback 日志级别

修改日志的 level 为 DEBUG

```xml
<!-- 开发环境和测试环境 -->
<springProfile name="dev,test">
    <logger name="com.atguigu" level="DEBUG">
        <appender-ref ref="CONSOLE" />
    </logger>
</springProfile>
```

6、查看日志输出

补充：

HTTP 是一种无状态协议，客户端向服务器发送一个 TCP 请求，服务端响应完毕后断开连接。

如果客户端向服务器发送多个请求，每个请求都要建立各自独立的连接以传输数据。

HTTP 有一个 KeepAlive 模式，它告诉 webserver 在处理完一个请求后保持这个 TCP 连接的打开状态。

若接收到来自客户端的其它请求，服务端会利用这个未被关闭的连接，而不需要再建立一个连接。

KeepAlive 在一段时间内保持打开状态，它们会在这段时间内占用资源。占用过多就会影响性能。

timeout 来指定 KeepAlive 的超时时间（timeout）。指定每个 TCP 连接最多可以保持多长时间。
