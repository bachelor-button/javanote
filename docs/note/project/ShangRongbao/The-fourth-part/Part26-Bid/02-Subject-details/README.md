# 02-标的详情

需求

展示信息：

1、标的基本信息（标的表 lend）

2、借款人信息（借款人表 borrower）

3、账户余额信息（会员账户表 user_account）

4、根据投资金额计算收益（根据四种还款方式计算）

5、投资记录（投资记录表 lend_item，后续完善）

6、还款记录（还款记录表 lend_return，后续完善）

投标条件：

1、已经登录的会员

2、只有投资人可以投标，借款人不可以投标

3、投标金额必须是 100 整数倍

4、账号可用余额充足

5、同意投标协议

## 一、标的和借款人信息接口

LendController

```java
@ApiOperation("获取标的信息")
@GetMapping("/show/{id}")
public R show(
@ApiParam(value = "标的 id", required = true)
@PathVariable Long id) {
Map<String, Object> lendDetail = lendService.getLendDetail(id);
return R.ok().data("lendDetail", lendDetail);
}
```

## 二、账户余额信息接口

1、UserAccountController

```java
@ApiOperation("查询账户余额")
@GetMapping("/auth/getAccount")
public R getAccount(HttpServletRequest request){
String token = request.getHeader("token");
Long userId = JwtUtils.getUserId(token);
BigDecimal account = userAccountService.getAccount(userId);
return R.ok().data("account", account);
}
```

2、Service

接口：UserAccountService

```java
BigDecimal getAccount(Long userId);
```

实现：UserAccountServiceImpl

```java
@Override
public BigDecimal getAccount(Long userId) {
//根据 userId 查找用户账户
QueryWrapper<UserAccount> userAccountQueryWrapper = new QueryWrapper<>();
userAccountQueryWrapper.eq("user_id", userId);
UserAccount userAccount = baseMapper.selectOne(userAccountQueryWrapper);

    BigDecimal amount = userAccount.getAmount();
    return amount;

}
```

## 三、前端整合

pages/lend/\_id.vue

0、页面模板

```vue
<template>
  <!--信息详细-->
  <div class="item-detail wrap">
    <div class="breadcrumbs">
      <a href="/">首页</a>&gt; <a href="/lend">散标投资列表</a>&gt;
      <span class="cur">项目详情</span>
    </div>
    <div class="item-detail-head clearfix" data-target="sideMenu">
      <div class="hd">
        <i class="icon icon-xin"></i>
        <h2 style="width:70%">{{ lend.title }}</h2>
      </div>

      <!-- 标的信息开始 -->
      <div class="bd clearfix">
        <div class="data" style="width: auto;">
          <ul>
            <li>
              <span class="f16">借款金额</span><br />
              <span class="f30 c-333">{{ lend.amount }}</span>
              元
            </li>
            <li class="relative">
              <span class="f16">年利率</span><br />
              <span class="f30 c-orange">{{ lend.lendYearRate * 100 }}% </span>
            </li>
            <li>
              <span class="f16">借款期限</span><br />
              <span class="f30 c-333">{{ lend.period }}</span>
              个月
            </li>
            <li><span class="c-888">借款编号：</span>{{ lend.lendNo }}</li>
            <li>
              <span class="c-888">借款时间：</span>
              {{ lend.lendStartDate }}至{{ lend.lendEndDate }}
            </li>
            <li>
              <span class="c-888">还款方式：</span>{{ lend.param.returnMethod }}
            </li>
            <li class="colspan" style="line-height: 60px;">
              <span class="c-888 fl">投标进度：</span>
              <div class="progress-bar fl" style="margin-top:26px;">
                <span
                  :style="
                    'width:' + (lend.investAmount / lend.amount) * 100 + '%'
                  "
                ></span>
              </div>
              <span class="c-orange">
                {{ (lend.investAmount / lend.amount) * 100 }}%
              </span>
              <span>
                已有{{ lend.investNum }}人投资{{ lend.investAmount }}元
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 标的信息开始 -->

      <!-- 投资表单开始 -->
      <div v-if="userType === 1 && lend.status === 1" class="bd clearfix">
        <div class="data" style="width: auto;">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="投资金额">
              <el-input
                v-model="invest.investAmount"
                :disabled="lend.status != 1"
                @blur="getInterestCount()"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="您将获得收益">
              <span class="c-orange">{{ interestCount }}</span>
              元
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="agree">同意</el-checkbox>
              <span class="orange">
                <a href="#">《出借协议》</a>
              </span>
              <el-button
                type="warning"
                @click="commitInvest"
                :disabled="!agree"
              >
                立即投资
              </el-button>
            </el-form-item>
          </el-form>
          <p>
            您的账户余额 <span class="c-orange">{{ account }}</span> 元，
            <a href="/user/recharge" class="c-888">马上充值</a>
          </p>
        </div>
      </div>
      <!-- 投资表单结束 -->
    </div>

    <!-- 投资记录 -->
    <div class="item-detail-body clearfix mrt30 ui-tab">
      <div class="ui-tab-nav hd">
        <ul>
          <li class="nav_li active">
            <a href="javascript:;">投资记录</a>
          </li>
        </ul>
      </div>
      <div class="bd">
        <div class="ui-tab-item active" style="display: block;">
          <div class="repayment-list">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <th>投标人</th>
                  <th>投标金额</th>
                  <th>投标时间</th>
                </tr>
              </tbody>
              <tbody id="repayment_content">
                <tr v-for="lendItem in lendItemList" :key="lendItem.id">
                  <td>{{ lendItem.investName }}</td>
                  <td>
                    <span class="c-orange">￥{{ lendItem.investAmount }}</span>
                  </td>
                  <td>{{ lendItem.investTime }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 借款和借款人信息 -->
    <div class="item-detail-body clearfix mrt30 ui-tab">
      <div class="ui-tab-nav hd">
        <ul>
          <li class="nav_li active">
            <a href="javascript:;">借款信息</a>
          </li>
        </ul>
      </div>
      <div class="bd">
        <div class="ui-tab-item active" style="display: block;">
          <div class="borrow-info" style="width:auto;">
            <dl class="item">
              <dt>
                <h3>项目介绍</h3>
              </dt>
              <dd>
                <div class="text">
                  <p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;">
                    {{ lend.lendInfo }}
                  </p>
                </div>
              </dd>
            </dl>

            <dl class="item">
              <dt>
                <h3>借款人信息</h3>
              </dt>
              <dd>
                <div class="text">
                  <p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;">
                    姓名：{{ borrower.name }} <br />
                    手机号码：{{ borrower.mobile }} <br />
                    身份认证：已认证 <br />
                    注册时间：{{ borrower.createTime }} <br />
                  </p>
                </div>
              </dd>
            </dl>

            <dl class="item">
              <dt>
                <h3>审核信息</h3>
              </dt>
              <dd>
                <div class="verify clearfix" style="width: auto;">
                  <ul>
                    <li>
                      <i class="icon icon-4"></i><br />
                      身份证
                    </li>
                    <li>
                      <i class="icon icon-5"></i><br />
                      户口本
                    </li>
                    <li>
                      <i class="icon icon-6"></i><br />
                      结婚证
                    </li>
                    <li>
                      <i class="icon icon-7"></i><br />
                      工作证明
                    </li>
                    <li>
                      <i class="icon icon-8"></i><br />
                      工资卡流水
                    </li>
                    <li>
                      <i class="icon icon-9"></i><br />
                      收入证明
                    </li>
                    <li>
                      <i class="icon icon-10"></i><br />
                      征信报告
                    </li>
                    <li>
                      <i class="icon icon-11"></i><br />
                      亲属调查
                    </li>
                    <li>
                      <i class="icon icon-19"></i><br />
                      行驶证
                    </li>
                    <li>
                      <i class="icon icon-20"></i><br />
                      车辆登记证
                    </li>
                    <li>
                      <i class="icon icon-21"></i><br />
                      车辆登记发票
                    </li>
                    <li>
                      <i class="icon icon-22"></i><br />
                      车辆交强险
                    </li>
                    <li>
                      <i class="icon icon-23"></i><br />
                      车辆商业保险
                    </li>
                    <li>
                      <i class="icon icon-24"></i><br />
                      车辆评估认证
                    </li>
                  </ul>
                </div>
              </dd>
            </dl>
            <dl class="item">
              <dt>
                <h3>风控步骤</h3>
              </dt>
              <dd>
                <div class="text">
                  <p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;">
                    调查：风控部对借款人各项信息进行了全面的电话征信，一切资料真实可靠。<span
                    ></span>
                  </p>
                  <p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;">
                    抵押物：全款长安福特福克斯汽车，车牌号：川<span>AYY***</span>，新车购买于<span>2013</span>年，裸车价<span>14</span>万，评估价<span>5</span>万。
                  </p>
                  <p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;">
                    权证：汽车已入库、已办理相关手续等。
                  </p>
                  <p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;">
                    担保：质押物担保。
                  </p>
                  <p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;">
                    结论：此客户为老客户，上笔贷款<span>4</span>万元，标的号为<span>20200745682</span>，已结清，现因资金周转，再次申请贷款。借款人居住稳定，收入来源可靠，经风控综合评估，同意放款<span>4</span>万。
                  </p>
                  <p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;">
                    保障：借款逾期<span>48</span>小时内，易贷风险准备金先行垫付。
                  </p>
                </div>
                <div class="step clearfix">
                  <ul>
                    <li><i class="icon icon-1"></i>资料审核</li>
                    <li><i class="icon icon-2"></i>实地调查</li>
                    <li><i class="icon icon-3"></i>资产评估</li>
                    <li class="no"><i class="icon icon-4"></i>发布借款</li>
                  </ul>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "~/assets/css/index.css";
import "~/assets/css/detail.css";
import cookie from "js-cookie";

export default {
  data() {
    return {
      account: 0, //账户余额
      agree: false, //是否同意协议
      invest: {
        lendId: 0, //标的 id
        investAmount: 100, //投资金额
      },
      interestCount: 0, //将获得收益
      userType: 0, //用户类型
    };
  },
};
</script>
```

其他页面元素(了解)

```vue
<!-- 还款计划 -->
<div class="item-detail-body clearfix mrt30 ui-tab">
      <div class="ui-tab-nav hd">
        <ul>
          <li class="nav_li active">
            <a href="javascript:;">还款计划</a>
          </li>
        </ul>
      </div>
      <div class="bd">
        <div class="ui-tab-item active" style="display: block;">
          <div class="repayment-list">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>还款期数</th>
                  <th>还款日期</th>
                  <th>应还本金(元)</th>
                  <th>应还利息(元)</th>
                  <th>状态</th>
                  <th>是否逾期</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody id="repayment_content">
                <tr v-for="lendReturn in lendReturnList" :key="lendReturn.id">
                  <td>{{ lendReturn.currentPeriod }}</td>
                  <td>{{ lendReturn.returnDate }}</td>
                  <td class="c-orange">￥{{ lendReturn.principal }}</td>
                  <td class="c-orange">￥{{ lendReturn.interest }}</td>
                  <td>{{ lendReturn.status === 0 ? '未还款' : '已还款' }}</td>
                  <td>
                    <span v-if="lendReturn.overdue">
                      是（逾期金额：{{ lendReturn.overdueTotal }}元）
                    </span>
                    <span v-else>否</span>
                  </td>
                  <td>
                    <a href="javascript:" @click="commitReturn(lendReturn.id)">
                      {{ lendReturn.status === 0 ? '还款' : '' }}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

<!-- 回款计划 -->
<div v-if="userType === 1" class="item-detail-body clearfix mrt30 ui-tab">
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

1、

获取标的详情信息

```js
async asyncData({ \$axios, params }) {
let lendId = params.id //通过路由参数获取标的 id

    //通过lendId获取标的详情信息
    let response = await $axios.$get('/api/core/lend/show/' + lendId)

    return {
      lend: response.data.lendDetail.lend, //标的详情
      borrower: response.data.lendDetail.borrower, //借款人信息
    }

},
```

2、查询账户余额

```js
    //查询账户余额
    fetchAccount() {
      let userInfo = cookie.get('userInfo')
      if (userInfo) {
        this.$axios
          .$get('/api/core/userAccount/auth/getAccount')
          .then((response) => {
            this.account = response.data.account
          })
      }
    },
```

3、获取登录人的用户类型

```js
//获取登录人的用户类型
fetchUserType() {
let userInfo = cookie.get('userInfo')
if (userInfo) {
userInfo = JSON.parse(userInfo)
this.userType = userInfo.userType
}
},
```