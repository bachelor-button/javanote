

# 第一节 继承Thread类

## 1、创建一个类继承Thread

```java
class PrintNumber extends Thread {

    public PrintNumber(String name) {
        super(name);
    }

    @Override
    public void run() {

        for (int i = 0; i < 10; i++) {
            System.out.println("i = " + i + " " + Thread.currentThread().getName());
        }

    }
}
```



## 2、创建线程对象启动线程

```java
public static void main(String[] args) {

    new PrintNumber("thread01").start();
    new PrintNumber("thread02").start();
    new PrintNumber("thread03").start();

}
```



## 3、小结

继承Thread类实现多线程方式的问题：

- 一个类继承了 Thread 就不能再继承其它类。



启动线程时调用方法的细节：

- 调用run()方法：就是普通的操作，子类继承父类后，重写父类方法。创建子类对象，调用这个重写的方法。所有操作都还是在当前线程，并没有开启一个新的线程。
- 调用start()方法：本质上是调用Thread类中的start0()，这个方法是一个native方法。我们创建多线程，必须由操作系统来进行调度，决定各个线程如何分配CPU时间片。





[回目录](index.html) [下一节](verse02.html)