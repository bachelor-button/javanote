

# 第六节 用户管理

## 1、创建用户

- 用户名：jack
- 密码：goodman

```sql
# create user 新用户的用户名 identified by '新用户的密码';
create user jack identified by 'goodman';
```



## 2、user 表

### ①查看 user 表的表结构

```sql
mysql> use mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> desc user;
+------------------------+-----------------------------------+------+-----+-----------------------+-------+
| Field                  | Type                              | Null | Key | Default               | Extra |
+------------------------+-----------------------------------+------+-----+-----------------------+-------+
| Host                   | char(60)                          | NO   | PRI |                       |       |
| User                   | char(32)                          | NO   | PRI |                       |       |
| Select_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Insert_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Update_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Delete_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Create_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Drop_priv              | enum('N','Y')                     | NO   |     | N                     |       |
| Reload_priv            | enum('N','Y')                     | NO   |     | N                     |       |
| Shutdown_priv          | enum('N','Y')                     | NO   |     | N                     |       |
| Process_priv           | enum('N','Y')                     | NO   |     | N                     |       |
| File_priv              | enum('N','Y')                     | NO   |     | N                     |       |
| Grant_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| References_priv        | enum('N','Y')                     | NO   |     | N                     |       |
| Index_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| Alter_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| Show_db_priv           | enum('N','Y')                     | NO   |     | N                     |       |
| Super_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| Create_tmp_table_priv  | enum('N','Y')                     | NO   |     | N                     |       |
| Lock_tables_priv       | enum('N','Y')                     | NO   |     | N                     |       |
| Execute_priv           | enum('N','Y')                     | NO   |     | N                     |       |
| Repl_slave_priv        | enum('N','Y')                     | NO   |     | N                     |       |
| Repl_client_priv       | enum('N','Y')                     | NO   |     | N                     |       |
| Create_view_priv       | enum('N','Y')                     | NO   |     | N                     |       |
| Show_view_priv         | enum('N','Y')                     | NO   |     | N                     |       |
| Create_routine_priv    | enum('N','Y')                     | NO   |     | N                     |       |
| Alter_routine_priv     | enum('N','Y')                     | NO   |     | N                     |       |
| Create_user_priv       | enum('N','Y')                     | NO   |     | N                     |       |
| Event_priv             | enum('N','Y')                     | NO   |     | N                     |       |
| Trigger_priv           | enum('N','Y')                     | NO   |     | N                     |       |
| Create_tablespace_priv | enum('N','Y')                     | NO   |     | N                     |       |
| ssl_type               | enum('','ANY','X509','SPECIFIED') | NO   |     |                       |       |
| ssl_cipher             | blob                              | NO   |     | NULL                  |       |
| x509_issuer            | blob                              | NO   |     | NULL                  |       |
| x509_subject           | blob                              | NO   |     | NULL                  |       |
| max_questions          | int(11) unsigned                  | NO   |     | 0                     |       |
| max_updates            | int(11) unsigned                  | NO   |     | 0                     |       |
| max_connections        | int(11) unsigned                  | NO   |     | 0                     |       |
| max_user_connections   | int(11) unsigned                  | NO   |     | 0                     |       |
| plugin                 | char(64)                          | NO   |     | mysql_native_password |       |
| authentication_string  | text                              | YES  |     | NULL                  |       |
| password_expired       | enum('N','Y')                     | NO   |     | N                     |       |
| password_last_changed  | timestamp                         | YES  |     | NULL                  |       |
| password_lifetime      | smallint(5) unsigned              | YES  |     | NULL                  |       |
| account_locked         | enum('N','Y')                     | NO   |     | N                     |       |
+------------------------+-----------------------------------+------+-----+-----------------------+-------+
45 rows in set (0.00 sec)
```



### ②查询特定字段

```sql
mysql> select host,user,authentication_string,select_priv,insert_priv,drop_priv from mysql.user;
+-----------+---------------+-------------------------------------------+-------------+-------------+-----------+
| host      | user          | authentication_string                     | select_priv | insert_priv | drop_priv |
+-----------+---------------+-------------------------------------------+-------------+-------------+-----------+
| localhost | root          | *453FDE92DF58E2DE1A51D27869CF3F1A69984B1B | Y           | Y           | Y         |
| localhost | mysql.session | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | N           | N           | N         |
| localhost | mysql.sys     | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | N           | N           | N         |
| %         | jack          | *526A5B7D4796C473D1C1F91CD65EBA8BE4FB6BF7 | N           | N           | N         |
+-----------+---------------+-------------------------------------------+-------------+-------------+-----------+
4 rows in set (0.00 sec)
```



### ③字段含义

#### [1]host

host 本身表示主机地址。可选值的具体语法含义如下：

| 语法符号                                       | 含义                                                      |
| ---------------------------------------------- | --------------------------------------------------------- |
| %                                              | 所有通过 TCP 方式建立的远程连接                           |
| IP 地址<br />例如：192.168.105.33 或 127.0.0.1 | 通过指定 IP 地址建立的 TCP 连接                           |
| 计算机名称                                     | 通过指定计算机名称建立的 TCP 连接                         |
| ::1                                            | IPv6 的本地 IP 地址，等同于 IPv4 的 127.0.0.1             |
| localhost                                      | 通过本地命令行建立的连接<br />例如：mysql -u root -p 登录 |



#### [2]user

表示用户名，同一用户通过不同方式连接的权限是不一样的。



#### [3]authentication_string

密码。实际保存的是根据明文加密后得到的密文。加密算法为：MYSQLSHA1，不可逆。在 5.7 版本前使用 password 字段保存密码。



## 3、设置密码

### ①当前用户

```sql
# set password='新密码';
set password='come';
```



### ②非当前用户

```sql
# 通过 update 语句修改数据库表中密码字段的值
update mysql.user set authentication_string=password('123456') where user='zhang3';

# 所有通过 user 表所做的修改，必须用该命令才能生效。否则，需重启服务。
flush privileges;
```



## 4、修改用户名

```sql
update mysql.user set user='wang5' where user='zhang3';
flush privileges;
```



## 5、删除用户

```sql
drop user zhang3;
```

<span style="color:blue;font-weight:bold;">不要通过 delete from user where user='li4' 进行删除，系统会有<span style="color:red;">残留信息</span>保留</span>。



[上一节](verse05.html) [回目录](index.html)  [下一节](verse07.html)