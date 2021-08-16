# 01-微服务网关

## 一、创建模块 service-gateway

1、创建模块

在 srb 下创建普通 maven 模块

Artifact：service-gateway

2、配置 pom

在 api-gateway 的 pom 中添加如下依赖

```xml
<dependencies>
    <!-- 网关 -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
    <!--服务注册-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
</dependencies>
```

3、配置 application.yml

```yaml
server:
  port: 80 # 服务端口

spring:
profiles:
active: dev # 环境设置
application:
name: service-gateway # 服务名
cloud:
nacos:
discovery:
server-addr: localhost:8848 # nacos 服务地址
gateway:
discovery:
locator:
enabled: true # gateway 可以发现 nacos 中的微服务，并自动生成转发路由
```

4、logback.xml

修改日志输出目录名为 gateway

5、创建启动类

```java
package com.atguigu.srb.gateway;

@SpringBootApplication
@EnableDiscoveryClient
public class ServiceGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceGatewayApplication.class, args);
    }

}
```

6、启动网关

注意：

因为 nginx 和网关同时使用了 80 端口，因此先停止 nginx，然后再启动网关

```bash
nginx.exe -s stop
```

7、测试自动路由转发

http://localhost/service-core/admin/core/integralGrade/list

规则：

http://Gateway_HOST:Gateway_PORT/serviceId/**

## 二、路由配置

1、基本配置

application.yml 文件中添加路由配置

```yaml
#spring:

# cloud:

# gateway:

routes:
  - id: service-core
    uri: lb://service-core
    predicates:
      - Path=/*/core/**
  - id: service-sms
    uri: lb://service-sms
    predicates:
      - Path=/*/sms/**
  - id: service-oss
    uri: lb://service-oss
    predicates:
      - Path=/*/oss/**
```

2、测试路由转发

http://localhost/admin/core/integralGrade/list

## 三、跨域配置

1、配置文件

在 api-gateway 中添加跨域配置

```java
package com.atguigu.srb.gateway.config;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsFilter() {

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); //是否允许携带 cookie
        config.addAllowedOrigin("_"); //可接受的域，是一个具体域名或者_（代表任意域名）
        config.addAllowedHeader("_"); //允许携带的头
        config.addAllowedMethod("_"); //允许访问的方式
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }

}
```

2、删除后端跨域配置

删除微服务中的跨域注解

@CrossOrigin
