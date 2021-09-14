

# 第二节 实现 Runnable 接口



```java
// Lambda表达式口诀：
// 1.复制小括号
// 2.写死右箭头
// 3.落地大括号
new Thread(() -> {

    for (int i = 0; i < 10; i++) {
        System.out.println("i = " + i + " " + Thread.currentThread().getName());
    }

}, "thread01").start();
```

- Java 可以实现多个不同接口，不影响这个类对其它类的继承
- 配合 Lambda 表达式，可以非常简洁的实现线程内部逻辑，不必真的声明一个类去实现 Runnable 接口，让代码更简洁





[上一节](verse01.html) [回目录](index.html) [下一节](verse03.html)

