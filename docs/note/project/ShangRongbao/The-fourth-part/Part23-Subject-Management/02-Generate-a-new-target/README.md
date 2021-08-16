# 02-生成新标的

## 一、后端实现

1、创建枚举

创建 LendStatusEnum

```java
CHECK(0, "待发布"),
INVEST_RUN(1, "募资中"),
PAY_RUN(2, "还款中"),
PAY_OK(3, "已结清"),
FINISH(4, "结标"),
CANCEL(-1, "已撤标"),
;
```

2、定义编号辅助类

service-core 中添加辅助类：util.LendNoUtils

3、Service

BorrowInfoServiceImpl
实现：

```java
@Resource
private LendService lendService;

@Transactional(rollbackFor = Exception.class)
@Override
public void approval(BorrowInfoApprovalVO borrowInfoApprovalVO) {

    //修改借款信息状态

......

    //审核通过则创建标的
    if (borrowInfoApprovalVO.getStatus().intValue() == BorrowInfoStatusEnum.CHECK_OK.getStatus().intValue()) {
        //创建标的
        lendService.createLend(borrowInfoApprovalVO, borrowInfo);
    }

}
```

LendService 接口：

```java
void createLend(BorrowInfoApprovalVO borrowInfoApprovalVO, BorrowInfo borrowInfo);
```

LendServiceImpl 实现：生成标的

```java
@Override
public void createLend(BorrowInfoApprovalVO borrowInfoApprovalVO, BorrowInfo borrowInfo) {
Lend lend = new Lend();
lend.setUserId(borrowInfo.getUserId());
lend.setBorrowInfoId(borrowInfo.getId());
lend.setLendNo(LendNoUtils.getLendNo());//生成编号
lend.setTitle(borrowInfoApprovalVO.getTitle());
lend.setAmount(borrowInfo.getAmount());
lend.setPeriod(borrowInfo.getPeriod());
lend.setLendYearRate(borrowInfoApprovalVO.getLendYearRate().divide(new BigDecimal(100)));//从审批对象中获取
lend.setServiceRate(borrowInfoApprovalVO.getServiceRate().divide(new BigDecimal(100)));//从审批对象中获取
lend.setReturnMethod(borrowInfo.getReturnMethod());
lend.setLowestAmount(new BigDecimal(100));
lend.setInvestAmount(new BigDecimal(0));
lend.setInvestNum(0);
lend.setPublishDate(LocalDateTime.now());

    //起息日期
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate lendStartDate = LocalDate.parse(borrowInfoApprovalVO.getLendStartDate(), dtf);
    lend.setLendStartDate(lendStartDate);
    //结束日期
    LocalDate lendEndDate = lendStartDate.plusMonths(borrowInfo.getPeriod());
    lend.setLendEndDate(lendEndDate);

    lend.setLendInfo(borrowInfoApprovalVO.getLendInfo());//描述

    //平台预期收益
    //        月年化 = 年化 / 12
    BigDecimal monthRate = lend.getServiceRate().divide(new BigDecimal(12), 8, BigDecimal.ROUND_DOWN);
    //        平台收益 = 标的金额 * 月年化 * 期数
    BigDecimal expectAmount = lend.getAmount().multiply(monthRate).multiply(new BigDecimal(lend.getPeriod()));
    lend.setExpectAmount(expectAmount);

    //实际收益
    lend.setRealAmount(new BigDecimal(0));
    //状态
    lend.setStatus(LendStatusEnum.INVEST_RUN.getStatus());
    //审核时间
    lend.setCheckTime(LocalDateTime.now());
    //审核人
    lend.setCheckAdminId(1L);

    baseMapper.insert(lend);

}
```
