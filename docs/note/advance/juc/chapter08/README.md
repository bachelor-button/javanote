

## 第八章 volatile关键字

## 1、案例代码

测试可见性的代码：

```java
public class VolatileTest {

    private static Integer number = 10;

    public static void main(String[] args) throws InterruptedException {

        new Thread(()->{

            // 打印当前线程看到的number的值
            System.out.println("子线程：number = " + number);

            // 通过死循环的方式，检验当前子线程什么时候能够看到其他线程对number的修改
            while(number == 10) {}

            // 当前线程看到其他线程修改的新值才能进行到这一步
            System.out.println("子线程看到了新值：number = " + number);

        }).start();

        // 主线程睡眠5秒
        TimeUnit.SECONDS.sleep(5);

        // 在主线程修改number的值
        number = 500;

        // 打印主线程看到的变量值
        System.out.println("主线程：number = " + number);

    }

}
```

打印效果：

> 子线程：number = 10
> 主线程：number = 500

说明在子线程中看不到主线程对number变量的修改。



## 2、使用volatile关键字

修改成员变量，使用volatile关键字来修饰：

```java
private static volatile Integer number = 10;
```

重新运行程序看到打印结果是：

> 子线程：number = 10
> 主线程：number = 500
> 子线程看到了新值：number = 500

![images](./images/img023.png)



## 3、volatile不能提供有序性、原子性保证

案例代码：

```java
public class VolatileOrderTest {

    private volatile int number = 0;

    public synchronized int incr() {

        return ++number;

    }

    public static void main(String[] args) {

        VolatileOrderTest volatileOrderTest = new VolatileOrderTest();

        for (int i = 0; i < 1000; i++) {

            new Thread(()->{
                System.out.println(volatileOrderTest.incr());
            }).start();

        }

    }

}
```

打印结果：

- 不一定能加到1000
- 不一定是自然数的顺序

修改代码：

```java
private volatile int number = 0;
```

打印结果：没有变化

再使用同步锁：

```java
    public synchronized int incr() {

        return ++number;

    }
```

打印结果：

- 能保证加到1000：说明synchronized将方法变成了一个原子性操作的方法
- 不能保证按顺序执行：说明synchronized和volatile都不能提供有序性





[上一章](../chapter07/index.html) [回目录](../index.html) [下一章](../chapter09/index.html)