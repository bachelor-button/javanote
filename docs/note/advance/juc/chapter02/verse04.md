

# 第四节 公平锁



ReentrantLock 还可以实现公平锁。所谓公平锁，也就是在锁上等待时间最长的线程将获得锁的使用权。

```java
public class SaleTicketDemo04FairLock {

    public static void main(String[] args) {

        // 1.创建Ticket对象，作为各个线程争抢的资源
        TicketWithFairLock ticket = new TicketWithFairLock();

        // 2.开启5个线程，在5个线程中分别执行卖票操作
        for (int i = 0; i < 5; i++) {

            new Thread(() -> {

                for (int j = 0; j < 22; j++) {
                    ticket.saleTicket();
                }

            }, "thread" + i).start();

        }

    }

}

class TicketWithFairLock {

    private int ticketStock = 100;

    // 锁对象一定要声明为成员变量
    // 锁对象如果声明为局部变量就会导致每个线程调用方法时都有自己的钥匙可以开锁
    // new ReentrantLock(true)创建公平锁
    private Lock lock = new ReentrantLock(true);

    public void saleTicket() {

        // 加锁：锁定资源
        lock.lock();

        // 调用另一个同步方法测试可重入性
        check();

        if (ticketStock > 0) {

            try {
                TimeUnit.MILLISECONDS.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println(Thread.currentThread().getName() + " 已售出" + ticketStock + "号票" + " 现在还有" + (--ticketStock) + "张票");

        } else {
            System.out.println(Thread.currentThread().getName() + " 卖完了，不卖了");
        }

        // 开锁：释放资源
        lock.unlock();

    }

    public void check() {

        // 加锁：锁定资源
        lock.lock();

        System.out.println("目前还剩车票：" + ticketStock + "张");

        // 开锁：释放资源
        lock.unlock();
    }

}
```



执行结果：

> 目前还剩车票：100张
> thread1 已售出100号票 现在还有99张票
> 目前还剩车票：99张
> thread0 已售出99号票 现在还有98张票
> 目前还剩车票：98张
> thread2 已售出98号票 现在还有97张票
> 目前还剩车票：97张
> thread3 已售出97号票 现在还有96张票
> 目前还剩车票：96张
> thread4 已售出96号票 现在还有95张票
> 目前还剩车票：95张
> thread1 已售出95号票 现在还有94张票
> 目前还剩车票：94张
> thread0 已售出94号票 现在还有93张票
> 目前还剩车票：93张
> thread2 已售出93号票 现在还有92张票
> 目前还剩车票：92张
> thread3 已售出92号票 现在还有91张票
> 目前还剩车票：91张
> thread4 已售出91号票 现在还有90张票
>
> ……



每一轮循环中，各个线程执行的顺序是一样的。









[上一节](verse03.html) [回目录](index.html) [下一节](verse05.html)