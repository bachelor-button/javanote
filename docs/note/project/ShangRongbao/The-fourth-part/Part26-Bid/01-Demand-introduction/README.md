# 01-需求介绍

## 一、投资人投标

1、需求描述

平台发布标的，出借人充值就可以投资标的

![images](./images/081a59d48a029e421600fe35c9c43c15.png)

2、相关数据库表

![images](./images/74dd9e4c-890f-4a80-ba6c-9b9f12a4cf0b.jpg)

3、参考文档

参考《汇付宝商户账户技术文档》3.10 满标投资，投资过程与账户绑定、用户充值过程一致

![images](./images/d8cfcd06-f7b7-4e2f-9c81-ca64ba2311cc.png)

## 二、具体步骤

step1：点击标的，进入标的详情页面

![images](./images/8f8171a1-3638-4e71-9069-3ecc8cdbc69f.png)

step2：输入投资金额，计算获得收益

step3：同意协议，点击立即投资

![images](./images/a95e0705-8c3b-4b8e-8815-7e4cb69710bf.png)

step4：跳转到汇付宝页面（资金托管接口调用）

step5：汇付宝验证用户交易密码

step6：汇付宝修改账号资金余额（更新 user*account 记录中的 amount 的值和 freeze*amount 的值）

汇付宝新增投资记录（新增 user_invest 记录）

step7：异步回调

（1）账户金额更改（剩余金额和冻结金额）

（2）修改投资状态（lend_item 表中的 status）

（3）更新标的信息（lend 表中的投资人数和已投金额）

（4）添加交易流水

step8：用户点击“返回平台”，返回尚融宝
