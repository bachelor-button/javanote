# 第一节 提出问题

Maven替我们去下载jar包的时候，有可能出现在网络传输过程中数据丢失、中途断网，从而导致下载失败。

![./images](./images/img042.png)



# 第二节 Maven正常下载的做法
* jar包在下载过程中，jar包的扩展名是xxx.jar.lastUpdated
* jar包下载成功后，Maven会将lastUpdated扩展名删除，让jar包恢复为xxx.jar这样的名称



# 第三节 下载失败的第一种情况

## 1、Maven的行为描述

* jar包在下载过程中，jar包的扩展名是xxx.jar.lastUpdated
* 网络连接丢失，无法继续下载
* jar包没有下载完，lastUpdated扩展名不会被删除
* 当我们要求Maven重新下载时，Maven看到这个jar包的扩展名是lastUpdated，Maven就不管了

## 2、解决办法

手动删除所有以lastUpdated结尾的文件，然后让Maven重新下载。可是当仓库中lastUpdated文件太多的时候，手动删除不可行，所以我们需要借助批处理文件：clearLastUpdated.bat。使用方法：

* 将clearLastUpdated.bat文件复制到本地仓库的根目录
* 使用文件编辑打开clearLastUpdated.bat文件
* 修改下面的内容

> SET CLEAR_PATH=设置为本地仓库所在的盘符
> SET CLEAR_DIR=设置为本地仓库的根目录的路径

例如：

> SET CLEAR_PATH=D:
> SET CLEAR_DIR=D:\maven-rep1026

* 在想要执行清理时，双击运行这个文件即可

## 3、要求Maven重新下载jar包

![./images](./images/img043.png)



# 第四节 下载失败的第二种情况

## 1、文件校验工具

jar包表面上看起来是下载完的状态，结尾并没有“.lastUpdated”扩展名。但是程序运行时找不到这个jar包中的类。例如：针对jar包中的类出现ClassNotFoundException。

![./images](./images/img033.jpg)

遇到类似问题需要先确认一下“有嫌疑”的jar包是否存在内部损坏问题。此时可以使用上面的文件校验工具。

![./images](./images/img039.jpg)

## 2、用法

* 打开文件校验工具
* 将待校验的jar包拖拽到文件校验工具窗口内
* 将待校验的jar包旁边的*.sha1文件打开
* 比较两个SHA1值
* 一致：jar包完好
* 不一致：jar包损坏

## 3、原理

HASH加密包括很多具体加密算法，但是所有HASH算法都满足下面特征：

* 只要输入数据不变，任何时候执行加密，输出不变
* 输入数据有细微变化，输出数据跟着变化
* 不可逆，不能通过密文反推回明文
* 每一种具体的HASH加密算法加密后长度固定

## 4、找到有嫌疑的jar包

假设现在出现了一个ClassNotFoundException，提示找不到类：org.springframework.expression. Expression。此时我们怀疑这个类所在的jar包下载失败。<br/>

* 窍门1：类所在的package命名往往和jar包坐标的groupId部分类似。
* 窍门2：在IDEA中按两下Shift键，使用全类名搜索

![./images](./images/img040.jpg)

找到jar包后，点右键→Show in Explorer

* 窍门3：如果前面的办法都没法定位，只能根据这个类看上去的特征和可能的功能找有可能有关的jar包

## 5、为什么不建议删整个库

* 整个库删除后，需要重新下载整个库。此时东边的jar包没有失败，可能西边的jar包会失败。
* 整个库整体重新下载时，会有很多jar包并行下载的，相对来说并行下载本身就容易丢失数据。


