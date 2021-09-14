# day01 Java基础语法

# 第一章 Java概述

## 1.0 从项目到代码

![images](./images/1.png)

总体技术体系：

![images](./images/2.png)

## 1.1 JavaSE课程体系介绍

JavaSE知识图解

![images](./images/3.png)

JavaSE知识模块介绍

* **第一部分：计算机编程语言核心结构：**`数据类型`、`运算符`、`流程控制`、`数组`、…
* **第二部分：Java面向对象核心逻辑：**`类和对象`、`封装`、`继承`、`多态`、`抽象`、`接口`、…
* **第三部分：JavaSE核心高级应用：**`集合`、`I/O`、`多线程`、`网络编程`、`反射机制`、…
* **第四部分：Java新特性：**`Lambda表达式`、`函数式编程`、`新Date/Time API`、`接口的默认、静态和私有方法`、…
* **第五部分：MySQL/JDBC核心技术：**`SQL语句`、`数据库连接池`、`DBUtils`、`事务管理`、`批处理`、…

## 1.2 计算机语言介绍（了解）

### 计算机语言是什么

所谓计算机编程语言，就是人们可以使用编程语言对计算机下达命令，让计算机完成人们需要的功能。

### 计算机语言发展

* 第一代：机器语言
* 第二代：汇编语言
* 第三代：高级语言

### 计算机语言排行榜

![images](./images/4.png)

### 计算机语言走势

![images](./images/5.png)

## 1.3 Java语言概述（了解）

### Java生态圈

**Java是目前应用最为广泛的软件开发平台之一。**随着Java以及Java社区的不断壮大，Java 也早已不再是简简单单的一门计算机语言了，它更是一个平台、一种文化、一个社区。

**作为一个平台，**Java虚拟机扮演着举足轻重的作用。除了 Java语言，任何一种能够被编译成字节码的计算机语言都属于Java这个平台。Groovy、Scala、 JRuby、Kotlin等都是Java平台的一部分，它们依赖于Java虚拟机，同时，Java平台也因为它们变得更加丰富多彩。

**作为一种文化，**Java几乎成为了 “开源”的代名词。在Java程序中，有着数不清的开源软件和框架。如Tomcat、Struts, Hibernate, Spring等。就连JDK和JVM自身也有不少开源的实现，如OpenJDK、Apache Harmony。可以说，“共享”的精神在Java世界里体现得淋漓尽致。

**作为一个社区，**Java拥有全世界最多的技术拥护者和开源社区支持，有数不清的论坛和资料。从桌面应用软件、嵌入式开发到企业级应用、后台服务器、中间件，都可以看到Java的身影。其应用形式之复杂、参与人数之众多也令人咋舌。可以说，Java社区已经俨然成为了一个良好而庞大的生态系统。**其实这才是Java最大的优势和财富。**

### Java 是最好的语言吗？

不是，因为在每个领域都有更合适的编程语言。

* C 语言无疑是现代计算机软件编程语言的王者，几乎所有的操作系统都是 C 语言写成的。C++ 是面向对象的 C 语言，一直在不断的改进。

* JavaScript 是能运行在浏览器中的语言，丰富的前端界面离不开 Javascript 的功劳。近年来的 Node.js 又在后端占有一席之地。
* Python 用于系统管理，并通过高性能预编译的库，提供 API 来进行科学计算，文本处理等，是 Linux 必选的解释性语言。
* Ruby 强于 DSL（领域特定语言），程序员可以定义丰富的语义来充分表达自己的思想。
* Erlang 就是为分布式计算设计的，能保证在大规模并发访问的情况下，保持强壮和稳定性。
* Go 语言内置了并发能力，可以编译成本地代码。当前新的网络相关项目，很大比例是由 Go 语言编写的，如 Docker、Kubernetes 等。
* 编写网页用 PHP，函数式编程有 Lisp，编写 iOS 程序有 Swift/Objective-C。
*  R的思想是：它可以提供一些集成的统计工具，但更大量的是它提供各种数学计算、统计计算的[函数](https://baike.baidu.com/item/函数/301912)，从而使使用者能灵活机动的进行数据分析，甚至创造出符合需要的新的统计计算方法
*  SQL 是用于访问和处理数据库的标准的计算机语言， 这类数据库包括：MySQL，Oracle, Sybase, SQL Server, DB2, Access 等等

一句话概括，**能留在排行榜之上的语言，都是好的语言，在其所在的领域能做到最好。**

### Java语言发展历史

Java诞生于SUN（Stanford University Network），09年SUN被Oracle（甲骨文）收购。

Java之父是詹姆斯. 高斯林(James Gosling)。

1996年发布JDK1.0版。

目前最新的版本是Java13。我们学习的Java8。

|   发行版本   |  发行时间  |                             备注                             |
| :----------: | :--------: | :----------------------------------------------------------: |
|     Java     | 1995.05.23 |     Sun公司在Sun world会议上正式发布Java和HotJava浏览器      |
|   Java 1.0   | 1996.01.23 |             Sun公司发布了Java的第一个开发工具包              |
|   Java 1.1   | 1997.02.19 |                                                              |
|   Java 1.2   | 1998.12.08 |    拆分成：J2SE（标准版）、J2EE（企业版）、J2ME（小型版）    |
|   Java 1.3   | 2000.05.08 |                                                              |
|   Java1.4    | 2004.02.06 |                                                              |
| **Java 5.0** | 2004.09.30 | ①版本号从1.4直接更新至5.0；②平台更名为JavaSE、JavaEE、JavaME |
|   Java 6.0   | 2006.12.11 |               2009.04.20 Oracle宣布收购SUN公司               |
|   Java 7.0   | 2011.07.02 |                                                              |
| **Java 8.0** | 2014.03.18 |                                                              |
|   Java 9.0   | 2017.09.22 |    ①每半年更新一次；②Java 9.0开始不再支持windows 32位系统    |
|  Java 10.0   | 2018.03.21 |                                                              |
|  Java 11.0   | 2018.09.25 |                  JDK安装包取消独立JRE安装包                  |
|  Java 12.0   | 2019.03.19 |                                                              |
|  Java 13.0   | 2019.9.18  |                                                              |

### Java技术体系平台

* JavaSE（Java Platform, Standard Edition标准版）：允许您在桌面和服务器上开发和部署Java应用程序。Java提供了丰富的用户界面、性能、多功能性、可移植性和当今应用程序所需的安全性。
* JavaEE（Java Platform, Enterprise Edition企业版）：是为开发企业环境下的应用程序提供的一套解决方案，主要针对于Web应用程序开发。
* JavaME（Java Platform, Micro Edition 小型版）：为互联网上的嵌入式和移动设备上运行的应用提供了一个健壮、灵活的环境：微控制器、传感器、网关、移动电话、个人数字助理（PDA）、电视机顶盒、打印机等等。JavaME包括灵活的用户界面、健壮的安全性、内置的网络协议，以及支持动态下载的网络和离线应用程序。基于JavaME的应用程序在许多设备上都是可移植的，但是利用了每个设备的本机功能。
  +  Java Embedded: 用于解锁物联网的智能设备的价值：
    通过远程市场更新和刷新功能延长产品生命周期和价值；
    利用Java的可伸缩性、健壮性、可移植性和全套功能，提高生产效率，降低成本，缩短上市时间；
    在边缘启用快速数据功能；

  + Java Card：使安全元件（如智能卡和其他防篡改安全芯片）能够承载采用Java技术的应用程序。Java card提供了一个安全的、可互操作的执行平台，它可以在一个资源受限的设备上存储和更新多个应用程序，同时保持最高的认证级别和与标准的兼容性。
  + Java TV：是一种基于JavaME的技术，它为开发在tv和机顶盒设备上运行的java应用程序提供了一个性能良好、安全且易于实现的解决方案。使用Java TV运行时，开发人员可以轻松创建应用程序，例如电子节目指南（EPG）、视频点播（VOD）客户端、游戏和教育应用程序、用于访问Internet数据的应用程序（例如天气、新闻播报器、社交网络）以及大多数蓝光光盘标题上的用户界面和奖金内容。

## 1.4 Java语言跨平台原理

### Java语言的特点

* **完全面向对象：**Java语言支持封装、继承、多态，面向对象编程，让程序更好达到高内聚，低耦合的标准。
* **支持分布式：**Java语言支持Internet应用的开发，在基本的Java应用编程接口中有一个网络应用编程接口（java net），它提供了用于网络应用编程的类库，包括URL、URLConnection、Socket、ServerSocket等。Java的RMI（远程方法激活）机制也是开发分布式应用的重要手段。
* **健壮型：**Java的强类型机制、异常处理、垃圾的自动收集等是Java程序健壮性的重要保证。对指针的丢弃是Java的明智选择。
* **安全：**Java通常被用在网络环境中，为此，Java提供了一个安全机制以防恶意代码的攻击。如：安全防范机制（类ClassLoader），如分配不同的名字空间以防替代本地的同名类、字节代码检查。
* **跨平台性：**Java程序（后缀为java的文件）在Java平台上被编译为体系结构中立的字节码格式（后缀为class的文件），然后可以在实现这个Java平台的任何系统中运行。

### Java语言的跨平台原理

* **跨平台**：任何软件的运行，都必须要运行在操作系统之上，而我们用Java编写的软件可以运行在任何的操作系统上，这个特性称为Java语言的跨平台特性</。该特性是由JVM实现的，我们编写的程序运行在JVM上，而JVM运行在操作系统上。
* **JVM**（Java Virtual Machine ）：Java虚拟机，简称JVM，是运行所有Java程序的假想计算机，是Java程序的运行环境之一，也是Java 最具吸引力的特性之一。我们编写的Java代码，都运行在**JVM** 之上。

![images](./images/6.png)

如图所示，Java的虚拟机本身是不具备跨平台功能的，每个操作系统下都有不同版本的虚拟机。

* **JRE ** (Java Runtime Environment) ：是Java程序的运行时环境，包含`JVM` 和运行时所需要的`核心类库`。
* **JDK**  (Java Development Kit)：是Java程序开发工具包，包含`JRE` 和开发人员使用的工具。

我们想要运行一个已有的Java程序，那么只需安装 `JRE` 即可。

我们想要开发一个全新的Java程序，那么必须安装 `JDK` ，其内部包含 `JRE` 。

![images](./images/7.png)

![images](./images/8.png)

## 1.5 JDK下载和安装

### JDK的下载

* 下载网址：www.oracle.com

* 下载步骤：

  + 登录Oracle公司官网，www.oracle.com，如图所示：在底部选择Developers开发者


![images](./images/9.png)

  + 在**Developers**页面中间的技术分类部分，选择`Java`，单击进入，如图所示：


![images](./images/10.png)

  + 下拉页面，找到**Java**，在此选择`JavaSEDownload`，单击进入，如图所示：



![images](./images/11.png)

  + 选择Downloads选项卡，默认是最新版的Java13下载，在此处选择`Oracle JDK DOWNLOAD`，单击进入可以下载JDK13，如图所示：

![images](./images/12.png)

选择**Accept License Agreement**，并选择对应的操作系统类型，如图所示

![images](./images/13.png)

  + 如果要下载之前JDK版本，那么在刚才JavaSE/Download页面，下拉到最下面，找到Java Archive（Java档案馆），单击Download

![images](./images/14.png)

![images](./images/15.png)

例如：这里选择JavaSE 8(8U211 and later)，选择**Accept License Agreement**，并选择对应的操作系统类型。早期版本分为32位/64位操作系统区分，其中x86表示32位，x64表示64位。

![images](./images/16.png)

### JDK的安装

* 安装步骤：

  + 双击`jdk-8u202-windows-x64.exe`文件，并单击`下一步`，如图所示：


![images](./images/17.png)

  + 取消独立JRE的安装，单击`公共JRE前的下拉列表`，选择`此功能将不可用`如图所示：


![images](./images/18.png)

  + 修改安装路径，单击更改，如图所示：


![images](./images/19.png)

    > 友情提示：安装任何程序（特别是和开发相关）的时候，都选择一个非中文、无空格的路径来安装。

  + 将安装路径修改为`D:\develop\Java\jdk1.8.0_202\`，并单击确定，如图所示：


![images](./images/20.png)

  + 单击下一步，如图所示：


![images](./images/21.png)

  + 稍后几秒，安装完成，如图所示：


![images](./images/22.png)

  + 目录结构，如图所示：




![images](./images/23.png)

## 1.6  常用DOS命令（了解）

### 什么是DOS

Java语言的初学者，学习一些DOS命令，会非常有帮助。DOS是一个早期的操作系统，现在已经被Windows系统取代，对于我们开发人员，目前需要在DOS中完成一些事情，因此就需要掌握一些必要的命令。

Dos： Disk Operating System 磁盘操作系统, 简单说一下windows的目录结构。

![images](./images/24.png)

### 进入DOS操作窗口

* 按下`Windows+R`键，打开运行窗口，输入`cmd`回车，进入到DOS的操作窗口。



![images](./images/25.png)

* 打开DOS命令行后，看到一个路径 `C:\Users\...`  就表示我们现在操作的磁盘是C盘的Users的final目录。

![images](./images/26.png)

### 常用命令

#### 进入目录命令：cd

（1）回到根目录

```shell
cd /  或  cd \
```

![images](./images/27.png)

（2）切换到上一级

```
cd ..
```

![images](./images/28.png)

（3）当前盘的其他目录下

绝对路径：从根目录开始定位，例如：cd d:\test200\1  或者  cd d:/test200/1

相对路径：从当前目录开始定位，例如：..\\..\\..\\test200\\1   或者  ../../../test200/1

例如：现在在d:/test100/hello/a目录，要切换到d:/test200/1目录

![images](./images/29.png)

![images](./images/30.png)

![images](./images/31.png)

#### 切换盘符命令

（1）直接盘符:

```shell
例如：要切换到D盘，直接d:
```

（2）使用cd命令

```shell
例如：要切换到E盘，可以使用cd /D e:
```

使用 /D 开关，除了改变驱动器的当前目录之外，还可改变当前驱动器。

![images](./images/32.png)

#### 查看当前目录下有什么命令：dir

![images](./images/33.png)

![images](./images/34.png)

####  新建目录命令：md (make directory)

```shell
//在当前目录下创建hello文件夹
md hello

//在当前目录下创建a,b,c三个文件夹
md a b c

//在d盘test200下创建ok200文件夹
md d:\test200\ok200
```

![images](./images/35.png)

#### 新建空文件命令：type nul

```shell
type nul > 文件名.扩展名
```

#### 追加内容到文件命令：echo

```shell
echo 内容 > 文件名.扩展名
```

![images](./images/36.png)

#### 复制(copy)或移动(move)文件

```shell
copy 源文件 目标目录\新文件名.扩展名
move 源文件 目标目录
```

![images](./images/37.png)

#### 删除文件命令：del

```shell
//删除指定文件
del 文件名.扩展名
del 目标目录\文件名.扩展名

删除所有文件并询问
del *.*

删除所有文件不询问
del /Q *.*
```

![images](./images/38.png)

![images](./images/39.png)

![images](./images/40.png)

#### 删除目录命令：rd（remove directory)

```
//删除空目录
rd 空目录名

//删除目录以及下面的子目录和文件，带询问
rd /S 非空目录名

//删除目录以及下面的子目录和文件，不带询问
rd /S/Q 非空目录名
```

注意：你在d:\test100\hello\a中，你不能删除test100、hello、a这几个目录

![images](./images/41.png)

![images](./images/42.png)

#### 查看某个目录的下一级目录结构：tree

```shell
tree 目录

tree /F 目录
/F   显示每个文件夹中文件的名称。
```

#### 清屏命令：cls

```shell
cls
```

#### 退出命令：exit

```java
exit
```

## 1.7 配置环境变量

为什么配置path？

![images](./images/43.png)

希望在命令行使用javac.exe等工具时，任意目录下都可以找到这个工具所在的目录。

例如：我们在C:\Users\Irene目录下使用java命令，结果如下：

![images](./images/44.png)

我们在JDK的安装目录的bin目录下使用java命令，结果如下：

![images](./images/45.png)

我们不可能每次使用java.exe，javac.exe等工具的时候都进入到JDK的安装目录下，太麻烦了。我们希望在任意目录下都可以使用JDK的bin目录的开发工具，因此我们需要告诉操作系统去哪里找这些开发工具，这就需要配置path环境变量。

> 友情提示：
>
> 以后我们还会安装很多别的程序，有的也需要配置PATH或XXX_HOME，这里有个小诀窍：
>
> - PATH通常指向这个程序的bin目录
> - XXX_HOME通常指向bin目录的上一级

### 1.7.1 只配置path

* 步骤：

  + 打开桌面上的计算机，进入后在左侧找到`计算机`，单击鼠标`右键`，选择`属性`，如图所示：


![images](./images/46.png)

  + 选择`高级系统设置`，如图所示：


![images](./images/47.png)

  + 在`高级`选项卡，单击`环境变量`，如图所示：


![images](./images/48.png)

  + 在`系统变量`中，选中`Path` 环境变量，`双击`或者`点击编辑` , 如图所示：


![images](./images/49.png)

  + 在变量值的最前面，键入`D:\develop\Java\jdk1.8.0_202\bin; `  分号必须要写，而且还要是**英文符号**。如图所示：


![images](./images/50.png)

  + 环境变量配置完成，**重新开启**DOS命令行，在任意目录下输入`javac` 命令，运行成功。


![images](./images/51.png)

### 1.7.2 配置JAVA_HOME+path

%JAVA_HOME%的含义如下图所示：

![images](./images/52.png)

* 步骤：

  + 打开桌面上的计算机，进入后在左侧找到`计算机`，单击鼠标`右键`，选择`属性`，如图所示：


![images](./images/46.png)

  + 选择`高级系统设置`，如图所示：


![images](./images/47.png)

  + 在`高级`选项卡，单击`环境变量`，如图所示：


![images](./images/48.png)

  + 在`系统变量`中，单击`新建` ，创建新的环境变量，如图所示：


![images](./images/53.png)

  + 变量名输入`JAVA_HOME`，变量值输入 `D:\develop\Java\jdk1.8.0_202` ，并单击`确定`，如图所示：


![images](./images/54.png)

  + 选中`Path` 环境变量，`双击`或者`点击编辑` , 如图所示：


![images](./images/49.png)

  + 在变量值的最前面，键入`%JAVA_HOME%\bin; `  分号必须要写，而且还要是**英文符号**。如图所示：


![images](./images/55.png)

  + 环境变量配置完成，**重新开启**DOS命令行，在任意目录下输入`javac` 命令，运行成功。


![images](./images/51.png)

## 1.8 入门程序HelloWorld

### 1.8.1 HelloWorld案例

#### 程序开发步骤说明

JDK安装完毕，可以开发我们第一个Java程序了。

Java程序开发三步骤：**编写**、**编译**、**运行**。

![images](./images/56.png)

#### 编写Java源程序

1. 在`D:\atguigu\javaee\JavaSE20190624\code\day01_code` 目录下新建文本文件，完整的文件名修改为`HelloWorld.java`，其中文件名为`HelloWorld`，后缀名必须为`.java` 。
2. 用记事本或notepad++等文本编辑器打开

3. 在文件中键入文本并保存，代码如下：

```java
public class HelloWorld {
  	public static void main(String[] args) {
    	System.out.println("HelloWorld");
  	}
}
```

> 友情提示：
>
> 每个字母和符号必须与示例代码一模一样。

第一个 `HelloWord` 源程序就编写完成了，但是这个文件是程序员编写的，JVM是看不懂的，也就不能运行，因此我们必须将编写好的 `Java源文件` 编译成JVM可以看懂的 `字节码文件` ，也就是 `.class` 文件。

编译Java源文件

在DOS命令行中，**进入**`D:\atguigu\javaee\JavaSE20190624\code\day01_code`**目录**，使用 `javac` 命令进行编译。

命令：

```java
javac Java源文件名.后缀名
```

举例：

```
javac HelloWorld.java
```

![images](./images/57.png)

编译成功后，命令行没有任何提示。打开 `D:\atguigu\javaee\JavaSE20190624\code\day01_code` 目录，发现产生了一个新的文件 `HelloWorld.class` ，该文件就是编译后的文件，是Java的可运行文件，称为**字节码文件**，有了字节码文件，就可以运行程序了。

> Java源文件的编译工具 `javac.exe`

#### 运行Java程序

在DOS命令行中，**进入Java源文件的目录**，使用 `java` 命令进行运行。

命令：

```java
java 类名字
```

举例：

```
java HelloWorld
```

> 友情提示：
>
> java HelloWord  不要写 不要写 不要写 .class

![images](./images/58.png)

> Java字节码文件的运行工具：java.exe

### 1.8.2 HelloWorld案例常见错误

* 	单词拼写问题
  + 正确：class		错误：Class
  + 正确：String              错误：string
  + 正确：System            错误：system
  + 正确：main		错误：mian
* 	Java语言是一门严格区分大小写的语言
* 	标点符号使用问题
  + 不能用中文符号，英文半角的标点符号（正确）
  + 括号问题，成对出现

### 1.8.3 Java程序的结构与格式

结构：

```java
类{
    方法{
        语句;
    }
}
```

格式：

（1）每一级缩进一个Tab键

（2）{}的左半部分在行尾，右半部分单独一行，与和它成对的"{"的行首对齐

### 1.8.4 Java程序的入口

Java程序的入口是main方法

```java
public static void main(String[] args){

}
```

### 1.8.5 编写Java程序时应该注意的问题

编码过程：字符转换为二进制的数值

解码过程：将二进制数值转换为字符

乱码：编码和解码过程中使用的字符集不一致。

![images](./images/59.png)

1、字符编码问题

当cmd命令行窗口的字符编码与.java源文件的字符编码不一致，如何解决？

![images](./images/60.png)

解决方案一：

	在Notepad++等编辑器中，修改源文件的字符编码

![images](./images/61.png)

解决方案二：

	在使用javac命令式，可以指定源文件的字符编码

```shell
javac -encoding utf-8 Review01.java
```

2、大小写问题

| 名称       | 含义      | 作用          | 类的数量     |
| ---------- | --------- | ------------- | ------------ |
| 源文件     | xxx.java  | 写代码的地方  | 可以写多个类 |
| 字节码文件 | xxx.class | 在JVM上运行的 | 只包含一个类 |

（1）源文件名：

	不区分大小写，我们建议大家还是区分

（2）字节码文件名与类名

	区分大小写

（3）代码中

	区分大小写

3、源文件名与类名一致问题？

（1）源文件名是否必须与类名一致？public呢？

如果这个类不是public，那么源文件名可以和类名不一致。

如果这个类是public，那么要求源文件名必须与类名一致。

我们建议大家，不管是否是public，都与源文件名保持一致，而且一个源文件尽量只写一个类，目的是为了好维护。

（2）一个源文件中是否可以有多个类？public呢？

一个源文件中可以有多个类，编译后会生成多个.class字节码文件。

但是一个源文件只能有一个public的类。

（3）main必须在public的类中吗？

不是。

但是后面写代码时，基本上main习惯上都在public类中。

# 第二章  Java基础知识

## 2.1 注释（*comment*）

注释的概念：在编写程序的过程中，对程序代码进行解释说明。

* 代码本身和人类的自然语言相比，可读性肯定是要差一些，所以为了更快能够知道代码的含义、作用、需要注意地方，所有程序员都应该养成写注释的好习惯。
* 由于注释的内容是给程序员看的，需要使用人类的自然语言，而自然语言又不符合编程语言的语法，所以必须通过特定的符号，标记出来这部分的内容是注释，而不是要执行的程序的代码。

* **注释**：就是对代码的解释和说明。其目的是让人们能够更加轻松地了解代码。为代码添加注释，是十分必须要的，它不影响程序的编译和运行。
* Java中有`单行注释`、`多行注释`和`文档注释`
  + 单行注释以 `//`开头，以`换行`结束，格式如下：


```java
// 注释内容
```


  + 多行注释以 `/*`开头，以`*/`结束，格式如下：


```java
/*
注释内容
*/
```

    注意：多行注释不能嵌套。

```java
/* /* 错误的示范：这就是一个嵌套的多行注释  */ */
```


  + 文档注释以`/**`开头，以`*/`结束

```java
/**
注释内容
*/
```

    Javadoc命令可以抽取每个类、方法中的文档注释，生成API手册。

示例代码：

```java
/**
这里是一个文档注释，通常包括对类或方法的介绍，还有作者、日期等信息。
类名：HelloWorld
整个程序执行的入口：main函数
作者：彦祖
日期：3月24日
*/
public class HelloWorld{

	/*
	多行注释：注释内容可以分很多行编写
	注意：多行注释不能嵌套，嵌套会导致多行注释提前结束
	main函数是整个程序的入口
	main函数的声明格式是固定的
	每一个类中最多只能有一个main函数*/
	public static void main(String[] args){

		// 单行注释：在命令行窗口内打印一句话
		// 单行注释仅对当前行有效
		System.out.println("彦祖我爱你");

	}

}

class YanZu {

}
```

## 2.2 关键字（*keyword*）

**关键字**：是指在程序中，Java已经定义好的单词，具有特殊含义。

* HelloWorld案例中，出现的关键字有 `public ` 、`class` 、 `static` 、  `void`  等，这些单词已经被Java定义好
* 关键字的特点：全部都是`小写字母`。
* 关键字比较多，不需要死记硬背，学到哪里记到哪里即可。

![images](./images/62.png)

> **关键字一共50个，其中const和goto是保留字。**

> **true, false, null看起来像关键字，但从技术角度，它们是特殊的布尔值和空值。**

## 2.3 标识符( identifier)

简单的说，凡是程序员自己命名的部分都可以称为标识符。

即给类、变量、方法、包等命名的字符序列，称为标识符。

1、标识符的命名规则（必须遵守）

规则是硬性规定：一旦违反，程序就会在编译过程中报错

（1）Java的标识符只能使用26个英文字母大小写，0-9的数字，下划线_，美元符号$

（2）不能使用Java的关键字（包含保留字）和特殊值

（3）数字不能开头

（4）不能包含空格

（5）严格区分大小写

2、标识符的命名规范（遭受鄙视）

规范是柔性规定：违反规范，不会导致编译报错，但是如果不遵守基本的规范，有很大可能被公司开除。

（1）见名知意

（2）类名、接口名等：每个单词的首字母都大写，形式：XxxYyyZzz，

例如：HelloWorld，String，System等

（3）变量、方法名等：从第二个单词开始首字母大写，其余字母小写，形式：xxxYyyZzz，

例如：age, name, bookName, main

（4）包名等：每一个单词都小写，单词之间使用点. 分割，形式：xxx.yyy.zzz，

例如：java.lang

（5）常量名等：每一个单词都大写，单词之间使用下划线_分割，形式：XXX_YYY_ZZZ，

例如：MAX_VALUE, PI

## 2.4 初识数据类型(data type)

### 数据类型分类

Java的数据类型分为两大类：

* **基本数据类型**：包括 `整数`、`浮点数`、`字符`、`布尔`。
* **引用数据类型**：包括 `类`、`数组`、`接口`。

### 基本数据类型

四类八种基本数据类型：

![images](./images/63.png)

> Java中的默认类型：整数类型是 `int` 、浮点类型是 `double` 。

* 常量整数值，
  赋值给byte，只要在byte范围内即可。
  赋值给short，只要在short范围即可。
  赋值给int，只要在int范围即可。
  赋值给long，在int范围内的，可以加也可以不用加L，会自动升级为long，如果数字超过int范围，必须加L。
* 小数常量值，无论多少，不加F，就是double类型。

## 2.5 常量（*constant*）

* **常量：在程序执行的过程中，其值不可以发生改变的量**

* 常量的分类：

  + 自定义常量：通过final关键字定义（后面在面向对象部分讲解）

  + 字面值常量：
    | 字面值常量 |      举例      |
    | :--------: | :------------: |
    | 字符串常量 |  ”HelloWorld“  |
    |  整数常量  |    12，-23     |
    |  浮点常量  |     12.34      |
    |  字符常量  | ‘a’，'0'，‘沙’ |
    |  布尔常量  |  true，false   |
    |   空常量   |      null      |

```java
    public class ConstantDemo {
    	public static void main(String[] args) {
    		//字符串常量
    		System.out.println("HelloWorld");

    		//整数常量
    		System.out.println(12);
    		System.out.println(-23);

    		//小数常量
    		System.out.println(12.34);

    		//字符常量
    		System.out.println('a');
    		System.out.println('0');
            System.out.println('沙');

    		//布尔常量
    		System.out.println(true);
    		System.out.println(false);
    	}
    }
```

::: warning 注意

- 字符常量，单引号里面有且仅有一个字符
- 空常量，不可以在输出语句中直接打印

:::

## 2.6 变量（*variable*）

### 2.6.1 变量的概念

**变量：在程序执行的过程中，其值可以发生改变的量**

变量的作用：用来存储数据，代表内存的一块存储区域，这块内存中的值是可以改变的。

### 2.6.2 变量的三要素

1、数据类型

2、变量名

3、值

### 2.6.3 变量的使用应该注意什么？

1、先声明后使用

> 如果没有声明，会报“找不到符号”错误

2、在使用之前必须初始化

> 如果没有初始化，会报“未初始化”错误

3、变量有作用域

> 如果超过作用域，也会报“找不到符号”错误

4、在同一个作用域中不能重名

### 2.6.4 变量的声明和赋值、使用的语法格式？

1、变量的声明的语法格式：

```java
数据类型  变量名;
例如：
int age;
String name;
double weight;
char gender;
boolean isMarry;
```

2、变量的赋值的语法格式：

```java
变量名 = 值;
例如：
age = 18;
name = "柴林燕"; //字符串的值必须用""
weight = 44.4;
gender = '女';//单字符的值必须使用''
isMarry = true;
```

3、变量的使用的语法格式：

```java
通过变量名直接引用

例如：
(1)输出变量的值
System.out.println(age);
System.out.println(name);
System.out.println(weight);
System.out.println(gender);
System.out.println(isMarry);

(2)计算
age = age + 1;//年龄增加1岁
```

### 2.6.7 练习：定义所有基本数据类型的变量和字符串变量并输出

```java
public class VariableDemo {
	public static void main(String[] args){
        // 定义字节型变量
        byte b = 100;
        System.out.println(b);
        // 定义短整型变量
        short s = 1000;
        System.out.println(s);
        // 定义整型变量
        int i = 123456;
        System.out.println(i);
        // 定义长整型变量
        long l = 12345678900L;
        System.out.println(l);
        // 定义单精度浮点型变量
        float f = 5.5F;
        System.out.println(f);
        // 定义双精度浮点型变量
        double d = 8.5;
        System.out.println(d);
        // 定义布尔型变量
        boolean bool = false;
        System.out.println(bool);
        // 定义字符型变量
        char c = 'A';
        System.out.println(c);

        // 定义字符串变量
        String s = "HelloWorld";
        System.out.println(s);
	}
}
```

> **long类型：如果赋值的常量整数超过int范围，那么需要在数字后面加L。**
>
> **float类型：如果赋值为常量小数，那么需要在小数后面加F。**
>
> **char类型：使用单引号''**
>
> **String类型：使用双引号""**

## 2.7 两种常见的输出语句

* **换行输出语句**：输出内容，完毕后进行换行，格式如下：

```java
  System.out.println(输出内容);
```

* **直接输出语句**：输出内容，完毕后不做任何处理，格式如下

```java
System.out.print(输出内容);
```

示例代码：

```java
String name = "柴林燕";
int age = 18;

对比如下两组代码：
System.out.println(name);
System.out.println(age);

System.out.print(name);
System.out.print(age);

对比如下两组代码：
System.out.print("姓名：" + name +",");//""中的内容会原样显示
System.out.println("年龄：" + age);//""中的内容会原样显示

System.out.print("name = " + name + ",");
System.out.println("age = " + age);
```

::: warning 注意

- 换行输出语句，括号内可以什么都不写，只做换行处理
- 直接输出语句，括号内什么都不写的话，编译报错
- 如果()中有多项内容，那么必须使用 + 连接起来
- 如果某些内容想要原样输出，就用""引起来，而要输出变量中的内容，则不要把变量名用""引起来

:::