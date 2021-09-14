

# 第一节 准备数据

## 1、修改配置

为了能够看出 SQL 优化前后的性能差异，我们需要较为大量的数据。生成这些数据我们需要用到 MySQL 中的自定义函数。

但是 MySQL 默认关闭了自定义函数功能，所以我们需要通过修改配置文件来开启这项功能。



```sql
# 使用 vim 编辑器打开配置文件
vim /etc/my.cnf
```



在配置文件末尾增加如下内容：

```sql
# 设置为 1 表示开启这项功能
log_bin_trust_function_creators=1
```



然后重启 MySQL 服务：

```sql
systemctl restart mysqld.service
```



## 2、执行 SQL 语句生成数据

```sql
# 创建数据库
create database db_hr_sys;

# 使用数据库
use db_hr_sys;

# 创建数据库表：部门表
CREATE TABLE `dept` (
 `id` INT(11) NOT NULL AUTO_INCREMENT,
 `deptName` VARCHAR(30) DEFAULT NULL,
 `address` VARCHAR(40) DEFAULT NULL,
 `ceo` INT NULL ,
 PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

# 创建数据库表：员工表
CREATE TABLE `emp` (
 `id` INT(11) NOT NULL AUTO_INCREMENT,
 `empno` INT NOT NULL ,
 `name` VARCHAR(20) DEFAULT NULL,
 `age` INT(3) DEFAULT NULL,
 `deptId` INT(11) DEFAULT NULL,
 PRIMARY KEY (`id`)
 #CONSTRAINT `fk_dept_id` FOREIGN KEY (`deptId`) REFERENCES `t_dept` (`id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

# 声明函数：生成随机字符串
DELIMITER $$
CREATE FUNCTION rand_string(n INT) RETURNS VARCHAR(255)
BEGIN
DECLARE chars_str VARCHAR(100) DEFAULT 'abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ';
DECLARE return_str VARCHAR(255) DEFAULT '';
DECLARE i INT DEFAULT 0;
WHILE i < n DO
SET return_str =CONCAT(return_str,SUBSTRING(chars_str,FLOOR(1+RAND()*52),1));
SET i = i + 1;
END WHILE;
RETURN return_str;
END $$

# 声明函数：生成随机数字
DELIMITER $$
CREATE FUNCTION  rand_num (from_num INT ,to_num INT) RETURNS INT(11)
BEGIN
DECLARE i INT DEFAULT 0;
SET i = FLOOR(from_num +RAND()*(to_num - from_num+1))   ;
RETURN i;
END$$

# 创建存储过程：插入员工数据
DELIMITER $$
CREATE PROCEDURE  insert_emp(  START INT ,  max_num INT )
BEGIN
DECLARE i INT DEFAULT 0;
 SET autocommit = 0;    #设置手动提交事务
 REPEAT  #循环
 SET i = i + 1;  #赋值
 INSERT INTO emp (empno, NAME ,age ,deptid ) VALUES ((START+i),rand_string(6),rand_num(30,50),rand_num(1,10000));
 UNTIL i = max_num
 END REPEAT;
 COMMIT;  #提交事务
END$$

# 创建存储过程：插入部门数据
DELIMITER $$
CREATE PROCEDURE `insert_dept`(  max_num INT )
BEGIN
DECLARE i INT DEFAULT 0;
 SET autocommit = 0;
 REPEAT
 SET i = i + 1;
 INSERT INTO dept ( deptname,address,ceo ) VALUES (rand_string(8),rand_string(10),rand_num(1,500000));
 UNTIL i = max_num
 END REPEAT;
 COMMIT;
END$$

# 调用存储过程，向部门表插入1万条数据
CALL insert_dept(10000);

# 调用存储过程，向员工表插入50万条数据
CALL insert_emp(100000,500000);
```



[回目录](index.html) [下一节](verse02.html)