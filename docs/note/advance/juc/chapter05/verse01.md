

# 第一节 CountDownLatch



效果：指定一个操作步骤数量，在各个子线程中，每完成一个任务就给步骤数量-1；在步骤数量减到0之前，CountDownLatch可以帮我们把最后一步操作抑制住，让最后一步操作一直等到步骤被减到0的时候执行。



## 1、班长锁门

有六名同学在值日，班长负责锁门。班长必须确保所有同学都离开教室再锁门。

```java
// 声明一个变量，用来保存同学的数量
int stuNum = 6;

// 创建CountDownLatch对象
CountDownLatch countDownLatch = new CountDownLatch(stuNum);

// 创建和同学数量相等的线程
for (int i = 0; i < stuNum; i++) {

    String num = String.valueOf(i + 1);

    new Thread(()->{

        // 完成一次操作
        System.out.println(Thread.currentThread().getName() + " " + num + "号同学离开教室");

        // 让countDownLatch管理的数量-1
        countDownLatch.countDown();

    }).start();

}

// 让countDownLatch负责将最后一步操作抑制住
countDownLatch.await();

System.out.println("班长锁门");
```



## 2、集齐七颗龙珠召唤神龙

```java
// 声明龙珠数量
int dragonBall = 7;

// 创建CountdownLatch对象
CountDownLatch countDownLatch = new CountDownLatch(dragonBall);

// 创建七个线程收集龙珠
for (int i = 0; i < 7; i++) {

    String num = String.valueOf(i);

    new Thread(()->{

        System.out.println("现在拿到了" + num + "号龙珠");

        countDownLatch.countDown();

    }).start();

}

// 让countDownLatch对象抑制最后一步
countDownLatch.await();

System.out.println("龙珠集齐，召唤神龙");
```



[回目录](index.html) [下一节](verse02.html)