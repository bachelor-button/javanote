

# 第五节 ReentrantLock和synchronized对比



- 相同点：
  - 独占锁
  - 可重入
- 不同点：

| &nbsp;    | ReentrantLock | synchronized |
| --------- | ------------- | ------------ |
| 加锁/解锁 | 手动          | 自动         |
| 灵活      | √             | ×            |
| 便捷      | ×             | √            |
| 响应中断  | √             | ×            |
| 代码风格  | 面向对象      | 面向过程     |



[上一节](verse04.html) [回目录](index.html) [下一节](verse06.html)