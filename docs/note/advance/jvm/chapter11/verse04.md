# 第四节 辅助信息

| 参数名称                              | 含义                                                      | 说明                                                         |
| ------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| -XX:+PrintGC                          |                                                           | 输出形式：[GC 118250K->113543K(130112K), 0.0094143 secs]<br/>[Full GC 121376K->10414K(130112K), 0.0650971 secs] |
| -XX:+PrintGCDetails                   |                                                           | 输出形式:[GC [DefNew: 8614K->781K(9088K), 0.0123035 secs] 118250K->113543K(130112K), 0.0124633 secs]<br/>[GC [DefNew: 8614K->8614K(9088K), 0.0000665 secs][Tenured: 112761K->10414K(121024K), 0.0433488 secs] 121376K->10414K(130112K), 0.0436268 secs] |
| -XX:+PrintGCTimeStamps                |                                                           |                                                              |
| -XX:+PrintGC:PrintGCTimeStamps        |                                                           | 可与-XX:+PrintGC -XX:+PrintGCDetails混合使用<br/>输出形式:11.851: [GC 98328K->93620K(130112K), 0.0082960 secs] |
| -XX:+PrintGCApplicationStoppedTime    | 打印垃圾回收期间程序暂停的时间.可与上面混合使用           | 输出形式：Total time for which application threads were stopped: 0.0468229 seconds |
| -XX:+PrintGCApplicationConcurrentTime | 打印每次垃圾回收前,程序未中断的执行时间.可与上面混合使用  | 输出形式：Application time: 0.5291524 seconds                |
| -XX:+PrintHeapAtGC                    | 打印GC前后的详细堆栈信息                                  |                                                              |
| -Xloggc:filename                      | 把相关日志信息记录到文件以便分析。<br/>与上面几个配合使用 |                                                              |
| -XX:+PrintClassHistogram              | garbage collects before printing the histogram            |                                                              |
| -XX:+PrintTLAB                        | 查看TLAB空间的使用情况                                    |                                                              |
| XX:+PrintTenuringDistribution         | 查看每次minor GC后新的存活周期的阈值                      | Desired survivor size 1048576 bytes, new threshold 7 (max 15)<br/>new threshold 7即标识新的存活周期的阈值为7。 |
| -XX:+HeapDumpOnOutOfMemoryError       | OOM时导出堆到文件。                                       |                                                              |



[上一节](verse04.html) [回目录](index.html)