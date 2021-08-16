# 04-表单数据提交

## 一、后端开发

1、定义 VO 对象

service-core 微服务，

创建 BorrowerVO

```java
package com.atguigu.srb.core.pojo.vo;

@Data
@ApiModel(description="借款人认证信息")
public class BorrowerVO {

    @ApiModelProperty(value = "性别（1：男 0：女）")
    private Integer sex;

    @ApiModelProperty(value = "年龄")
    private Integer age;

    @ApiModelProperty(value = "学历")
    private Integer education;

    @ApiModelProperty(value = "是否结婚（1：是 0：否）")
    private Boolean marry;

    @ApiModelProperty(value = "行业")
    private Integer industry;

    @ApiModelProperty(value = "月收入")
    private Integer income;

    @ApiModelProperty(value = "还款来源")
    private Integer returnSource;

    @ApiModelProperty(value = "联系人名称")
    private String contactsName;

    @ApiModelProperty(value = "联系人手机")
    private String contactsMobile;

    @ApiModelProperty(value = "联系人关系")
    private Integer contactsRelation;

    @ApiModelProperty(value = "借款人附件资料")
    private List<BorrowerAttach> borrowerAttachList;

}
```

2、定义枚举

BorrowerStatusEnum

数据库设计中对应认证状态 status （0：未认证，1：认证中， 2：认证通过， -1：认证失败）

3、controller

service-core 中在 BorrowerController 中定义接口方法

```java
package com.atguigu.srb.core.controller.api;

@Api(tags = "借款人")
@RestController
@RequestMapping("/api/core/borrower")
@Slf4j
public class BorrowerController {

    @Resource
    private BorrowerService borrowerService;

    @ApiOperation("保存借款人信息")
    @PostMapping("/auth/save")
    public R save(@RequestBody BorrowerVO borrowerVO, HttpServletRequest request) {
        String token = request.getHeader("token");
        Long userId = JwtUtils.getUserId(token);
        borrowerService.saveBorrowerVOByUserId(borrowerVO, userId);
        return R.ok().message("信息提交成功");
    }

}
```

6、service

接口：BorrowerService

void saveBorrowerVOByUserId(BorrowerVO borrowerVO, Long userId);

实现：
BorrowerServiceImpl

```java
@Resource
private BorrowerAttachMapper borrowerAttachMapper;

@Resource
private UserInfoMapper userInfoMapper;

@Transactional(rollbackFor = Exception.class)
@Override
public void saveBorrowerVOByUserId(BorrowerVO borrowerVO, Long userId) {

    UserInfo userInfo = userInfoMapper.selectById(userId);

    //保存借款人信息
    Borrower borrower = new Borrower();
    BeanUtils.copyProperties(borrowerVO, borrower);
    borrower.setUserId(userId);
    borrower.setName(userInfo.getName());
    borrower.setIdCard(userInfo.getIdCard());
    borrower.setMobile(userInfo.getMobile());
    borrower.setStatus(BorrowerStatusEnum.AUTH_RUN.getStatus());//认证中
    baseMapper.insert(borrower);

    //保存附件
    List<BorrowerAttach> borrowerAttachList = borrowerVO.getBorrowerAttachList();
    borrowerAttachList.forEach(borrowerAttach -> {
        borrowerAttach.setBorrowerId(borrower.getId());
        borrowerAttachMapper.insert(borrowerAttach);
    });

    //更新会员状态，更新为认证中
    userInfo.setBorrowAuthStatus(BorrowerStatusEnum.AUTH_RUN.getStatus());
    userInfoMapper.updateById(userInfo);

}
```

## 二、前端整合

pages/user/borrower.vue

脚本

```vue
save() { // debugger this.submitBtnDisabled = true this.$axios
.$post('/api/core/borrower/save', this.borrower) .then((response) => {
this.active = 1 }) },
```
