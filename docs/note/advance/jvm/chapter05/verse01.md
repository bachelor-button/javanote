# 第一节 方法栈

方法栈并不是某一个 JVM 的内存空间，而是我们描述方法被调用过程的一个逻辑概念。

在同一个线程内，method01()调用method02()：

- method01()先开始，method02()后开始；
- method02()先结束，method01()后结束。

![images](./images/img004.png)





[回目录](index.html) [下一节](verse02.html)