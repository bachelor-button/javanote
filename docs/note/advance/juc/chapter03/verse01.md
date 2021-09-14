

# 第一节 场景



- 公共资源：num=0
- 线程A：将num从0加到1
- 线程B：将num从1减到0



代码如下：

```java
public class O12NotifyAndWaitDemo {

    // 声明成员变量作为公共资源
    private int num = 0;

    // main()方法测试
    public static void main(String[] args) {

        // 创建共享的资源对象
        O12NotifyAndWaitDemo demo = new O12NotifyAndWaitDemo();

        // 创建两个线程
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
    }

    // 声明一个方法执行num+1
    public synchronized void incr() {

        try {
            // 线程间通信代码编写套路第一步：判断。当num的值为1的时候，让当前线程等一会儿
            if (num == 1) {

                // 线程间通信代码编写套路第二步：等待。
                this.wait();
            }

            // 线程间通信代码编写套路第三步：干活。
            System.out.println(Thread.currentThread().getName() + "num=" + ++num);

            // 线程间通信代码编写套路第四步：唤醒。
            this.notifyAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    // 声明一个方法执行num-1
    public synchronized void decr() {

        try {
            // 线程间通信代码编写套路第一步：判断。当num的值为0的时候，让当前线程等一会儿
            if (num == 0) {

                // 线程间通信代码编写套路第二步：等待。
                this.wait();
            }

            // 线程间通信代码编写套路第三步：干活。
            System.out.println(Thread.currentThread().getName() + "num=" + --num);

            // 线程间通信代码编写套路第四步：唤醒。
            this.notifyAll();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

}
```













[回目录](index.html) [下一节](verse02.html)