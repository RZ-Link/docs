---
outline: deep
---

# pip

## pip install

Install a list of requirements specified in a file.
```shell
pip install -r requirements.txt
```

Install a local project in “editable” mode.
```shell
pip install -e .
```

Install from a different index, and not PyPI.
```shell
pip install -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple SomePackage
```

Install from a local flat directory containing archives (and don’t scan indexes)
```shell
pip install --no-index --find-links=/local/dir/ SomePackage
```

## pip download

Download a package and all of its dependencies.
```shell
pip download -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple SomePackage
```
