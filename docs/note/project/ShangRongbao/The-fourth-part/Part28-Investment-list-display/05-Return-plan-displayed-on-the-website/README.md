# 05-网站端显示回款计划

## 一、后端接口

Controller

创建 LendItemReturnController

```java
package com.atguigu.srb.core.controller.api;

@Api(tags = "回款计划")
@RestController
@RequestMapping("/api/core/lendItemReturn")
@Slf4j
public class LendItemReturnController {

    @Resource
    private LendItemReturnService lendItemReturnService;

    @ApiOperation("获取列表")
    @GetMapping("/auth/list/{lendId}")
    public R list(
            @ApiParam(value = "标的id", required = true)
            @PathVariable Long lendId, HttpServletRequest request) {

        String token = request.getHeader("token");
        Long userId = JwtUtils.getUserId(token);
        List<LendItemReturn> list = lendItemReturnService.selectByLendId(lendId, userId);
        return R.ok().data("list", list);
    }

}
```

2、Service

接口：LendItemReturnService

```java
List<LendItemReturn> selectByLendId(Long lendId, Long userId);
```

实现：LendItemReturnServiceImpl

```java
@Override
public List<LendItemReturn> selectByLendId(Long lendId, Long userId) {
QueryWrapper<LendItemReturn> queryWrapper = new QueryWrapper<>();
queryWrapper
.eq("lend_id", lendId)
.eq("invest_user_id", userId)
.orderByAsc("current_period");
return baseMapper.selectList(queryWrapper);
}
```

## 二、前端

1、页面脚本

pages/lend/\_id.vue

```java
data() {
return {
......,

    lendItemReturnList: [], //回款计划

}
},

mounted() {
......

//回款计划
this.fetchLendItemReturnList()
},

methods

//回款计划
fetchLendItemReturnList() {
this.$axios
        .$get('/api/core/lendItemReturn/auth/list/' + this.\$route.params.id)
.then((response) => {
this.lendItemReturnList = response.data.list
})
},
```

2、页面模板

pages/lend/\_id.vue

```vue
<!-- 回款计划 -->
<div class="item-detail-body clearfix mrt30 ui-tab">
    <div class="ui-tab-nav hd">
        <ul>
            <li class="nav_li active">
                <a href="javascript:;">回款计划</a>
            </li>
        </ul>
    </div>
    <div class="bd">
        <div class="ui-tab-item active" style="display: block;">
            <div class="repayment-list">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>期数</th>
                            <th>本金(元)</th>
                            <th>利息(元)</th>
                            <th>本息(元)</th>
                            <th>计划回款日期</th>
                            <th>实际回款日期</th>
                            <th>状态</th>
                            <th>是否逾期</th>
                        </tr>
                    </thead>
                    <tbody id="repayment_content">
                        <tr
                            v-for="lendItemReturn in lendItemReturnList"
                            :key="lendItemReturn.id"
                            >
                            <td>{{ lendItemReturn.currentPeriod }}</td>
                            <td class="c-orange">￥{{ lendItemReturn.principal }}</td>
                            <td class="c-orange">￥{{ lendItemReturn.interest }}</td>
                            <td class="c-orange">￥{{ lendItemReturn.total }}</td>
                            <td>{{ lendItemReturn.returnDate }}</td>
                            <td>{{ lendItemReturn.realReturnTime }}</td>
                            <td>
                                {{ lendItemReturn.status === 0 ? '未还款' : '已还款' }}
                            </td>
                            <td>
                                <span v-if="lendItemReturn.overdue">
                                    是（逾期金额：{{ lendReturn.overdueTotal }}元）
                                </span>
                                <span v-else>否</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
```
