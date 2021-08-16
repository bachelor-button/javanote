# 04-网站端显示还款计划

## 一、后端接口

Controller

创建 LendReturnController

```java
package com.atguigu.srb.core.controller.api;

@Api(tags = "还款计划")
@RestController
@RequestMapping("/api/core/lendReturn")
@Slf4j
public class LendReturnController {

    @Resource
    private LendReturnService lendReturnService;

    @ApiOperation("获取列表")
    @GetMapping("/list/{lendId}")
    public R list(
            @ApiParam(value = "标的id", required = true)
            @PathVariable Long lendId) {
        List<LendReturn> list = lendReturnService.selectByLendId(lendId);
        return R.ok().data("list", list);
    }

}
```

## 二、前端

页面脚本

pages/lend/\_id.vue

```vue
async asyncData({ $axios, params }) { ...... //还款计划 let
responseLendReturnList = await $axios.\$get( '/api/core/lendReturn/list/' +
lendId ) return { ......, lendReturnList: responseLendReturnList.data.list,
//还款计划 } },
```
