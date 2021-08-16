# 01-管理端显示投资记录

## 一、后端接口

1、Controller

创建 AdminLendItemController

```java
package com.atguigu.srb.core.controller.admin;

@Api(tags = "标的的投资")
@RestController
@RequestMapping("/admin/core/lendItem")
@Slf4j
public class AdminLendItemController {

    @Resource
    private LendItemService lendItemService;

    @ApiOperation("获取列表")
    @GetMapping("/list/{lendId}")
    public R list(
            @ApiParam(value = "标的id", required = true)
            @PathVariable Long lendId) {
        List<LendItem> list = lendItemService.selectByLendId(lendId);
        return R.ok().data("list", list);
    }

}
```

2、Service

接口：LendItemService

```java
List<LendItem> selectByLendId(Long lendId);
```

实现：LendItemServiceImpl

```java
@Override
public List<LendItem> selectByLendId(Long lendId) {
QueryWrapper<LendItem> queryWrapper = new QueryWrapper();
queryWrapper.eq("lend_id", lendId);
List<LendItem> lendItemList = baseMapper.selectList(queryWrapper);
return lendItemList;
}
```

## 二、前端

1、创建 api

api/core/lend-item.js

```js
import request from "@/utils/request";

export default {
  getList(lendId) {
    return request({
      url: `/admin/core/lendItem/list/` + lendId,
      method: "get",
    });
  },
};
```

2、页面脚本

views/core/lend/detail.vue

```vue
import lendItemApi from '@/api/core/lend-item' data() { return { ......,
lendItemList: [] //投资列表 } }, created() { if (this.\$route.params.id) {
...... // 投资记录 this.fetchLendItemList() } }, methods fetchLendItemList() {
lendItemApi.getList(this.\$route.params.id).then(response => { this.lendItemList
= response.data.list }) }
```

3、页面模板

views/core/lend/detail.vue

将投资记录放在借款人信息后面

```vue
<h4>投资记录</h4>
<el-table :data="lendItemList" stripe style="width: 100%" border>
    <el-table-column type="index" label="序号" width="70" align="center" />
    <el-table-column prop="lendItemNo" label="投资编号" />
    <el-table-column prop="investName" label="投资用户" />
    <el-table-column prop="investAmount" label="投资金额" />
    <el-table-column label="年化利率">
        <template slot-scope="scope">
            {{ scope.row.lendYearRate * 100 }}%
        </template>
    </el-table-column>
    <el-table-column prop="investTime" label="投资时间" />
    <el-table-column prop="lendStartDate" label="开始日期" />
    <el-table-column prop="lendEndDate" label="结束日期" />
    <el-table-column prop="expectAmount" label="预期收益" />
    <el-table-column prop="investTime" label="投资时间" />
</el-table>
```
