# 03-标的列表

## 一、后端实现

1、扩展实体对象

在 Lend 类中扩展以下字段

```java
@ApiModelProperty(value = "其他参数")
@TableField(exist = false)
private Map<String,Object> param = new HashMap<>();
```

2、Controller

添加 AdminLendController

```java
package com.atguigu.srb.core.controller.admin;

@Api(tags = "标的管理")
@RestController
@RequestMapping("/admin/core/lend")
@Slf4j
public class AdminLendController {

    @Resource
    private LendService lendService;

    @ApiOperation("标的列表")
    @GetMapping("/list")
    public R list() {
        List<Lend> lendList = lendService.selectList();
        return R.ok().data("list", lendList);
    }

}
```

3、Service

接口：LendService

```java
List<Lend> selectList();
```

实现：LendServiceImpl

```java
@Resource
private DictService dictService;

@Override
public List<Lend> selectList() {
List<Lend> lendList = baseMapper.selectList(null);
lendList.forEach(lend -> {
String returnMethod = dictService.getNameByParentDictCodeAndValue("returnMethod", lend.getReturnMethod());
String status = LendStatusEnum.getMsgByStatus(lend.getStatus());
lend.getParam().put("returnMethod", returnMethod);
lend.getParam().put("status", status);
});
return lendList;
}
```

## 二、前端

1、创建页面组件

创建 src/views/core/lend/list.vue

```vue
<template>
  <div class="app-container">
    标的列表
  </div>
</template>

<script>
export default {};
</script>
```

创建 src/views/core/lend/detail.vue

```vue
<template>
  <div class="app-container">
    标的详情
  </div>
</template>

<script>
export default {};
</script>
```

2、配置路由

src/router/index.js

```js
{
path: '/core/lend',
component: Layout,
name: 'coreLend',
meta: { title: '标的管理', icon: 'el-icon-s-flag' },
alwaysShow: true,
children: [
    {
      path: 'list',
      name: 'coreLendList',
      component: () => import('@/views/core/lend/list'),
      meta: { title: '标的列表' }
    },
    {
    path: 'detail/:id',
    name: 'coreLendDetail',
    component: () => import('@/views/core/lend/detail'),
    meta: { title: '标的详情' },
    hidden: true
    }
  ]
},
```

3、定义 api

创建 src/api/core/lend.js

```js
import request from "@/utils/request";

export default {
  getList() {
    return request({
      url: `/admin/core/lend/list`,
      method: "get",
    });
  },
};
```

4、页面脚本

src/views/core/lend/list.vue

```vue
<script>
import lendApi from "@/api/core/lend";

export default {
  data() {
    return {
      list: null, // 列表
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    // 加载列表数据
    fetchData() {
      lendApi.getList().then((response) => {
        this.list = response.data.list;
      });
    },
  },
};
</script>
```

5、页面模板

src/views/core/lend/list.vue

```vue
<template>
  <div class="app-container">
    <!-- 列表 -->
    <el-table :data="list" stripe>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="lendNo" label="标的编号" width="160" />
      <el-table-column prop="amount" label="标的金额" />
      <el-table-column prop="period" label="投资期数" />
      <el-table-column label="年化利率">
        <template slot-scope="scope">
          {{ scope.row.lendYearRate * 100 }}%
        </template>
      </el-table-column>
      <el-table-column prop="investAmount" label="已投金额" />
      <el-table-column prop="investNum" label="投资人数" />
      <el-table-column prop="publishDate" label="发布时间" width="150" />
      <el-table-column prop="lendStartDate" label="开始日期" />
      <el-table-column prop="lendEndDate" label="结束日期" />
      <el-table-column prop="param.returnMethod" label="还款方式" />
      <el-table-column prop="param.status" label="状态" />

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">
            <router-link :to="'/core/lend/detail/' + scope.row.id">
              查看
            </router-link>
          </el-button>

          <el-button
            v-if="scope.row.status == 1"
            type="warning"
            size="mini"
            @click="makeLoan(scope.row.id)"
          >
            放款
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
```
