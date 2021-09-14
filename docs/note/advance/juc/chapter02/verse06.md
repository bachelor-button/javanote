

# 第六节 可重入读写锁



前面例子中用到的都是独占锁。在实际场景中如果是写操作那确实需要独占资源，但是读操作如果也是独占方式操作那肯定效率很低。所以应该区分二者，用独占方式执行写操作；用共享方式执行读操作。



请看下面例子：

```java
public class ReadWriteLockDemo01NoLock {

    public static void main(String[] args) {

        MyCache cache = new MyCache();

        for (int i = 0; i < 5; i++) {
            String num = String.valueOf(i);

            // 开启5个线程写入数据
            new Thread(()->{
                cache.set(num, num);
            }).start();

        }

        for (int i = 0; i < 5; i++) {
            String num = String.valueOf(i);

            // 开启5个线程读取数据
            new Thread(()->{
                cache.get(num);
            }).start();

        }

    }

}

class MyCache {

    private Map<String, String> cache = new HashMap<>();

    public void set(String key, String value) {

        try {
            System.out.println("开始写入");
            TimeUnit.MILLISECONDS.sleep(100);
            cache.put(key, value);
            System.out.println("写入完成");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    public void get(String key) {
        try {
            System.out.println("开始读取");
            TimeUnit.MILLISECONDS.sleep(100);
            String value = cache.get(key);
            System.out.println("读取完成：" + value);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
```



打印结果是：

> 开始写入
> 开始写入
> 开始写入
> 开始写入
> 开始写入
> 开始读取
> 开始读取
> 开始读取
> 开始读取
> 开始读取
> 读取完成：null
> 读取完成：null
> 读取完成：null
> 写入完成
> 写入完成
> 写入完成
> 写入完成
> 读取完成：0
> 写入完成
> 读取完成：1



结果中有null是因为没有加锁，读取操作先于写入操作执行。下面我们加入读写锁：

```java
public class ReadWriteLockDemo02WithLock {

    public static void main(String[] args) {

        MyCacheWithLock cache = new MyCacheWithLock();

        for (int i = 0; i < 5; i++) {
            String num = String.valueOf(i);

            // 开启5个线程写入数据
            new Thread(()->{
                cache.set(num, num);
            }).start();

        }

        for (int i = 0; i < 5; i++) {
            String num = String.valueOf(i);

            // 开启5个线程读取数据
            new Thread(()->{
                cache.get(num);
            }).start();

        }

    }
}

class MyCacheWithLock {

    private Map<String, String> cache = new HashMap<>();

    private ReadWriteLock lock = new ReentrantReadWriteLock();

    public void set(String key, String value) {

        try {
            // 加写锁：独占资源，执行写操作时其他线程不能执行被锁代码
            this.lock.writeLock().lock();

            System.out.println("开始写入");
            TimeUnit.MILLISECONDS.sleep(100);
            cache.put(key, value);
            System.out.println("写入完成");

        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {

            // 开锁：写操作完成，释放资源
            this.lock.writeLock().unlock();

        }

    }

    public void get(String key) {
        try {
            // 加读锁：共享资源，其他线程可以来读取数据，但是不能执行写操作
            this.lock.readLock().lock();

            System.out.println("开始读取");
            TimeUnit.MILLISECONDS.sleep(100);
            String value = cache.get(key);
            System.out.println("读取完成：" + value);

        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {

            // 开锁：释放资源
            this.lock.readLock().unlock();

        }
    }

}
```



打印效果：

- 写操作：一个写完，另一个才能写
- 读操作：各个线程并发执行

```java
开始写入
写入完成
开始写入
写入完成
开始写入
写入完成
开始写入
写入完成
开始写入
写入完成
开始读取
开始读取
开始读取
开始读取
开始读取
读取完成：0
读取完成：1
读取完成：4
读取完成：3
读取完成：2
```









[上一节](verse05.html) [回目录](index.html) [下一节](verse07.html)