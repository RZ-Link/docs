---
outline: deep
---

# usecase

## build and deploy

```python
from git import Repo
from pathlib import Path
import shutil
import os
import stat
import subprocess
import paramiko


def remove_readonly(func, path, exc_info):
    os.chmod(path, stat.S_IWRITE)
    func(path)


if __name__ == '__main__':

    # ssh信息
    hostname = '192.168.103.128'
    port = 22
    username = 'root'
    password = 'Password-2026'
    # git信息
    url = "https://github.com/RZ-Link/SpringCloudDemo.git"
    branch = "main"
    git_clone_to_path = os.path.join(os.path.dirname(__file__), 'temp')
    # build and deploy信息
    mvn_module_name = 'service/service-order'
    local_jar_path = os.path.join(git_clone_to_path, 'service', 'service-order', 'target',
                                  'service-order-1.0-SNAPSHOT.jar')
    remote_jar_path = "/usr/local/demo/service/service-order-1.0-SNAPSHOT.jar"
    restart_command = "jps | grep service-order | awk '{ print $1 }' | xargs -r kill -9 && cd /usr/local/demo/service && nohup java -jar service-order-1.0-SNAPSHOT.jar >> log.log 2>&1 &"

    # 重建目录
    if Path(git_clone_to_path).exists() and Path(git_clone_to_path).is_dir():
        shutil.rmtree(Path(git_clone_to_path), onerror=remove_readonly)
    Path(git_clone_to_path).mkdir()

    # clone项目
    repo = Repo.clone_from(url, git_clone_to_path, branch=branch)

    # build模块
    result = subprocess.run(f'mvn clean package -pl {mvn_module_name} -am',
                            cwd=git_clone_to_path,
                            shell=True,
                            capture_output=True,
                            text=True)

    # 创建ssh连接
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(hostname=hostname, port=port, username=username, password=password)

    # 删除远程jar包
    stdin, stdout, stderr = ssh_client.exec_command(f"rm {remote_jar_path}")

    # 上传本地jar包
    sftp_client = ssh_client.open_sftp()
    sftp_client.put(local_jar_path, remote_jar_path)
    sftp_client.close()

    # 重启java进程
    stdin, stdout, stderr = ssh_client.exec_command(restart_command)

    # 关闭ssh连接
    ssh_client.close()

    # 删除本地文件
    if (Path(git_clone_to_path).exists() and Path(git_clone_to_path).is_dir()):
        shutil.rmtree(Path(git_clone_to_path), onerror=remove_readonly)

```

