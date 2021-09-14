

# 第三节 使用 Lock 和 Condition 进行通信



<span style="color:blue;font-weight:bold;">注意</span>：使用 Lock 和 Condition 来控制线程间通信并不能解决虚假唤醒问题，线程中的判断仍然要使用while。

```java
public class O13JUCNotifyAndWaitDemo {

    // 声明一个成员变量作为公共资源
    private int num = 0;

    // 声明一个Lock锁
    private Lock lock = new ReentrantLock();

    // 使用Lock锁创建两个条件对象
    // 一个条件对象用来控制加法操作
    private Condition conditionIncr = lock.newCondition();

    // 一个条件对象用来控制减法操作
    private Condition conditionDecr = lock.newCondition();

    public static void main(String[] args) {

        // 创建公共资源对象
        O13JUCNotifyAndWaitDemo demo = new O13JUCNotifyAndWaitDemo();

        // 创建四个线程分别执行加法和减法
        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                demo.incr();
            }
        }, "[线程A]").start();

        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                demo.decr();
            }
        }, "[线程B]").start();

        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                demo.incr();
            }
        }, "[线程C]").start();

        new Thread(()->{
            for (int i = 0; i < 10; i++) {
                demo.decr();
            }
        }, "[线程D]").start();

    }

    // 声明执行加法操作的方法
    public void incr() {

        try {

            // 执行锁定操作
            lock.lock();

            // 执行判断
            while (num == 1) {

                // 调用conditionIncr对象的方法让当前线程等一会儿
                conditionIncr.await();

            }

            // 干活
            System.out.println(Thread.currentThread().getName() + " num=" + ++num);

            // 唤醒减法线程
            conditionDecr.signal();

        }catch (InterruptedException e) {
            e.printStackTrace();
        }finally {

            // 执行解锁
            lock.unlock();

        }

    }

    // 声明执行减法操作的方法
    public void decr() {

        try {

            // 执行锁定操作
            lock.lock();

            // 执行判断
            while (num == 0) {

                // 调用conditionIncr对象的方法让当前线程等一会儿
                conditionDecr.await();

            }

            // 干活
            System.out.println(Thread.currentThread().getName() + " num=" + --num);

            // 唤醒减法线程
            conditionIncr.signal();

        }catch (InterruptedException e) {
            e.printStackTrace();
        }finally {

            // 执行解锁
            lock.unlock();

        }

    }

}
```

















[上一节](verse02.html) [回目录](index.html) [下一节](verse04.html)