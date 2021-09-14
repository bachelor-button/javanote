

# 第三节 堆溢出异常

## 1、异常名称

java.lang.OutOfMemoryError，也往往简称为 OOM。



## 2、异常信息

- Java heap space：针对新生代、老年代整体进行Full GC后，内存空间还是放不下新产生的对象
- PermGen space：方法区中加载的类太多了（典型情况是框架创建的动态类太多，导致方法区溢出）



我们可以参考下面的控制台日志打印：

> [GC (Allocation Failure)  4478364K->4479044K(5161984K), 4.3454766 secs]
> [Full GC (Ergonomics)  4479044K->3862071K(5416448K), 39.3706285 secs]
> [Full GC (Ergonomics)  4410423K->4410422K(5416448K), 27.7039534 secs]
> [Full GC (Ergonomics)  4629575K->4621239K(5416448K), 24.9298221 secs]
> [Full GC (Allocation Failure)  4621239K->4621186K(5416448K), 29.0616791 secs]
> Exception in thread "main" java.lang.OutOfMemoryError: <span style="color:blue;font-weight:bold;">Java heap space</span>
> 	at java.util.Arrays.copyOf(Arrays.java:3210)
> 	at java.util.Arrays.copyOf(Arrays.java:3181)
> 	at java.util.ArrayList.grow(ArrayList.java:261)
> 	at java.util.ArrayList.ensureExplicitCapacity(ArrayList.java:235)
> 	at java.util.ArrayList.ensureCapacityInternal(ArrayList.java:227)
> 	at java.util.ArrayList.add(ArrayList.java:458)
> 	at com.atguigu.jvm.test.JavaHeapTest.main(JavaHeapTest.java:16)



[上一节](verse02.html) [回目录](index.html)