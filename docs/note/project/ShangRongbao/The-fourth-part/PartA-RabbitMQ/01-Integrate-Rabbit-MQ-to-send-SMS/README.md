# 01-整合Rabbit MQ发送短信

## 一、MQ服务器设置

1、访问MQ控制台

http://192.168.100.103:15672

2、创建用户

创建用户 srbuser，配置管理员权限

3、创建虚拟机

创建虚拟机 /srbhost，在Set permission中为新建的用户分配访问虚拟机/srbhost 和 /的权限

## 二、创建rabbit-mq模块

1、创建模块

srb下创建rabbit-mq模块

2、引入依赖

```xml
<dependencies>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-amqp</artifactId>
    </dependency>

    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>

</dependencies>
```

3、创建MQConfig

```java
package com.atguigu.srb.rabbitutil.config; 

@Configuration
public class MQConfig {

    @Bean
    public MessageConverter messageConverter(){
        //json字符串转换器
        return new Jackson2JsonMessageConverter();
    }

}
```

4、创建MQConst

```java
package com.atguigu.srb.rabbitutil.constant; 

public class MQConst {

    public static final String EXCHANGE_TOPIC_SMS = "exchange.topic.sms";//交换机
    public static final String ROUTING_SMS_ITEM = "routing.sms.item";//路由
    public static final String QUEUE_SMS_ITEM  = "queue.sms.item";//消息队列

}
```

5、创建MQService

```java
package com.atguigu.srb.rabbitutil.service; 

@Service
@Slf4j
public class MQService {

    @Resource
    private AmqpTemplate amqpTemplate;

    /**
     *  发送消息
     * @param exchange 交换机
     * @param routingKey 路由
     * @param message 消息
     */
    public boolean sendMessage(String exchange, String routingKey, Object message) {
        log.info("发送消息...........");
        amqpTemplate.convertAndSend(exchange, routingKey, message);
        return true;
    }

}
```

## 三、service-base中创建SmsDTO

```java
package com.atguigu.srb.base.dto; 

@Data
@ApiModel(description = "短信")
public class SmsDTO {

    @ApiModelProperty(value = "手机号")
    private String mobile;

    @ApiModelProperty(value = "消息内容")
    private String message;

}
```

## 四、service-core中发送消息

1、引入依赖

```xml
<!--rabbitmq消息队列-->
<dependency>

    <groupId>com.atguigu</groupId>
    <artifactId>rabbit-mq</artifactId>
    <version>0.0.1-SNAPSHOT</version>

</dependency>
```

2、添加yml配置

```yaml
spring:
  rabbitmq:

    host: 192.168.100.103
    port: 5672
    virtual-host: /srbhost
    username: srbuser
    password: 123456
```

3、根据bindCode获取手机号

UserInfoService接口：

```java
String getMobileByBindCode(String bindCode); 
```

UserInfoServiceImpl实现：

```java
@Override
public String getMobileByBindCode(String bindCode) {

    QueryWrapper<UserInfo> userInfoQueryWrapper = new QueryWrapper<>();
    userInfoQueryWrapper.eq("bind_code", bindCode);
    UserInfo userInfo = baseMapper.selectOne(userInfoQueryWrapper);
    return userInfo.getMobile();

}
```

4、向MQ发送消息

UserAccountServiceImpl 充值回调方法的最后添加发送消息的代码：

```java
@Resource
private UserInfoService userInfoService; 
@Resource
private MQService mqService; 

@Transactional(rollbackFor = Exception.class)
@Override
public void notify(Map<String, Object> paramMap) {

    log.info("充值成功：" + JSONObject.toJSONString(paramMap));

    ......

    //发消息
    log.info("发消息");
    String mobile = userInfoService.getMobileByBindCode(bindCode);
    SmsDTO smsDTO = new SmsDTO();
    smsDTO.setMobile(mobile);
    smsDTO.setMessage("充值成功");
    mqService.sendMessage(MQConst.EXCHANGE_TOPIC_SMS, MQConst.ROUTING_SMS_ITEM, smsDTO);

}
```

## 五、service-sms中监听消息

1、引入依赖

```xml
<!--rabbitmq消息队列-->
<dependency>
<groupId>com.atguigu</groupId>
<artifactId>rabbit-mq</artifactId>
<version>0.0.1-SNAPSHOT</version>
</dependency>
```

2、添加配置 yml

```yaml
spring:
  rabbitmq:

    host: 192.168.100.103
    port: 5672
    virtual-host: /srbhost
    username: srbuser
    password: 123456
```

3、创建MQ监听器

```java
package com.atguigu.srb.sms.receiver; 

@Component
@Slf4j
public class SmsReceiver {

    @Resource
    private SmsService smsService;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = MQConst.QUEUE_SMS_ITEM, durable = "true"),
            exchange = @Exchange(value = MQConst.EXCHANGE_TOPIC_SMS),
            key = {MQConst.ROUTING_SMS_ITEM}
    ))
    public void send(SmsDTO smsDTO) throws IOException {
        log.info("SmsReceiver 消息监听");
        Map<String,Object> param = new HashMap<>();
        param.put("code", smsDTO.getMessage());
        smsService.send(smsDTO.getMobile(), SmsProperties.TEMPLATE_CODE, param);
    }

}
```
