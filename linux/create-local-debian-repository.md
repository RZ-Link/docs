---
outline: deep
---

# Create Local Debian Repository

## Download Deb Packages
Download only. Package files are only retrieved, not unpacked or installed.
```shell
apt-get --download-only install <PackageName>
```
Check the downloaded .deb archives in the apt cache folder.
```shell
ll /var/cache/apt/archives/
```
Clean clears out the local repository of retrieved package files. It removes everything but the lock file from /var/cache/apt/archives/ and /var/cache/apt/archives/partial/.
```shell
apt-get clean
```

## Install the dpkg-scanpackages tool
Run the following command as root:
```shell
apt-get install dpkg-dev
```

## Run dpkg-scanpackages
Switch to the repository directory and invoke the `dpkg-scanpackages` there:
```shell
cd /path/to/repository
dpkg-scanpackages -m . > Packages
```
This creates the `Packages` file holding the metadata for all packages in the newly created repository.

It is also possible to create a gzipped version of the `Packages` file - `Packages.gz`:
```shell
dpkg-scanpackages -m . | gzip > Packages.gz
```

## Create a Debian configuration file for the repository
The configuration file (for example `myrepo.list`) should be placed under the `/etc/apt/sources.list.d/` directory and may look like:
```shell
deb [trusted=yes] file:/path/to/repository /
```
Resynchronize the package index files.
```shell
apt-get update
```
