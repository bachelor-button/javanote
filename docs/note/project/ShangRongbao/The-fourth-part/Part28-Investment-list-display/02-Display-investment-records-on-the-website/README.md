# 02-网站端显示投资记录

## 一、后端接口

Controller

LendItemController

```java
@ApiOperation("获取列表")
@GetMapping("/list/{lendId}")
public R list(
@ApiParam(value = "标的 id", required = true)
@PathVariable Long lendId) {
List<LendItem> list = lendItemService.selectByLendId(lendId);
return R.ok().data("list", list);
}
```

## 二、前端

页面脚本

pages/lend/\_id.vue

```js
async asyncData({ $axios, params }) {
    ......

    //投资记录
    let responseLendItemList = await $axios.\$get(
'/api/core/lendItem/list/' + lendId
)

    return {
      ......,
      lendItemList: responseLendItemList.data.list, //投资记录
    }

},
```
