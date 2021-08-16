# 03-还款计划和回款计划

1、生成还款计划

LendServiceImpl

```java
@Resource
private LendReturnService lendReturnService;

@Resource
private LendItemReturnService lendItemReturnService;

/\*\*
_ 还款计划
_
_ @param lend
_/
private void repaymentPlan(Lend lend) {

    //还款计划列表
    List<LendReturn> lendReturnList = new ArrayList<>();

    //按还款时间生成还款计划
    int len = lend.getPeriod().intValue();
    for (int i = 1; i <= len; i++) {

        //创建还款计划对象
        LendReturn lendReturn = new LendReturn();
        lendReturn.setReturnNo(LendNoUtils.getReturnNo());
        lendReturn.setLendId(lend.getId());
        lendReturn.setBorrowInfoId(lend.getBorrowInfoId());
        lendReturn.setUserId(lend.getUserId());
        lendReturn.setAmount(lend.getAmount());
        lendReturn.setBaseAmount(lend.getInvestAmount());
        lendReturn.setLendYearRate(lend.getLendYearRate());
        lendReturn.setCurrentPeriod(i);//当前期数
        lendReturn.setReturnMethod(lend.getReturnMethod());

        //说明：还款计划中的这三项 = 回款计划中对应的这三项和：因此需要先生成对应的回款计划
        //			lendReturn.setPrincipal();
        //			lendReturn.setInterest();
        //			lendReturn.setTotal();

        lendReturn.setFee(new BigDecimal(0));
        lendReturn.setReturnDate(lend.getLendStartDate().plusMonths(i)); //第二个月开始还款
        lendReturn.setOverdue(false);
        if (i == len) { //最后一个月
            //标识为最后一次还款
            lendReturn.setLast(true);
        } else {
            lendReturn.setLast(false);
        }
        lendReturn.setStatus(0);
        lendReturnList.add(lendReturn);
    }
    //批量保存
    lendReturnService.saveBatch(lendReturnList);

    //获取lendReturnList中还款期数与还款计划id对应map
    Map<Integer, Long> lendReturnMap = lendReturnList.stream().collect(
        Collectors.toMap(LendReturn::getCurrentPeriod, LendReturn::getId)
    );

    //======================================================
    //=============获取所有投资者，生成回款计划===================
    //======================================================
    //回款计划列表
    List<LendItemReturn> lendItemReturnAllList = new ArrayList<>();
    //获取投资成功的投资记录
    List<LendItem> lendItemList = lendItemService.selectByLendId(lend.getId(), 1);
    for (LendItem lendItem : lendItemList) {

        //创建回款计划列表
        List<LendItemReturn> lendItemReturnList = this.returnInvest(lendItem.getId(), lendReturnMap, lend);
        lendItemReturnAllList.addAll(lendItemReturnList);
    }

    //更新还款计划中的相关金额数据
    for (LendReturn lendReturn : lendReturnList) {

        BigDecimal sumPrincipal = lendItemReturnAllList.stream()
            //过滤条件：当回款计划中的还款计划id == 当前还款计划id的时候
            .filter(item -> item.getLendReturnId().longValue() == lendReturn.getId().longValue())
            //将所有回款计划中计算的每月应收本金相加
            .map(LendItemReturn::getPrincipal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal sumInterest = lendItemReturnAllList.stream()
            .filter(item -> item.getLendReturnId().longValue() == lendReturn.getId().longValue())
            .map(LendItemReturn::getInterest)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal sumTotal = lendItemReturnAllList.stream()
            .filter(item -> item.getLendReturnId().longValue() == lendReturn.getId().longValue())
            .map(LendItemReturn::getTotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        lendReturn.setPrincipal(sumPrincipal); //每期还款本金
        lendReturn.setInterest(sumInterest); //每期还款利息
        lendReturn.setTotal(sumTotal); //每期还款本息
    }
    lendReturnService.updateBatchById(lendReturnList);

}
```

2、生成回款计划

LendServiceImpl

```java
/\*\*
_ 回款计划
_
_ @param lendItemId
_ @param lendReturnMap 还款期数与还款计划 id 对应 map
_ @param lend
_ @return
\*/
public List<LendItemReturn> returnInvest(Long lendItemId, Map<Integer, Long> lendReturnMap, Lend lend) {

    //投标信息
    LendItem lendItem = lendItemService.getById(lendItemId);

    //投资金额
    BigDecimal amount = lendItem.getInvestAmount();
    //年化利率
    BigDecimal yearRate = lendItem.getLendYearRate();
    //投资期数
    int totalMonth = lend.getPeriod();

    Map<Integer, BigDecimal> mapInterest = null;  //还款期数 -> 利息
    Map<Integer, BigDecimal> mapPrincipal = null; //还款期数 -> 本金

    //根据还款方式计算本金和利息
    if (lend.getReturnMethod().intValue() == ReturnMethodEnum.ONE.getMethod()) {
        //利息
        mapInterest = Amount1Helper.getPerMonthInterest(amount, yearRate, totalMonth);
        //本金
        mapPrincipal = Amount1Helper.getPerMonthPrincipal(amount, yearRate, totalMonth);
    } else if (lend.getReturnMethod().intValue() == ReturnMethodEnum.TWO.getMethod()) {
        mapInterest = Amount2Helper.getPerMonthInterest(amount, yearRate, totalMonth);
        mapPrincipal = Amount2Helper.getPerMonthPrincipal(amount, yearRate, totalMonth);
    } else if (lend.getReturnMethod().intValue() == ReturnMethodEnum.THREE.getMethod()) {
        mapInterest = Amount3Helper.getPerMonthInterest(amount, yearRate, totalMonth);
        mapPrincipal = Amount3Helper.getPerMonthPrincipal(amount, yearRate, totalMonth);
    } else {
        mapInterest = Amount4Helper.getPerMonthInterest(amount, yearRate, totalMonth);
        mapPrincipal = Amount4Helper.getPerMonthPrincipal(amount, yearRate, totalMonth);
    }

    //创建回款计划列表
    List<LendItemReturn> lendItemReturnList = new ArrayList<>();
    for (Map.Entry<Integer, BigDecimal> entry : mapInterest.entrySet()) {
        Integer currentPeriod = entry.getKey();
        //根据还款期数获取还款计划的id
        Long lendReturnId = lendReturnMap.get(currentPeriod);

        LendItemReturn lendItemReturn = new LendItemReturn();
        lendItemReturn.setLendReturnId(lendReturnId);
        lendItemReturn.setLendItemId(lendItemId);
        lendItemReturn.setInvestUserId(lendItem.getInvestUserId());
        lendItemReturn.setLendId(lendItem.getLendId());
        lendItemReturn.setInvestAmount(lendItem.getInvestAmount());
        lendItemReturn.setLendYearRate(lend.getLendYearRate());
        lendItemReturn.setCurrentPeriod(currentPeriod);
        lendItemReturn.setReturnMethod(lend.getReturnMethod());
        //最后一次本金计算
        if (lendItemReturnList.size() > 0 && currentPeriod.intValue() == lend.getPeriod().intValue()) {
            //最后一期本金 = 本金 - 前几次之和
            BigDecimal sumPrincipal = lendItemReturnList.stream()
                .map(LendItemReturn::getPrincipal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            //最后一期应还本金 = 用当前投资人的总投资金额 - 除了最后一期前面期数计算出来的所有的应还本金
            BigDecimal lastPrincipal = lendItem.getInvestAmount().subtract(sumPrincipal);
            lendItemReturn.setPrincipal(lastPrincipal);
        } else {
            lendItemReturn.setPrincipal(mapPrincipal.get(currentPeriod));
            lendItemReturn.setInterest(mapInterest.get(currentPeriod));
        }

        lendItemReturn.setTotal(lendItemReturn.getPrincipal().add(lendItemReturn.getInterest()));
        lendItemReturn.setFee(new BigDecimal("0"));
        lendItemReturn.setReturnDate(lend.getLendStartDate().plusMonths(currentPeriod));
        //是否逾期，默认未逾期
        lendItemReturn.setOverdue(false);
        lendItemReturn.setStatus(0);

        lendItemReturnList.add(lendItemReturn);
    }
    lendItemReturnService.saveBatch(lendItemReturnList);

    return lendItemReturnList;

}

3、在 makeLoan 中调用

LendServiceImpl

//放款成功生成借款人还款计划和投资人回款计划
this.repaymentPlan(lend);
```
