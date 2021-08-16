# 01-集成Redis缓存

## 一、简介

### 1、场景

由于数据字典的变化不是很频繁，而且系统对数据字典的访问较频繁，所以我们有必要把数据字典的数据存入缓存，减少数据库压力和提高访问速度。这里，我们使用Redis作为系统的分布式缓存中间件。

### 2、RedisTemplate

在Spring Boot项目中中，默认集成Spring Data Redis，Spring Data Redis针对Redis提供了非常方便的操作模版RedisTemplate，并且可以进行连接池自动管理。

## 二、引入Redis

### 1、项目中集成Redis

service-base模块中添加redis依赖，Spring Boot 2.0以上默认通过commons-pool2连接池连接Redis
```xml
<!-- spring boot redis缓存引入 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- 缓存连接池-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>

<!-- redis 存储 json序列化 -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
</dependency>
```

### 2、添加Redis连接配置

service-core的 application.yml 中添加如下配置
```yaml
#spring: 
  redis:
    host: 192.168.100.100
    port: 6379
    database: 0
    password: 123456 #默认为空
    timeout: 3000ms #最大等待时间，超时则抛出异常，否则请求一直等待
    lettuce:
      pool:
        max-active: 20  #最大连接数，负值表示没有限制，默认8
        max-wait: -1    #最大阻塞等待时间，负值表示没限制，默认-1
        max-idle: 8     #最大空闲连接，默认8
        min-idle: 0     #最小空闲连接，默认0
```

### 3、启动Redis服务

远程连接Linux服务器

```shell
#启动服务
cd /usr/local/redis-5.0.7
bin/redis-server redis.conf
```

## 三、测试RedisTemplate

### 1、存值测试

test中创建测试类RedisTemplateTests
```java
package com.atguigu.srb.core;
@SpringBootTest
@RunWith(SpringRunner.class)
public class RedisTemplateTests {
    @Resource
    private RedisTemplate redisTemplate;
    @Resource
    private DictMapper dictMapper;
    @Test
    public void saveDict(){
        Dict dict = dictMapper.selectById(1);
        //向数据库中存储string类型的键值对, 过期时间5分钟
        redisTemplate.opsForValue().set("dict", dict, 5, TimeUnit.MINUTES);
    }
}
```

发现RedisTemplate默认使用了JDK的序列化方式存储了key和value

### 2、Redis配置文件

service-base中添加RedisConfig，我们可以在这个配置文件中配置Redis序列化方案
```java
package com.atguigu.srb.base.config;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(LettuceConnectionFactory redisConnectionFactory) {

        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        //首先解决key的序列化方式
        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(stringRedisSerializer);

        //解决value的序列化方式
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);

        //序列化时将类的数据类型存入json，以便反序列化的时候转换成正确的类型
        ObjectMapper objectMapper = new ObjectMapper();
        //objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL);

        // 解决jackson2无法反序列化LocalDateTime的问题
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        objectMapper.registerModule(new JavaTimeModule());

        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        return redisTemplate;
    }
}
```

再次测试，key使用了字符串存储，value使用了json存储

### 3、取值测试
```java
@Test
public void getDict(){
    Dict dict = (Dict)redisTemplate.opsForValue().get("dict");
    System.out.println(dict);
}
```

