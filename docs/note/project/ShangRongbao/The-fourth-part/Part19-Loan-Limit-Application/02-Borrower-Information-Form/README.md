# 02-借款人信息表单

![images](./images/ba361218-23d1-4685-99f2-573fea9781e8.png)

## 一、步骤导航

1、参考

Steps 步骤条：

https://element.eleme.io/#/zh-CN/component/steps

警告：先学习页面绑定关系

pages/user.vue=>components/borrowerNav.vue=>/pages/user/index.vue

```vue
<template>
  <div class="personal-main">
    <div class="pmain-profile">
      <div class="pmain-welcome">
        <span class="fr">上次登录时间： 2020-09-11 14:05:07 </span>
      </div>
      <div class="pmain-user">
        <div class="user-head">
          <span class="head-img" title="点击更换头像">
            <span>
              <img
                src="~/assets/images/touxiang.png"
                style="width:88px;height:88px;z-index:0;"
              />
              <i class="headframe" style="z-index:0;"></i>
            </span>
          </span>
        </div>
        <div class="user-info">
          <ul>
            <li>
              用户名<span>tg_gpdt0139</span>
              <NuxtLink v-if="$parent.userType === 2" to="/user/borrower">
                立即借款
              </NuxtLink>
            </li>
            <li>
              您还未开通第三方支付账户，请
              <NuxtLink to="/user/bind">立即开通</NuxtLink>
              以确保您的正常使用和资金安全。
            </li>
          </ul>
        </div>
      </div>
      <div class="pmain-money">
        <ul v-if="$parent.userType === 1">
          <li class="none">
            <span>
              <em>账户余额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb">0.00 </i> 元</span>
          </li>
          <li>
            <span>
              <em>冻结金额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb">0.00 </i>元</span>
          </li>
          <li>
            <span>
              <em>累计收益</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb c-pink">0.00 </i> 元</span>
          </li>
        </ul>
        <ul v-if="$parent.userType === 2">
          <li class="none">
            <span>
              <em>账户余额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb">0.00 </i> 元</span>
          </li>
          <li>
            <span>
              <em>当前借款金额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb">0.00 </i> 元</span>
          </li>
          <li>
            <span>
              <em>累计借款金额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb c-pink">0.00 </i> 元</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
```

2、页面模板

这个页面比较复杂，因此我们一步一步创建，熟悉页面结构

创建 pages/user/borrower.vue

```vue
<template>
  <div class="personal-main">
    <div class="personal-pay">
      <h3><i>借款人信息认证</i></h3>

      <el-steps :active="active" style="margin: 40px">
        <el-step title="填写借款人信息"></el-step>
        <el-step title="提交平台审核"></el-step>
        <el-step title="等待认证结果"></el-step>
      </el-steps>

      <div v-if="active === 0" class="user-borrower">
        <h6>个人基本信息</h6>

        <h6>联系人信息</h6>

        <h6>身份认证信息</h6>

        <h6>其他信息</h6>

        <el-form label-width="120px">
          <el-form-item>
            <el-button
              type="primary"
              :disabled="submitBtnDisabled"
              @click="save"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="active === 1">
        <div style="margin-top:40px;">
          <el-alert
            title="您的认证申请已成功提交，请耐心等待"
            type="warning"
            show-icon
            :closable="false"
          >
            我们将在2小时内完成审核，审核时间为周一至周五8:00至20:00。
          </el-alert>
        </div>
      </div>

      <div v-if="active === 2">
        <div style="margin-top:40px;">
          <el-alert
            v-if="borrowerStatus === 2"
            title="您的认证审批已通过"
            type="success"
            show-icon
            :closable="false"
          >
          </el-alert>

          <el-alert
            v-if="borrowerStatus === -1"
            title="您的认证审批未通过"
            type="error"
            show-icon
            :closable="false"
          >
          </el-alert>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let BASE_API = process.env.BASE_API;

    return {
      active: 0, //步骤
      borrowerStatus: null,
      submitBtnDisabled: false,
      //借款人信息
      borrower: {
        borrowerAttachList: [],
      },
      educationList: [], //学历列表
      industryList: [], //行业列表
      incomeList: [], //月收入列表
      returnSourceList: [], //还款来源列表
      contactsRelationList: [], //联系人关系
      uploadUrl: BASE_API + "/api/oss/file/upload", //文件上传地址
    };
  },

  methods: {
    save() {
      this.submitBtnDisabled = true;
      this.active = 1;
    },
  },
};
</script>
```

## 二、借款人信息页面

1、个人基本信息

```vue
<h6>个人基本信息</h6>
<el-form label-width="120px">
    <el-form-item label="年龄">
        <el-col :span="5">
            <el-input v-model="borrower.age" />
        </el-col>
    </el-form-item>

    <el-form-item label="性别">
        <el-select v-model="borrower.sex">
            <el-option :value="1" :label="'男'" />
            <el-option :value="0" :label="'女'" />
        </el-select>
    </el-form-item>
    <el-form-item label="婚否">
        <el-select v-model="borrower.marry">
            <el-option :value="true" :label="'是'" />
            <el-option :value="false" :label="'否'" />
        </el-select>
    </el-form-item>
    <el-form-item label="学历">
        <el-select v-model="borrower.education">
            <el-option
                       v-for="item in educationList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"
                       />
        </el-select>
    </el-form-item>
    <el-form-item label="行业">
        <el-select v-model="borrower.industry">
            <el-option
                       v-for="item in industryList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"
                       />
        </el-select>
    </el-form-item>
    <el-form-item label="月收入">
        <el-select v-model="borrower.income">
            <el-option
                       v-for="item in incomeList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"
                       />
        </el-select>
    </el-form-item>
    <el-form-item label="还款来源">
        <el-select v-model="borrower.returnSource">
            <el-option
                       v-for="item in returnSourceList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"
                       />
        </el-select>
    </el-form-item>

</el-form>
```

2、联系人信息

```vue
<h6>联系人信息</h6>
<el-form label-width="120px">
    <el-form-item label="联系人姓名">
        <el-col :span="5">
            <el-input v-model="borrower.contactsName" />
        </el-col>
    </el-form-item>
    <el-form-item label="联系人手机">
        <el-col :span="5">
            <el-input v-model="borrower.contactsMobile" />
        </el-col>
    </el-form-item>
    <el-form-item label="联系人关系">
        <el-select v-model="borrower.contactsRelation">
            <el-option
                       v-for="item in contactsRelationList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"
                       />
        </el-select>
    </el-form-item>
</el-form>
```

3、身份认证信息

```vue
<h6>身份认证信息</h6>
<el-form label-width="120px">
    <el-form-item label="身份证人像面">
        <el-upload
                   :on-success="onUploadSuccessIdCard1"
                   :on-remove="onUploadRemove"
                   :multiple="false"
                   :action="uploadUrl"
                   :data="{ module: 'idCard1' }"
                   :limit="1"
                   list-type="picture-card"
                   >
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="身份证国徽面">
        <el-upload
                   :on-success="onUploadSuccessIdCard2"
                   :on-remove="onUploadRemove"
                   :multiple="false"
                   :action="uploadUrl"
                   :data="{ module: 'idCard2' }"
                   :limit="1"
                   list-type="picture-card"
                   >
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
</el-form>
```

4、其他信息

```vue
<h6>其他信息</h6>
<el-form label-width="120px">
    <el-form-item label="房产信息">
        <el-upload
                   :on-success="onUploadSuccessHouse"
                   :on-remove="onUploadRemove"
                   :multiple="false"
                   :action="uploadUrl"
                   :data="{ module: 'house' }"
                   list-type="picture-card"
                   >
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="车辆信息">
        <el-upload
                   :on-success="onUploadSuccessCar"
                   :on-remove="onUploadRemove"
                   :multiple="false"
                   :action="uploadUrl"
                   :data="{ module: 'car' }"
                   list-type="picture-card"
                   >
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
</el-form>
```

5、文件上传

pages/user/borrower.vue

定义 methods：

```vue
onUploadSuccessIdCard1(response, file) {
  this.onUploadSuccess(response, file, 'idCard1')
},

onUploadSuccessIdCard2(response, file) {
  this.onUploadSuccess(response, file, 'idCard2')
},

onUploadSuccessHouse(response, file) {
  this.onUploadSuccess(response, file, 'house')
},

onUploadSuccessCar(response, file) {
  this.onUploadSuccess(response, file, 'car')
},

onUploadSuccess(response, file, type) {
  // debugger
  if (response.code !== 0) {
    this.$message.error(response.message)
    return
  }
  // 填充上传文件列表
  this.borrower.borrowerAttachList.push({
    imageName: file.name,
    imageUrl: response.data.url,
    imageType: type,
  })
},

onUploadRemove(file, fileList) {
  console.log('fileList', fileList)
  //删除oss服务器上的内容
  this.$axios
    .$delete('/api/oss/file/remove?url=' + file.response.data.url)
    .then((response) => {
      // debugger
      console.log('远程删除')
      this.borrower.borrowerAttachList = this.borrower.borrowerAttachList.filter(
        function(item) {
          console.log('item', item)
          return item.imageUrl != file.response.data.url
        }
      )
    })
},
```
