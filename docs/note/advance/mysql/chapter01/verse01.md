

# 第一节 准备工作

## 1、卸载 mariadb

```shell
# 检测 mariadb 是否已安装
# 若已安装会看到：mariadb-libs-5.5.56-2.el7.x86_64
rpm -qa|grep mariadb

# 卸载 mariadb
rpm -e --nodeps mariadb-libs-5.5.56-2.el7.x86_64
```



## 2、安装 MySQL 所需库

```shell
yum install -y libaio perl net-tools
```





[回目录](index.html) [下一节](verse02.html)