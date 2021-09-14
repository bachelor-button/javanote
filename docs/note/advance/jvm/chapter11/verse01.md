

# 第一节 生产时JVM参数设置参考



- 最大堆内存和初始化堆内存设置为一致：直接一步到位设置为能够使用的最大值，免除频繁申请空间的操作。
- 新生代大小：Sun官方推荐配置为整个堆的3/8



```shell
-Xmx3000M
-Xms3000M
-Xmn600M
-XX:PermSize=500M
-XX:MaxPermSize=500M
-Xss256K
-XX:+DisableExplicitGC
-XX:SurvivorRatio=1
-XX:+UseConcMarkSweepGC
-XX:+UseParNewGC
-XX:+CMSParallelRemarkEnabled
-XX:+UseCMSCompactAtFullCollection
-XX:CMSFullGCsBeforeCompaction=0
-XX:+CMSClassUnloadingEnabled
-XX:LargePageSizeInBytes=128M
-XX:+UseFastAccessorMethods
-XX:+UseCMSInitiatingOccupancyOnly
-XX:CMSInitiatingOccupancyFraction=70
-XX:SoftRefLRUPolicyMSPerMB=0
-XX:+PrintClassHistogram
-XX:+PrintGCDetails
-XX:+PrintGCTimeStamps
-XX:+PrintHeapAtGC
-Xloggc:log/gc.log
```





[回目录](index.html) [下一节](verse02.html)