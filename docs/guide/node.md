# node 包版本管理

```sh
# 查看 n 版本
n --version/-V
# 查看 node 本地当前使用版本
node --version/-v
# 查看 node 远程版本
n lsr/ls-remote [--all] // 默认20个，--all展示所有
# 查看 n 管理的 node 版本
n [ls/list/--all]
```

## 安装 nodejs

```sh
# 安装指定版本
n [install/i] <version>
# 安装稳定版本
n lts/stable
# 安装最新版本
n latest/current
# 安装文件中对应 node 版本 [.n-node-version, .node-version, .nvmrc, or package.json]
n auto
# 安装 package.json 对应 node 版本
n engine
# 通过发布流的代码名 例如[ boron, carbon]
n boron/carbon
```

## 查看 nodejs 版本安装路径

```sh
n which/bin <version>
```
