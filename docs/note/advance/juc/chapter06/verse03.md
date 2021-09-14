

# 第三节 创建线程池

## 1、创建线程池

在JDK原生API中使用Executors工具类创建线程池对象

![images](./images/img006.png)



### ①newCachedThreadPool()

执行很多短期异步任务，线程池根据需要创建多线程。并在先前创建的线程可用时将重用它们。可扩容，遇强则强。



### ②newFixedThreadPool(int nThreads)

执行长期任务性能好，创建一个线程池，一池有N个固定的线程。



### ③newSingleThreadExecutor()

一个任务一个任务的执行，一池一线程。



## 2、代码演示

```java
// 创建可扩容线程池
// ExecutorService threadPool = Executors.newCachedThreadPool();
// ExecutorService threadPool = Executors.newFixedThreadPool(5);
ExecutorService threadPool = Executors.newSingleThreadExecutor();

System.out.println();

// 给线程池分配任务
while (true) {
    TimeUnit.SECONDS.sleep(1);

    threadPool.execute(()->{
        while (true) {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("任务进行中：" + Thread.currentThread().getName());
        }
    });
}
```



## 3、底层原理

上述案例中的三个方法的本质都是ThreadPoolExecutor的实例化对象，只是具体参数值不同。

```java
    public static ExecutorService newCachedThreadPool() {
        return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                      60L, TimeUnit.SECONDS,
                                      new SynchronousQueue<Runnable>());
    }
    public static ExecutorService newFixedThreadPool(int nThreads) {
        return new ThreadPoolExecutor(nThreads, nThreads,
                                      0L, TimeUnit.MILLISECONDS,
                                      new LinkedBlockingQueue<Runnable>());
    }
    public static ExecutorService newSingleThreadExecutor() {
        return new FinalizableDelegatedExecutorService
            (new ThreadPoolExecutor(1, 1,
                                    0L, TimeUnit.MILLISECONDS,
                                    new LinkedBlockingQueue<Runnable>()));
    }
```





[上一节](verse02.html) [回目录](index.html) [下一节](verse04.html)