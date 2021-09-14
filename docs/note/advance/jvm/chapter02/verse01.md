

# 第一节 类加载器分类

## 1、说明

- 启动类加载器：使用C++语言编写的类加载器，在Java环境下看不到
- 扩展类加载器：sun.misc.Launcher.ExtClassLoader
- 应用类加载器：sun.misc.Launcher.AppClassLoader
- 自定义类加载器：程序员自己开发一个类继承java.lang.ClassLoader，定制类加载方式

父子关系1：启动类加载器是扩展类加载器的父加载器

父子关系2：扩展类加载器是应用类加载器的父加载器



## 2、代码测试

```java
// 1.获取Person类的Class对象
// 2.通过Class对象进一步获取它的类加载器对象
ClassLoader appClassLoader = Person.class.getClassLoader();

// 3.获取appClassLoader的全类名
String appClassLoaderName = appClassLoader.getClass().getName();

// 4.打印appClassLoader的全类名
// sun.misc.Launcher$AppClassLoader
System.out.println("appClassLoaderName = " + appClassLoaderName);

// 5.通过appClassLoader获取扩展类加载器（父加载器）
ClassLoader extClassLoader = appClassLoader.getParent();

// 6.获取extClassLoader的全类名
String extClassLoaderName = extClassLoader.getClass().getName();

// 7.打印extClassLoader的全类名
// sun.misc.Launcher$ExtClassLoader
System.out.println("extClassLoaderName = " + extClassLoaderName);

// 8.通过extClassLoader获取启动类加载器（父加载器）
ClassLoader bootClassLoader = extClassLoader.getParent();

// 9.由于启动类加载器是C语言开发的，在Java代码中无法实例化对象，所以只能返回null值
System.out.println("bootClassLoader = " + bootClassLoader);
```



[回目录](index.html) [下一节](verse02.html)