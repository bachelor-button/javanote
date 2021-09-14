

# 第三节 可重入锁

## 1、可重入

可重入锁又名递归锁，是指在同一个线程在外层方法拿到的钥匙，在调用内层方法时同样有效。Java 中 ReentrantLock 和 synchronized 都是可重入锁，可重入锁的一个优点是可一定程度避免死锁。



例如下列伪代码：

```java
class A{
	public synchronized void aa{
		......
        bb();
        ......
	}
	public synchronized void bb{
		......
	}
}
A a = new A();
a.aa();
```



a 对象调用 aa() 方法时，持有钥匙：this。在 aa() 方法中再进一步调用 bb() 方法时仍然需要钥匙：this。此时如果不支持『可重入』，this在调用 aa() 方法时被持有，不能用于 bb() 方法开锁，必须等 aa() 方法执行完成，释放 this，才能用于调用 bb() 方法；但是不调用 bb() 方法 aa() 就没法执行完成，于是陷入死锁状态。



## 2、改进卖票案例

### ①改用可重入锁

```java
public class SaleTicketDemo03ReentrantLock {

    public static void main(String[] args) {

        // 1.创建资源对象：TicketSynch（被各个线程锁争抢的资源对象）
        TicketReentrantLock ticket = new TicketReentrantLock();

        // 2.创建5个线程
        for (int i = 0; i < 5; i++) {

            new Thread(() -> {

                // 3.在线程内部循环卖票
                for (int j = 0; j < 22; j++) {

                    // 4.调用卖票方法
                    ticket.saleTicket();
                }

            }, "thread" + i).start();

        }

    }

}

class TicketReentrantLock {

    // 车票的库存数量
    private int tickectStock = 100;

    // Lock对象声明为成员变量，就可以被多个线程所共享。
    // 只要TicketReentrantLock类的对象是单例的，Lock对象就是单例的。
    // 各个线程必须拿到唯一的Lock对象作为钥匙才能开锁
    private Lock lock = new ReentrantLock();

    // 声明一个卖票的方法
    public void saleTicket() {

        // lock对象不能以局部变量形式来声明，因为这样会导致每个线程进入方法后都拿到一个开锁的钥匙
        // Lock lock = new ReentrantLock();

        // 调用Lock对象的lock()方法加锁
        lock.lock();

        if (tickectStock > 0) {

            try {
                TimeUnit.MILLISECONDS.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println(Thread.currentThread().getName() + " 现在正在出售" + tickectStock + "号的车票，还剩" + (--tickectStock) + "张");
        } else {
            System.out.println(Thread.currentThread().getName() + " 卖完啦！！！");
        }

        // 调用lock对象的unlock()方法来解锁
        lock.unlock();

    }

}
```



### ②测试可重入性

为了测试可重入性，在案例中增加一个检查余票的方法。只要代码能够正常执行，没有陷入死锁，就说明可重入性生效。

```java
class TicketReentrantLock {

    // 车票的库存数量
    private int tickectStock = 100;

    // Lock对象声明为成员变量，就可以被多个线程所共享。
    // 只要TicketReentrantLock类的对象是单例的，Lock对象就是单例的。
    // 各个线程必须拿到唯一的Lock对象作为钥匙才能开锁
    private Lock lock = new ReentrantLock();

    // 声明一个卖票的方法
    public void saleTicket() {

        // lock对象不能以局部变量形式来声明，因为这样会导致每个线程进入方法后都拿到一个开锁的钥匙
        // Lock lock = new ReentrantLock();

        // 调用Lock对象的lock()方法加锁
        lock.lock();

        // 为了测试可重入性，在当前同步方法中再调用另一个同步方法
        check();

        if (tickectStock > 0) {

            try {
                TimeUnit.MILLISECONDS.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println(Thread.currentThread().getName() + " 现在正在出售" + tickectStock + "号的车票，还剩" + (--tickectStock) + "张");
        } else {
            System.out.println(Thread.currentThread().getName() + " 卖完啦！！！");
        }

        // 调用lock对象的unlock()方法来解锁
        lock.unlock();

    }

    public void check() {

        // 为了测试可重入性在当前方法再次锁定
        lock.lock();

        // 打印
        System.out.println("检查余票：\t" + ticketStock);

        // 解锁：如果这里忘记解锁，就会导致其他进程陷入无限等待
        lock.unlock();
    }

}
```



::: warning

<span style="color:blue;font-weight:bold;">注意</span>：lock.lock()和lock.unlock()必须成对出现，否则将导致需要锁的线程无法执行。

:::







[上一节](verse02.html) [回目录](index.html) [下一节](verse04.html)