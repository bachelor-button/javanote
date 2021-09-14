

# 第三节 栈溢出异常



## 1、异常名称

java.lang.StackOverflowError



## 2、异常产生的原因

下面的例子是一个没有退出机制的递归：

```java
public class StackOverFlowTest {

    public static void main(String[] args) {
        methodInvokeToDie();
    }

    public static void methodInvokeToDie() {
        methodInvokeToDie();
    }

}
```



抛出的异常信息：

> Exception in thread "main" java.lang.StackOverflowError
> 	at com.atguigu.jvm.test.StackOverFlowTest.methodInvokeToDie(StackOverFlowTest.java:10)
> 	at com.atguigu.jvm.test.StackOverFlowTest.methodInvokeToDie(StackOverFlowTest.java:10)
> 	at com.atguigu.jvm.test.StackOverFlowTest.methodInvokeToDie(StackOverFlowTest.java:10)
> 	at com.atguigu.jvm.test.StackOverFlowTest.methodInvokeToDie(StackOverFlowTest.java:10)
> 	at com.atguigu.jvm.test.StackOverFlowTest.methodInvokeToDie(StackOverFlowTest.java:10)



原因总结：方法每一次调用都会在栈空间中申请一个栈帧，来保存本次方法执行时所需要用到的数据。但是一个没有退出机制的递归调用，会不断申请新的空间，而又不释放空间，这样迟早会把当前线程在栈内存中自己的空间耗尽。





[上一节](verse02.html) [回目录](index.html) [下一节](verse04.html)