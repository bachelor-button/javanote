# 01-资金记录

  

## 一、资金列表接口

1、Controller

TransFlowController

```java
package com.atguigu.srb.core.controller.api; 

@Api(tags = "资金记录")
@RestController
@RequestMapping("/api/core/transFlow")
@Slf4j
public class TransFlowController {

    @Resource
    private TransFlowService transFlowService;

    @ApiOperation("获取列表")
    @GetMapping("/list")
    public R list(HttpServletRequest request) {
        String token = request.getHeader("token");
        Long userId = JwtUtils.getUserId(token);
        List<TransFlow> list = transFlowService.selectByUserId(userId);
        return R.ok().data("list", list);
    }

}
```

2、Service

接口：TransFlowService

```java
List<TransFlow> selectByUserId(Long userId); 
```

实现：TransFlowServiceImpl

```java
@Override
public List<TransFlow> selectByUserId(Long userId) {

    QueryWrapper<TransFlow> queryWrapper = new QueryWrapper<>();
    queryWrapper
        .eq("user_id", userId)
        .orderByDesc("id");
    return baseMapper.selectList(queryWrapper);

}
```

## 二、前端整合

脚本

pages/user/fund.vue

```vue
fetchTransFlowList() {
    this.$axios.$get('/api/core/transFlow/list').then((response) => {

        this.transFlowList = response.data.list

    })
},
```
