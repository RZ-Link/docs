---
outline: deep
---

# HAProxy

## 安装

```shell
dnf install haproxy
```

## 启动

```shell
systemctl start haproxy
```

## 配置

配置文件/etc/haproxy/haproxy.cfg

```shell
frontend front1
    bind *:3306
    mode tcp
    default_backend back1

backend back1
    mode tcp
    server db1 192.168.1.10:3306
```

检查配置文件的语法是否正确

```shell
haproxy -c -f /etc/haproxy/haproxy.cfg
```

