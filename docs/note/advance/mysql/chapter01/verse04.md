

# 第四节 MySQL 安装目录的目录结构

| 参数         | 路径                                                       | 解释                                          |
| ------------ | ---------------------------------------------------------- | --------------------------------------------- |
| --basedir    | /usr/bin                                                   | 相关命令目录<br />mysqladmin、mysqldump等命令 |
| --datadir    | /var/lib/mysql/                                            | MySQL 数据库文件的存放路径                    |
| --plugin-dir | /usr/lib64/mysql/plugin                                    | MySQL 插件存放路径                            |
| --log-error  | /var/log/mysqld.log                                        | MySQL 日志路径                                |
| --pid-file   | /var/run/mysqld/mysqld.pid                                 | 进程 pid 文件                                 |
| --socket     | /var/lib/mysql/mysql.sock                                  | 本地连接时用的unix套接字文件                  |
|              | /usr/share/mysql                                           | 配置文件目录<br />MySQL 脚本及配置文件        |
|              | /etc/systemd/system/multi-user.target.wants/mysqld.service | 服务启停相关脚本                              |
|              | /etc/my.cnf                                                | MySQL 配置文件                                |







[上一节](verse03.html) [回目录](index.html) [下一节](verse05.html)