# 03-管理端显示还款计划

## 一、后端接口

1、Controller

创建 AdminLendReturnController

```java
package com.atguigu.srb.core.controller.admin;

@Api(tags = "还款记录")
@RestController
@RequestMapping("/admin/core/lendReturn")
@Slf4j
public class AdminLendReturnController {

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

2、Service

接口：LendReturnService

```java
List<LendReturn> selectByLendId(Long lendId);
```

实现：LendReturnServiceImpl

```java
@Override
public List<LendReturn> selectByLendId(Long lendId) {
QueryWrapper<LendReturn> queryWrapper = new QueryWrapper();
queryWrapper.eq("lend_id", lendId);
List<LendReturn> lendReturnList = baseMapper.selectList(queryWrapper);
return lendReturnList;
}
```

## 二、前端

1、创建 api

api/core/lend-return.js

```js
import request from "@/utils/request";

export default {
  getList(lendId) {
    return request({
      url: `/admin/core/lendReturn/list/` + lendId,
      method: "get",
    });
  },
};
```

2、页面脚本

views/core/lend/detail.vue

```js
import lendReturnApi from '@/api/core/lend-return'

data() {
return {
......,

    lendReturnList: [] //还款计划列表

}
},

created() {
if (this.\$route.params.id) {
......

    // 还款计划
    this.fetchLendReturnList()

}
},

methods

fetchLendReturnList() {
lendReturnApi.getList(this.\$route.params.id).then(response => {
this.lendReturnList = response.data.list
})
}
```

3、页面模板

views/core/lend/detail.vue

将还款计划放在投资记录后面

```vue
<h4>还款计划</h4>
<el-table :data="lendReturnList" stripe style="width: 100%" border>
    <el-table-column type="index" label="序号" width="70" align="center" />
    <el-table-column prop="currentPeriod" label="当前的期数" />
    <el-table-column prop="principal" label="本金" />
    <el-table-column prop="interest" label="利息" />
    <el-table-column prop="total" label="本息" />
    <el-table-column prop="returnDate" label="还款日期" width="150" />
    <el-table-column prop="realReturnTime" label="实际还款时间" />
    <el-table-column label="是否逾期">
        <template slot-scope="scope">
            <span v-if="scope.row.overdue">
                是（逾期金额：{{ scope.row.overdueTotal }}元）
            </span>
            <span v-else>否</span>
        </template>
    </el-table-column>
    <el-table-column label="状态" width="80">
        <template slot-scope="scope">
            {{ scope.row.status === 0 ? '未还款' : '已还款' }}
        </template>
    </el-table-column>
</el-table>
```
