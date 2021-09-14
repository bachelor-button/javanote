

# 第三节 Map集合



java.util.concurrent.ConcurrentHashMap



测试代码：

```java
// 1、创建集合对象
Map<String, String> map = new ConcurrentHashMap<>();

// 2、创建多个线程执行读写操作
for (int i = 0; i < 5; i++) {
    new Thread(()->{

        for (int j = 0; j < 5; j++) {

            String key = UUID.randomUUID().toString().replace("-","").substring(0, 5);
            String value = UUID.randomUUID().toString().replace("-","").substring(0, 5);

            map.put(key, value);

            System.out.println("map = " + map);
        }

    }, "thread" + i).start();
}
```





[上一节](verse02.html) [回目录](index.html)