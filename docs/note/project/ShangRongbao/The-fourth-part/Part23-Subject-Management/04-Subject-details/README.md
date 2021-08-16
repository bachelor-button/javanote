# 04-标的详情

## 一、后端实现

1、Controller

AdminLendController

```java
@ApiOperation("获取标的信息")
@GetMapping("/show/{id}")
public R show(
      @ApiParam(value = "标的 id", required = true)
      @PathVariable Long id) {
  Map<String, Object> result = lendService.getLendDetail(id);
  return R.ok().data("lendDetail", result);
}
```

2、Service

接口：LendService

```java
Map<String, Object> getLendDetail(Long id);
```

实现：LendServiceImpl

```java
@Resource
private BorrowerMapper borrowerMapper;

@Resource
private BorrowerService borrowerService;

@Override
public Map<String, Object> getLendDetail(Long id) {
//查询标的对象
Lend lend = baseMapper.selectById(id);
//组装数据
String returnMethod = dictService.getNameByParentDictCodeAndValue("returnMethod", lend.getReturnMethod());
String status = LendStatusEnum.getMsgByStatus(lend.getStatus());
lend.getParam().put("returnMethod", returnMethod);
lend.getParam().put("status", status);

    //根据user_id获取借款人对象
    QueryWrapper<Borrower> borrowerQueryWrapper = new QueryWrapper<Borrower>();
    borrowerQueryWrapper.eq("user_id", lend.getUserId());
    Borrower borrower = borrowerMapper.selectOne(borrowerQueryWrapper);
    //组装借款人对象
    BorrowerDetailVO borrowerDetailVO = borrowerService.getBorrowerDetailVOById(borrower.getId());

    //组装数据
    Map<String, Object> result = new HashMap<>();
    result.put("lend", lend);
    result.put("borrower", borrowerDetailVO);

    return result;

}
```

## 二、前端

1、定义 api

src/api/core/lend.js

```js
show(id) {
return request({
url: `/admin/core/lend/show/${id}`,
method: 'get'
})
}
```

2、页面脚本

src/views/core/lend/detail.vue

```vue
<script>
import lendApi from "@/api/core/lend";
import "@/styles/show.css";

export default {
  data() {
    return {
      lendDetail: {
        lend: {
          param: {},
        },
        borrower: {},
      },
    };
  },

  created() {
    if (this.$route.params.id) {
      this.fetchDataById();
    }
  },

  methods: {
    fetchDataById() {
      lendApi.show(this.$route.params.id).then((response) => {
        this.lendDetail = response.data.lendDetail;
      });
    },

    back() {
      this.$router.push({ path: "/core/lend/list" });
    },
  },
};
</script>
```

3、页面模板

src/views/core/lend/detail.vue

```vue
<template>
  <div class="app-container">
    <h4>标的信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">标的编号</th>
          <td width="35%">
            <b>{{ lendDetail.lend.lendNo }}</b>
          </td>
          <th width="15%">标题</th>
          <td width="35%">{{ lendDetail.lend.title }}</td>
        </tr>
        <tr>
          <th>标的金额</th>
          <td>{{ lendDetail.lend.amount }}元</td>
          <th>投资期数</th>
          <td>{{ lendDetail.lend.period }}个月</td>
        </tr>
        <tr>
          <th>年化利率</th>
          <td>
            标的：{{ lendDetail.lend.lendYearRate * 100 }}%
            <br />
            平台：{{ lendDetail.lend.serviceRate * 100 }}%
          </td>
          <th>还款方式</th>
          <td>{{ lendDetail.lend.param.returnMethod }}</td>
        </tr>

        <tr>
          <th>最低投资金额</th>
          <td>{{ lendDetail.lend.lowestAmount }}元</td>
          <th>发布日期</th>
          <td>{{ lendDetail.lend.publishDate }}</td>
        </tr>
        <tr>
          <th>开始日期</th>
          <td>{{ lendDetail.lend.lendStartDate }}</td>
          <th>结束日期</th>
          <td>{{ lendDetail.lend.lendEndDate }}</td>
        </tr>
        <tr>
          <th>已投金额</th>
          <td>
            <b>{{ lendDetail.lend.investAmount }}元</b>
          </td>
          <th>投资人数</th>
          <td>{{ lendDetail.lend.investNum }}人</td>
        </tr>
        <tr>
          <th>状态</th>
          <td>
            <b>{{ lendDetail.lend.param.status }}</b>
          </td>
          <th>创建时间</th>
          <td>{{ lendDetail.lend.createTime }}</td>
        </tr>
        <tr>
          <th>说明</th>
          <td colspan="3">
            <b>{{ lendDetail.lend.lendInfo }}</b>
          </td>
        </tr>
      </tbody>
    </table>

    <h4>平台收益信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">标的预期收益</th>
          <td width="35%">
            <b>{{ lendDetail.lend.expectAmount }}元</b>
          </td>
          <th width="15%">标的已获取收益</th>
          <td width="35%">{{ lendDetail.lend.realAmount }}元</td>
        </tr>
      </tbody>
    </table>

    <h4>借款人信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">借款人</th>
          <td width="35%">
            <b>{{ lendDetail.borrower.name }}</b>
          </td>
          <th width="15%">手机</th>
          <td width="35%">{{ lendDetail.borrower.mobile }}</td>
        </tr>
        <tr>
          <th>身份证</th>
          <td>{{ lendDetail.borrower.idCard }}</td>
          <th>性别</th>
          <td>{{ lendDetail.borrower.sex }}</td>
        </tr>
        <tr>
          <th>年龄</th>
          <td>{{ lendDetail.borrower.age }}</td>
          <th>是否结婚</th>
          <td>{{ lendDetail.borrower.marry }}</td>
        </tr>
        <tr>
          <th>学历</th>
          <td>{{ lendDetail.borrower.education }}</td>
          <th>行业</th>
          <td>{{ lendDetail.borrower.industry }}</td>
        </tr>
        <tr>
          <th>月收入</th>
          <td>{{ lendDetail.borrower.income }}</td>
          <th>还款来源</th>
          <td>{{ lendDetail.borrower.returnSource }}</td>
        </tr>
        <tr>
          <th>创建时间</th>
          <td>{{ lendDetail.borrower.createTime }}</td>
          <th>状态</th>
          <td>{{ lendDetail.borrower.status }}</td>
        </tr>
      </tbody>
    </table>

    <el-row style="text-align:center;margin-top: 40px;">
      <el-button @click="back">
        返回
      </el-button>
    </el-row>
  </div>
</template>
```
