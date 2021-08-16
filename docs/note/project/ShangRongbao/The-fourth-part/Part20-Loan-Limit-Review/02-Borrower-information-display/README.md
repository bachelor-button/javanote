# 02-借款人信息展示

## 一、后端实现

1、定义 VO 对象

BorrowerAttachVO

```java
package com.atguigu.srb.core.pojo.vo;

@Data
@ApiModel(value="借款人附件资料")
public class BorrowerAttachVO {

    @ApiModelProperty(value = "图片类型（idCard1：身份证正面，idCard2：身份证反面，house：房产证，car：车）")
    private String imageType;

    @ApiModelProperty(value = "图片路径")
    private String imageUrl;

}
```

BorrowerDetailVO

```java
package com.atguigu.srb.core.pojo.vo;

@Data
@ApiModel(description="借款人信息详情")
public class BorrowerDetailVO {

    @ApiModelProperty(value = "用户id")
    private Long userId;

    @ApiModelProperty(value = "姓名")
    private String name;

    @ApiModelProperty(value = "身份证号")
    private String idCard;

    @ApiModelProperty(value = "手机")
    private String mobile;

    @ApiModelProperty(value = "性别")
    private String sex;

    @ApiModelProperty(value = "年龄")
    private Integer age;

    @ApiModelProperty(value = "学历")
    private String education;

    @ApiModelProperty(value = "是否结婚")
    private String marry;

    @ApiModelProperty(value = "行业")
    private String industry;

    @ApiModelProperty(value = "月收入")
    private String income;

    @ApiModelProperty(value = "还款来源")
    private String returnSource;

    @ApiModelProperty(value = "联系人名称")
    private String contactsName;

    @ApiModelProperty(value = "联系人手机")
    private String contactsMobile;

    @ApiModelProperty(value = "联系人关系")
    private String contactsRelation;

    @ApiModelProperty(value = "审核状态")
    private String status;

    @ApiModelProperty(value = "创建时间")
    private LocalDateTime createTime;

    @ApiModelProperty(value = "借款人附件资料")
    private List<BorrowerAttachVO> borrowerAttachVOList;

}
```

2、Controller

AdminBorrowerController

```java
@ApiOperation("获取借款人信息")
@GetMapping("/show/{id}")
public R show(
@ApiParam(value = "借款人 id", required = true)
@PathVariable Long id) {
BorrowerDetailVO borrowerDetailVO = borrowerService.getBorrowerDetailVOById(id);
return R.ok().data("borrowerDetailVO", borrowerDetailVO);
}
```

3、BorrowerService

接口

```java
BorrowerDetailVO getBorrowerDetailVOById(Long id);
```

实现：
调用 BorrowerAttachService 和 DictService

```java
@Resource
private DictService dictService;

@Resource
private BorrowerAttachService borrowerAttachService;

@Override
public BorrowerDetailVO getBorrowerDetailVOById(Long id) {

    //获取借款人信息
    Borrower borrower = baseMapper.selectById(id);

    //填充基本借款人信息
    BorrowerDetailVO borrowerDetailVO = new BorrowerDetailVO();
    BeanUtils.copyProperties(borrower, borrowerDetailVO);

    //婚否
    borrowerDetailVO.setMarry(borrower.getMarry()?"是":"否");
    //性别
    borrowerDetailVO.setSex(borrower.getSex()==1?"男":"女");

    //计算下拉列表选中内容
    String education = dictService.getNameByParentDictCodeAndValue("education", borrower.getEducation());
    String industry = dictService.getNameByParentDictCodeAndValue("moneyUse", borrower.getIndustry());
    String income = dictService.getNameByParentDictCodeAndValue("income", borrower.getIncome());
    String returnSource = dictService.getNameByParentDictCodeAndValue("returnSource", borrower.getReturnSource());
    String contactsRelation = dictService.getNameByParentDictCodeAndValue("relation", borrower.getContactsRelation());

    //设置下拉列表选中内容
    borrowerDetailVO.setEducation(education);
    borrowerDetailVO.setIndustry(industry);
    borrowerDetailVO.setIncome(income);
    borrowerDetailVO.setReturnSource(returnSource);
    borrowerDetailVO.setContactsRelation(contactsRelation);

    //审批状态
    String status = BorrowerStatusEnum.getMsgByStatus(borrower.getStatus());
    borrowerDetailVO.setStatus(status);

    //获取附件VO列表
    List<BorrowerAttachVO> borrowerAttachVOList =  borrowerAttachService.selectBorrowerAttachVOList(id);
    borrowerDetailVO.setBorrowerAttachVOList(borrowerAttachVOList);

    return borrowerDetailVO;

}
```

4、DictService

接口

```java
String getNameByParentDictCodeAndValue(String dictCode, Integer value);
```

实现

```java
@Override
public String getNameByParentDictCodeAndValue(String dictCode, Integer value) {
QueryWrapper<Dict> dictQueryWrapper = new QueryWrapper<Dict>();
dictQueryWrapper.eq("dict_code", dictCode);
Dict parentDict = baseMapper.selectOne(dictQueryWrapper);

    if(parentDict == null) {
        return "";
    }

    dictQueryWrapper = new QueryWrapper<>();
    dictQueryWrapper
        .eq("parent_id", parentDict.getId())
        .eq("value", value);
    Dict dict = baseMapper.selectOne(dictQueryWrapper);

    if(dict == null) {
        return "";
    }

    return dict.getName();

}
```

5、BorrowerAttachService

接口

```java
List<BorrowerAttachVO> selectBorrowerAttachVOList(Long borrowerId);
```

实现

```java
@Override
public List<BorrowerAttachVO> selectBorrowerAttachVOList(Long borrowerId) {

    QueryWrapper<BorrowerAttach> borrowerAttachQueryWrapper = new QueryWrapper<>();
    borrowerAttachQueryWrapper.eq("borrower_id", borrowerId);
    List<BorrowerAttach> borrowerAttachList = baseMapper.selectList(borrowerAttachQueryWrapper);

    List<BorrowerAttachVO> borrowerAttachVOList = new ArrayList<>();
    borrowerAttachList.forEach(borrowerAttach -> {
        BorrowerAttachVO borrowerAttachVO = new BorrowerAttachVO();
        borrowerAttachVO.setImageType(borrowerAttach.getImageType());
        borrowerAttachVO.setImageUrl(borrowerAttach.getImageUrl());

        borrowerAttachVOList.add(borrowerAttachVO);
    });

    return borrowerAttachVOList;

}
```

## 二、前端实现

1、定义 api

api/borrower.js 中添加方法

```java
show(id) {
  return request({
  url: `/admin/core/borrower/show/${id}`,
  method: 'get'
  })
},
```

2、页面脚本

src/views/core/borrower/detail.vue

```vue
<script>
// 引入组件
import borrowerApi from "@/api/core/borrower";

export default {
  data() {
    return {
      borrower: {},
      saveBtnDisabled: false,
      approvalForm: {
        borrowerId: 0,
        status: 2,
        content: "",
        infoIntegral: 30,
        isIdCardOk: false,
        isHouseOk: false,
        isCarOk: false,
      },
    };
  },

  created() {
    if (this.$route.params.id) {
      this.fetchDataById();
    }
  },

  methods: {
    // 根据id查询记录
    fetchDataById() {
      borrowerApi.show(this.$route.params.id).then((response) => {
        this.borrower = response.data.borrowerDetailVO;
      });
    },

    back() {
      this.$router.push({ path: "/core/borrower/list" });
    },
  },
};
</script>
```

3、页面模板

src/views/core/borrower/detail.vue

```vue
<template>
  <div class="app-container">
    <el-form label-width="100px" class="form-table">
      <el-row>
        <el-col :span="6">
          <el-form-item label="状态">
            {{ borrower.status }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建时间">
            {{ borrower.createTime }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名">
            {{ borrower.name }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            {{ borrower.sex }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄">
            {{ borrower.age }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机">
            {{ borrower.mobile }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="学历">
            {{ borrower.education }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否结婚">
            {{ borrower.marry }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="行业">
            {{ borrower.industry }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="还款来源">
            {{ borrower.returnSource }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="身份证号">
            {{ borrower.idCard }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人名称">
            {{ borrower.contactsName }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人手机">
            {{ borrower.contactsMobile }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人关系">
            {{ borrower.contactsRelation }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="身份证正面">
            <span v-for="item in borrower.borrowerAttachVOList" :key="item.id">
              <el-image
                v-if="item.imageType == 'idCard1'"
                style="width: 150px;"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              />
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="身份证反面">
            <span v-for="item in borrower.borrowerAttachVOList" :key="item.id">
              <el-image
                v-if="item.imageType == 'idCard2'"
                style="width: 150px;"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              />
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="房产信息">
            <span v-for="item in borrower.borrowerAttachVOList" :key="item.id">
              <el-image
                v-if="item.imageType == 'house'"
                style="width: 150px;"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              />
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="车辆信息">
            <span v-for="item in borrower.borrowerAttachVOList" :key="item.id">
              <el-image
                v-if="item.imageType == 'car'"
                style="width: 150px;"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              />
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align:center">
        <el-button @click="back">
          返回
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>
```
