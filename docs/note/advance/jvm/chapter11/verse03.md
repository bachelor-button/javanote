# 第三节 并行收集器相关参数

| 参数名称                   | 含义                                              | 默认值 | 说明                                                         |
| -------------------------- | ------------------------------------------------- | ------ | ------------------------------------------------------------ |
| -XX:+UseParallelGC         | Full GC采用parallel MSC<br/>(此项待验证)          |        | 选择垃圾收集器为并行收集器。此配置仅对年轻代有效。即上述配置下，年轻代使用并发收集，而年老代仍旧使用串行收集。(此项待验证) |
| -XX:+UseParNewGC           | 设置年轻代为并行收集                              |        | 可与CMS收集同时使用<br/>JDK5.0以上JVM会根据系统配置自行设置，所以无需再设置此值 |
| -XX:ParallelGCThreads      | 并行收集器的线程数                                |        | 此值最好配置与处理器数目相等同样适用于CMS                    |
| -XX:+UseParallelOldGC      | 年老代垃圾收集方式为并行收集(Parallel Compacting) |        | 这个是JAVA 6出现的参数选项                                   |
| -XX:MaxGCPauseMillis       | 每次年轻代垃圾回收的最长时间(最大暂停时间)        |        | 如果无法满足此时间，JVM会自动调整年轻代大小，以满足此值。    |
| -XX:+UseAdaptiveSizePolicy | 自动选择年轻代区大小和相应的Survivor区比例        |        | 设置此选项后,并行收集器会自动选择年轻代区大小和相应的Survivor区比例，以达到目标系统规定的最低相应时间或者收集频率等，此值建议使用并行收集器时，一直打开。 |
| -XX:GCTimeRatio            | 设置垃圾回收时间占程序运行时间的百分比            |        | 公式为1/(1+n)                                                |
| -XX:+ScavengeBeforeFullGC  | Full GC前调用YGC                                  | true   | Do young generation GC prior to a full GC. (Introduced in 1.4.1.) |



[上一节](verse02.html) [回目录](index.html) [下一节](verse04.html)