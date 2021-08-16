# 03-Sentinel

1、service-base 中引入 sentinel 依赖

```xml
<!--服务容错-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

2、开启 Sentinel 支持

在 service-sms 的 yml 配置文件中开启 Feign 对 Sentinel 的支持

#开启 Feign 对 Sentinel 的支持
#feign:
sentinel:
enabled: true

3、创建容错类

fallback：当无法校验手机号是否已注册时，直接发送短信

```java
package com.atguigu.srb.sms.client.fallback;

@Service
@Slf4j
public class CoreUserInfoClientFallback implements CoreUserInfoClient {
@Override
public boolean checkMobile(String mobile) {
log.error("远程调用失败，服务熔断");
return false;
}
}
```

4、指定熔断类

为 OpenFeign 远程调用接口添加 fallback 属性值没指定容错类

@FeignClient(value = "service-core", fallback = CoreUserInfoClientFallback.class)
public interface CoreUserInfoClient {

5、测试

停止 core 微服务测试
