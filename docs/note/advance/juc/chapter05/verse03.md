

# 第三节 Semaphore

使用Semaphore可以帮助我们管理资源位；当某个线程申请资源时，由Semaphore检查这个资源是否可用；如果其他线程释放了这个资源，那么申请资源的线程就可以使用。

```java
// 创建Semaphore对象，管理3个车位
Semaphore semaphore = new Semaphore(3);

// 创建10个线程抢车位
for (int i = 0; i < 10; i++) {

    String carNum = String.valueOf(i);

    new Thread(()->{

        try {

            // 线程开始时申请资源
            semaphore.acquire();

            // 当线程申请到资源就自然执行到了这一步
            System.out.println(carNum + "号车辆驶入车位");

            TimeUnit.SECONDS.sleep(2);

            System.out.println(carNum + "号车辆驶出车位");

        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {

            // 完成操作后释放资源
            semaphore.release();

        }

    }).start();

}
```



[上一节](verse02.html) [回目录](index.html)