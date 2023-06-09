

# 第二章 逻辑架构

## 1、总述

和其它数据库有所不同，MySQL 的架构可以在多种不同场景中应用并发挥良好作用。主要体现在存储引擎的架构上，<span style="color:blue;font-weight:bold;">『插件式』</span>的<span style="color:blue;font-weight:bold;">『存储引擎架构』</span>将查询和其它的系统任务以及数据的存储提取相分离。

这种架构可以根据业务的需求和实际需要选择合适的存储引擎。

![images](./images/img001.png)



## 2、连接层

最上层是一些客户端和连接服务，包含本地 sock 通信和大多数基于客户端/服务端工具实现的类似于 TCP/IP 的通信。

主要任务是连接处理、授权认证、及相关的安全方案等。

该层引入了线程池，为通过认证、安全接入的客户端提供线程处理任务。

同样在该层上可以实现基于 SSL 的安全链接。服务器也会为安全接入的每个客户端验证它所具有的操作权限。



## 3、服务层

第二层架构主要完成大多数的核心服务功能。如 SQL 接口、并完成缓存的查询、SQL 的分析和优化及部分内置函数的执行。

所有跨存储引擎的功能也在这一层实现，如过程、函数等。

在该层，服务器会解析查询并创建相应的内部解析树，并对其完成相应的优化：如确定查询表的顺序，是否利用索引等，最后生成相应的执行操作。

如果是 select 语句，服务器还会查询内部的缓存。如果缓存空间足够大，这样在解决大量读操作的环境中能够很好的提升系统的性能。



| 模块名称                         | 作用                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| Management Serveices & Utilities | 系统管理和控制工具                                           |
| SQL Interface                    | 接受用户的 SQL 指令，并且返回查询的结果。比如 select from 就是调用SQL Interface |
| Parser                           | SQL 命令传递到解析器的时候会被解析器验证和解析。             |
| Optimizer                        | 查询优化器<br />SQL 语句在查询之前会使用查询优化器对查询进行优化。 <br />例如： select uid,name from user where gender= 1;<br />查询优化器来决定先投影还是先过滤。 |
| Cache和Buffer                    | 查询缓存，存储 SELECT 语句以及相应的查询结果集<br />如果查询缓存有命中的查询结果，查询语句就可以直接去查询缓存中取数据。<br />这个缓存机制是由一系列小缓存组成的。比如表缓存，记录缓存，key 缓存，权限缓存等 |



## 4、引擎层

存储引擎层，存储引擎真正的负责了 MySQL 中数据的存储和提取，服务器通过 API 与存储引擎进行通信。不同的存储引擎具有的功能不同，这样我们可以根据自己的实际需要选取。后面介绍 MyISAM 和 InnoDB。



## 5、存储层

数据存储层，主要是将数据存储在运行于裸设备的文件系统之上，并完成与存储引擎的交互。



## 6、工作流程

### ①建立连接

MySQL 客户端通过协议与 MySQL 服务器建连接，发送查询语句。



### ②查询缓存

检查查询缓存中是否存在要查询的数据。

- 命中：直接返回结果。

  不会再对查询进行解析、优化、以及执行。它仅仅将缓存中的结果返回给用户即可，这将大大提高系统的性能。

- 未命中：解析 SQL 语句。



### ③语法解析器和预处理

MySQL 首先根据语法规则验证 SQL 语句的语法正确性，然后通过关键字将 SQL 语句进行解析，并生成一棵对应的『解析树』。预处理器则根据一些 MySQL 规则进一步检查解析树是否合法。



### ④生成执行计划

当解析树被确认为合法，接下来就会由查询优化器将解析树转化成执行计划（profile）。一条查询可以有很多种执行方式，最后都返回相同的结果。优化器的作用就是找到这其中最好的执行计划。



### ⑤按计划执行并获取数据

MySQL 默认使用 BTree 索引，并且一个大致方向是：无论怎么折腾 SQL，至少在目前来说，MySQL 最多只用到表中的一个索引。



![images](./images/img002.png)



[上一章](../chapter01/index.html) [回目录](../index.html) [下一章](../chapter03/index.html)
