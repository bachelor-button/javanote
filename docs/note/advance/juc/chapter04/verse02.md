

# 第二节 Set集合



采用了写时复制技术的Set集合：java.util.concurrent.CopyOnWriteArraySet



测试代码：

```java
// 1、创建集合对象
Set<String> set = new CopyOnWriteArraySet<>();

// 2、创建多个线程，每个线程中读写 List 集合
for (int i = 0; i < 5; i++) {

    new Thread(()->{

        for (int j = 0; j < 5; j++) {

            // 写操作：随机生成字符串存入集合
            set.add(UUID.randomUUID().toString().replace("-","").substring(0, 5));

            // 读操作：打印集合整体
            System.out.println("set = " + set);
        }

    }, "thread-"+i).start();

}
```



对应类中的源码：

- 所在类：java.util.concurrent.CopyOnWriteArraySet

```java
    public boolean add(E e) {
        return al.addIfAbsent(e);
    }
```



- 所在类：java.util.concurrent.CopyOnWriteArrayList

```java
    private boolean addIfAbsent(E e, Object[] snapshot) {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            Object[] current = getArray();
            int len = current.length;
            if (snapshot != current) {
                // Optimize for lost race to another addXXX operation
                int common = Math.min(snapshot.length, len);
                for (int i = 0; i < common; i++)
                    if (current[i] != snapshot[i] && eq(e, current[i]))
                        return false;
                if (indexOf(e, current, common, len) >= 0)
                        return false;
            }
            Object[] newElements = Arrays.copyOf(current, len + 1);
            newElements[len] = e;
            setArray(newElements);
            return true;
        } finally {
            lock.unlock();
        }
    }
```





[上一节](verse01.html) [回目录](index.html) [下一节](verse03.html)