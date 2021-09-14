

# 第三节 验证双亲委派机制

## 1、实验1

- 第一步：在与JDK无关的目录下创建Hello.java

```java
public class Hello {

	public static void main(String[] args){
		System.out.println("AAA");
	}

}
```

- 第二步：编译Hello.java
- 第三步：将Hello.class文件移动到$JAVA_HOME/jre/classes目录下
- 第四步：修改Hello.java

```java
public class Hello {

	public static void main(String[] args){
		System.out.println("BBB");
	}

}
```

- 第五步：编译Hello.java
- 第六步：将Hello.class文件移动到$JAVA_HOME/jre/lib/ext/classes目录下
- 第七步：修改Hello.java

```java
public class Hello {

	public static void main(String[] args){
		System.out.println("CCC");
	}

}
```

- 第八步：编译Hello.java
- 第九步：使用java命令运行Hello类，发现打印结果是：AAA
  - 说明Hello这个类是被启动类加载器找到的，找到以后就不查找其他位置了
- 第十步：删除$JAVA_HOME/jre/classes目录
- 第十一步：使用java命令运行Hello类，发现打印结果是：BBB
  - 说明Hello这个类是被扩展类加载器找到的，找到以后就不查找其他位置了
- 第十二步：删除$JAVA_HOME/jre/lib/ext/classes目录
- 第十三步：使用java命令运行Hello类，发现打印结果是：CCC
  - 说明Hello这个类是被应用程序类加载器找到的



## 2、实验2

- 第一步：创建假的String类

```java
package java.lang;

public class String {

    public String() {
        System.out.println("嘿嘿，其实我是假的！");
    }

}
```

- 第二步：编写测试程序类

```java
    @Test
    public void testLoadString() {

        // 目标：测试不同范围内全类名相同的两个类JVM如何加装
        // 1.创建String对象
        java.lang.String testInstance = new java.lang.String();

        // 2.获取String对象的类加载器
        ClassLoader classLoader = testInstance.getClass().getClassLoader();
        System.out.println(classLoader);
    }
```

- 第三步：查看运行结果是null
  - 假的String类并没有被创建对象，由于双亲委派机制，启动类加载器加载了真正的String类





[上一节](verse02.html) [回目录](index.html) [下一节](verse04.html)