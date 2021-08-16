# Docker 卸载

杀死 docker 有关的容器：

```shell
docker kill $(docker ps -a -q)
```

删除所有 docker 容器：

```shell
docker rm $(docker ps -a -q)
```

删除所有 docker 镜像：

```shell
docker rmi $(docker images -q)
```

停止 docker 服务：

```shell
systemctl stop docker
```

删除 docker 相关存储目录：

```shell
rm -rf /etc/docker
rm -rf /run/docker
rm -rf /var/lib/dockershim
rm -rf /var/lib/docker
```

如果删除不掉，则先 umount：

```shell
umount /var/lib/docker/devicemapper
```

然后再重新执行上面那步“删除 docker 相关存储目录”。

经过上面一系列准备后，我们终于到了最后环节，开始删除 docker。

查看系统已经安装了哪些 docker 包：

```shell
[root@localhost ~]# yum list installed | grep docker
containerd.io.x86_64                 1.2.13-3.2.el7                 @docker-ce-stable
docker-ce.x86_64                     3:19.03.12-3.el7               @docker-ce-stable
docker-ce-cli.x86_64                 1:19.03.12-3.el7               @docker-ce-stable
```

一键卸载相关包：

```shell
 yum list installed | grep docker | awk -F " " '{print $1}' | xargs yum remove -y
```

执行完上述操作后，我们重新执行以下命令，看是否已经成功删除：

```shell
yum list installed | grep docker
```

不再出现相关信息，证明删除成功，再看看 docker 命令：

[root@localhost ~]# docker version
-bash: /usr/bin/docker: No such file or directory
因此，成功卸载 Docker
