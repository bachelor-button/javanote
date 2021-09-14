

# 第三节 FutureTask配合Callable接口

## 1、FutureTask类和Runnable接口的关系

![images](D:\价值工坊\课程研发\JVM+JUC2021年4月5日新\2021年4月7日\note\images\img038.png)

从继承关系能够看到，FutureTask本身也间接实现了Runnable接口。FutureTask类的对象也是Runnable接口的实例，可以用于在创建Thread对象时，传入Thread构造器。



## 2、FutureTask 类的构造器

```java
    public FutureTask(Callable<V> callable) {
        if (callable == null)
            throw new NullPointerException();
        this.callable = callable;
        this.state = NEW;       // ensure visibility of callable
    }
```

根据这个构造器，我们知道，创建FutureTask对象时，传入一个Callable类型的对象即可。



## 3、Callable 接口

```java
@FunctionalInterface
public interface Callable<V> {
    /**
     * Computes a result, or throws an exception if unable to do so.
     *
     * @return computed result
     * @throws Exception if unable to compute a result
     */
    V call() throws Exception;
}
```

从 call() 方法的声明我们可以看出，它有一个返回值。这个返回值可以将当前线程内计算结果返回。



## 4、测试代码

```java
// 1.创建三个FutureTask对象，封装三个线程的执行逻辑
FutureTask<Integer> task01 = new FutureTask<>(() -> {

    int result = (int) (Math.random() * Math.random() * 100);

    System.out.println(Thread.currentThread().getName());

    return result;
});
FutureTask<Integer> task02 = new FutureTask<>(() -> {

    int result = (int) (Math.random() * Math.random() * 1000);

    System.out.println(Thread.currentThread().getName());

    return result;
});
FutureTask<Integer> task03 = new FutureTask<>(() -> {

    int result = (int) (Math.random() * Math.random() * 10000);

    System.out.println(Thread.currentThread().getName());

    return result;
});

// 2.创建三个线程对象，然后启动线程
new Thread(task01, "thread01").start();
new Thread(task02, "thread02").start();
new Thread(task03, "thread03").start();

// 3.上面三个线程执行完成后，可以收集它们各自运算的结果
Integer task01Result = task01.get();
Integer task02Result = task02.get();
Integer task03Result = task03.get();

System.out.println("task01Result = " + task01Result);
System.out.println("task02Result = " + task02Result);
System.out.println("task03Result = " + task03Result);
```



## 5、Callable和Runnable对比

| Runnable接口               | Callable接口             |
| -------------------------- | ------------------------ |
| 重写run()方法              | 重写call()方法           |
| run()没有返回值            | call()有返回值           |
| run()没有声明抛出异常      | call()声明抛出Exception  |
| 没有汇总各个线程结果的机制 | 有汇总各个线程结果的机制 |



## 6、Callable接口方案的特点

![images](D:\价值工坊\课程研发\JVM+JUC2021年4月5日新\2021年4月7日\note\images\img039.png)







[上一节](verse02.html) [回目录](index.html) [下一节](verse04.html)