---
outline: deep
---

# Create Local YUM Repository

## Install the createrepo tool

```shell
yum install createrepo
yum install createrepo_c
```

## create repository directory and place packages there

```shell
mkdir /path/to/repository
cp /path/to/packages /path/to/repository
```

## Run createrepo

```shell
createrepo /path/to/repository
```

## Create a YUM configuration file for the repository

The configuration file should be placed under the `/etc/yum.repos.d/` directory and could look like:

```shell
# /etc/yum.repos.d/myrepo.repo
[myrepo]
name=My Repository
baseurl=file:///path/to/repository/
enabled=1
gpgcheck=0
```

```shell
dnf clean all && dnf makecache
```

## Download packages

Download the latest package and the uninstalled dependencies to the current directory.

```shell
dnf download <PackageName or RPM file> --resolve

# Examples
dnf download nginx --resolve
dnf download google-chrome-stable_current_x86_64.rpm --resolve
```
