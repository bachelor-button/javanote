

# 第四节 使用线程池



```java
// 1.创建线程池对象
ExecutorService pool = Executors.newFixedThreadPool(5);

// 2.给线程池对象分配任务，每一个任务是一个线程
pool.execute(() -> {
    System.out.println(Thread.currentThread().getName() + " " + new Date());
});

pool.execute(() -> {
    System.out.println(Thread.currentThread().getName() + " " + new Date());
});

pool.execute(() -> {
    System.out.println(Thread.currentThread().getName() + " " + new Date());
});
```





[上一节](verse03.html) [回目录](index.html) [下一节](verse05.html)