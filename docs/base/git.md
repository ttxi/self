# GIT

## 常用

### 1.工作区

- 将已修改的文件撤销到未修改的状态：
  <br/> 所有文件 `git cehckout .`
  <br/> 单个文件 `git cehckout [fileName]`

### 2.暂存区

- 将文件撤回到工作区

### 3.本地仓库

### 4.远程仓库

## git stash

- 现在想要切换分支，但是还不想要提交之前的工作；所以贮藏修改。 将新的贮藏推送到栈上，运行 `git stash` 或 `git stash push`
  <br/>
  `git stash` 只会贮藏已修改和暂存的 `已跟踪` 文件, 如果指定 `--include-untracked` 或 `-u` 选项，Git 也会贮藏任何未跟踪文件
  <br />
  要额外包含**忽略**的文件，请使用 `--all` 或 `-a` 选项
- 要查看贮藏的东西，可以使用 `git stash list`
- 可以通过原来 stash 命令的帮助提示中的命令将你刚刚贮藏的工作重新应用：`git stash apply`
  <br/>
  如果想要应用其中一个更旧的贮藏，可以通过名字指定它，像这样：`git stash apply stash@{2}`
- 应用选项只会尝试应用贮藏的工作——在堆栈上还有它。 可以运行 `git stash drop` 加上将要移除的贮藏的名字来移除它

  ```git
  git stash drop
  git stash drop stash@{0}
  ```

  也可以运行 git stash pop 来应用贮藏然后立即从栈上扔掉它。

### 从贮藏创建一个分支

可以运行 `git stash branch <new branchname>` 以你指定的分支名创建一个新分支

### .gitignore忽略规则简单说明

```
#               表示此为注释,将被Git忽略
*.a             表示忽略所有 .a 结尾的文件
!lib.a          表示但lib.a除外
/TODO           表示仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/          表示忽略 build/目录下的所有文件，过滤整个build文件夹；
doc/*.txt       表示会忽略doc/notes.txt但不包括 doc/server/arch.txt
 
bin/:           表示忽略当前路径下的bin文件夹，该文件夹下的所有内容都会被忽略，不忽略 bin 文件
/bin:           表示忽略根目录下的bin文件
/*.c:           表示忽略cat.c，不忽略 build/cat.c
debug/*.obj:    表示忽略debug/io.obj，不忽略 debug/common/io.obj和tools/debug/io.obj
**/foo:         表示忽略/foo,a/foo,a/b/foo等
a/**/b:         表示忽略a/b, a/x/b,a/x/y/b等
!/bin/run.sh    表示不忽略bin目录下的run.sh文件
*.log:          表示忽略所有 .log 文件
config.php:     表示忽略当前路径的 config.php 文件
 
/mtk/           表示过滤整个文件夹
*.zip           表示过滤所有.zip文件
/mtk/do.c       表示过滤某个具体文件
 
被过滤掉的文件就不会出现在git仓库中（gitlab或github）了，当然本地库中还有，只是push的时候不会上传。
 
需要注意的是，gitignore还可以指定要将哪些文件添加到版本管理中，如下：
!*.zip
!/mtk/one.txt
 
唯一的区别就是规则开头多了一个感叹号，Git会将满足这类规则的文件添加到版本管理中。为什么要有两种规则呢？
想象一个场景：假如我们只需要管理/mtk/目录中的one.txt文件，这个目录中的其他文件都不需要管理，那么.gitignore规则应写为：：
/mtk/*
!/mtk/one.txt
 
假设我们只有过滤规则，而没有添加规则，那么我们就需要把/mtk/目录下除了one.txt以外的所有文件都写出来！
注意上面的/mtk/*不能写为/mtk/，否则父目录被前面的规则排除掉了，one.txt文件虽然加了!过滤规则，也不会生效！
 
----------------------------------------------------------------------------------
还有一些规则如下：
fd1/*
说明：忽略目录 fd1 下的全部内容；注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略；
 
/fd1/*
说明：忽略根目录下的 /fd1/ 目录的全部内容；
 
/*
!.gitignore
!/fw/ 
/fw/*
!/fw/bin/
!/fw/sf/
说明：忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；注意要先对bin/的父目录使用!规则，使其不被排除。
```

### git 清理

- 使用 `git clean` 命令去除冗余文件或者清理工作目录
- 使用 `git clean -f -d` 命令来移除工作目录中所有未追踪的文件以及空的子目录

#### `git checkout .` 与 `git clean -f -d` 的区别

- `git checkout` 的作用是放弃掉**还没有加入到暂存区**的修改。此命令不会删除新创建的文件，因为新创建的文件还没有被跟踪（tracked）,因此需要`git clean`。
- `git clean` 的作用是从工作目录中删除还没有被追踪的文件。`-d`选项是指删除没有被追踪的目录， `-f`是指强制执行

## tag 标记

GIT 标签常用指令

GIT 中的标签分为两种，一种是 **轻量标签**（lightweight tag），一种是 **附注标签**（annotated tag）。以下是一些常用的与标签相关的命令：

- `git tag <lightweght_name>`：为当前分支所在的提交记录打上轻量标签。
- `git tag <lightweght_name> <commit SHA-1 value>`：为某次具体的提交记录打上轻量标签。
- `git tag -a <anotated_name> -m <tag_message>`：为当前分支所在的提交记录打上附注标签。
- `git tag`：列出所有的标签名。
- `git tag -d <tag_name>`：删除某个标签，本质上就是移除 **.git/refs/tags/** 中对应的文件。
- `git show <tag_name>`：显示标签对应提交记录的具体信息。
- `git push <remote> <tag_name>`：推送某个标签到远程仓库。
- `git push <remote> --tags`：推送所有标签到远程仓库。
- `git push <remote> --delete <tag_name>`：删除远程仓库中的某个标签。
  > [注]：标签与分支不相关。

### 平时开发

```
git tag -a 'v1.0' -m '第一版标记，即将开发技术池'
git tag
```

## git log

- 作用：查看提交日志
- `git log`只能查看当前 head 以及以前的日志
- `git log --oneline`简洁的日志信息
- `git reflog`查看所有的提交变更日志

## git reset

- 作用：版本回退，将代码恢复到已经提交的某一个版本中。
- `git reset--hard版本号`将代码回退到某个指定的版本 版本号只要有前几位即可

```shell
git reset --hard head~1
```

将版本回退到上一次提交

- ~1:上一次提交
- ~2:上上次提交
- ~0:当前提交

## 命令大全

- -Workspace：工作区
- -Index/Stage：暂存区
- -Repository：仓库区（或本地仓库）
- -Remote：远程仓库

### 1、仓库

```shell
#在当前目录新建一个 Git 代码库
$git init
#新建一个目录，将其初始化为 Git 代码库
$git init[project-name]
#下载一个项目和它的整个代码历史
$git clone[url]
```

### 2、配置

```shell
#显示当前的 Git 配置
$git config--list
#编辑 Git 配置文件
$git config-e[--global]
#设置提交代码时的用户信息
$git config[--global]user.name"[name]"
$git config[--global]user.email"[email address]"
```

### 3、增加/删除文件

```shell
#添加指定文件到暂存区
$git add[file1][file2]...
#添加指定目录到暂存区，包括子目录
$git add[dir]
#添加当前目录的所有文件到暂存区
$git add.
#添加每个变化前，都会要求确认
#对于同一个文件的多处变化，可以实现分次提交
$git add-p
#删除工作区文件，并且将这次删除放入暂存区
$git rm[file1][file2]...
#停止追踪指定文件，但该文件会保留在工作区
$git rm--cached[file]
#改名文件，并且将这个改名放入暂存区
$git mv[file-original][file-renamed]
```

### 4、代码提交

```shell
#提交暂存区到仓库区
$git commit-m[message]
#提交暂存区的指定文件到仓库区
$git commit[file1][file2]...-m[message]
#提交工作区自上次 commit 之后的变化，直接到仓库区
$git commit-a
#提交时显示所有 diff 信息
$git commit-v
#使用一次新的 commit，替代上一次提交
#如果代码没有任何新变化，则用来改写上一次 commit 的提交信息
$git commit--amend-m[message]
#重做上一次 commit，并包括指定文件的新变化
$git commit--amend[file1][file2]...
```

### 5、分支

```shell
#列出所有本地分支
$git branch
#列出所有远程分支
$git branch-r
#列出所有本地分支和远程分支
$git branch-a
#新建一个分支，但依然停留在当前分支
$git branch[branch-name]
#新建一个分支，并切换到该分支
$git checkout-b[branch]
#新建一个分支，指向指定 commit
$git branch[branch][commit]
#新建一个分支，与指定的远程分支建立追踪关系
$git branch--track[branch][remote-branch]
#切换到指定分支，并更新工作区
$git checkout[branch-name]
#切换到上一个分支
$git checkout-
#建立追踪关系，在现有分支与指定的远程分支之间
$git branch--set-upstream[branch][remote-branch]
#合并指定分支到当前分支
$git merge[branch]
#选择一个 commit，合并进当前分支
$git cherry-pick[commit]
#删除分支
$git branch-d[branch-name]
#删除远程分支
$git push origin--delete[branch-name]
$git branch-dr[remote/branch]
```

### 6、标签

```shell
#列出所有 tag
$git tag
#新建一个 tag 在当前 commit
$git tag[tag]
#新建一个 tag 在指定 commit
$git tag[tag][commit]
#删除本地 tag
$git tag-d[tag]
#删除远程 tag
$git push origin:refs/tags/[tagName]
#查看 tag 信息
$git show[tag]
#提交指定 tag
$git push[remote][tag]
#提交所有 tag
$git push[remote]--tags
#新建一个分支，指向某个 tag
$git checkout-b[branch][tag]
```

### 7、查看信息

```shell
#显示有变更的文件
$git status
#显示当前分支的版本历史
$git log
#显示 commit 历史，以及每次 commit 发生变更的文件
$git log--stat
#搜索提交历史，根据关键词
$git log-S[keyword]
#显示某个 commit 之后的所有变动，每个 commit 占据一行
$git log[tag]HEAD--pretty=format:%s
#显示某个 commit 之后的所有变动，其"提交说明"必须符合搜索条件
$git log[tag]HEAD--grep feature
#显示某个文件的版本历史，包括文件改名
$git log--follow[file]
$git whatchanged[file]
#显示指定文件相关的每一次 diff
$git log-p[file]
#显示过去 5 次提交
$git log-5--pretty--oneline
#显示所有提交过的用户，按提交次数排序
$git shortlog-sn
#显示指定文件是什么人在什么时间修改过
$git blame[file]
#显示暂存区和工作区的差异
$git diff
#显示暂存区和上一个 commit 的差异
$git diff--cached[file]
#显示工作区与当前分支最新 commit 之间的差异
$git diff HEAD
#显示两次提交之间的差异
$git diff[first-branch]...[second-branch]
#显示今天你写了多少行代码
$git diff--shortstat" {0 day ago}"
#显示某次提交的元数据和内容变化
$git show[commit]
#显示某次提交发生变化的文件
$git show--name-only[commit]
#显示某次提交时，某个文件的内容
$git show[commit]:[filename]
#显示当前分支的最近几次提交
$git reflog
```

### 8、远程同步

```shell
#下载远程仓库的所有变动
$git fetch[remote]
#显示所有远程仓库
$git remote-v
#显示某个远程仓库的信息
$git remote show[remote]
#增加一个新的远程仓库，并命名
$git remote add[shortname][url]
#取回远程仓库的变化，并与本地分支合并
$git pull[remote][branch]
#上传本地指定分支到远程仓库
$git push[remote][branch]
#强行推送当前分支到远程仓库，即使有冲突
$git push[remote]--force
#推送所有分支到远程仓库
$git push[remote]--all
```

### 9、撤销

```shell
#恢复暂存区的指定文件到工作区
$git checkout[file]
#恢复某个 commit 的指定文件到暂存区和工作区
$git checkout[commit][file]
#恢复暂存区的所有文件到工作区
$git checkout.
#重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变
$git reset[file]
#重置暂存区与工作区，与上一次 commit 保持一致
$git reset--hard
#重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变
$git reset[commit]
#重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致
$git reset--hard[commit]
#重置当前 HEAD 为指定 commit，但保持暂存区和工作区不变
$git reset--keep[commit]
#新建一个 commit，用来撤销指定 commit
#后者的所有变化都将被前者抵消，并且应用到当前分支
$git revert[commit]
#暂时将未提交的变化移除，稍后再移入
$git stash
$git stash pop
```

### 10、其他

```shell
#生成一个可供发布的压缩包
$git archive
#参考网址
#git 大全
https://gitee.com/all-about-git
#深入浅出 git 教程
https://www.cnblogs.com/syp172654682/p/7689328.html
#阮一峰 git 教程
https://www.liaoxuefeng.com/wiki/896043488029600
#idea 中.ignore 忽略提交文件到 Git 的使用
https://blog.csdn.net/byy8023/article/details/82259155?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase
```

## git 提交规范

### 2.1 提交格式

符合规范的 Commit Message 的提交格式如下，包含了页眉（header）、正文（body）和页脚（footer）三部分。其中，header 是必须的，body 和 footer 可以忽略。

```js
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

### 2.2 页眉设置

页眉（header）通常只有一行，包括了提交类型（type）、作用域（scope）和主题（subject）。其中，type 和 subject 是必须的，scope 是可选的。

### 2.2.1 提交类型

提交类型（type）用于说明此次提交的类型，需要指定为下面其中一个：

- 💥 feat(模块): 添加了个很棒的功能
- 🐛 fix(模块): 修复了一些 bug
- 📝 docs(模块): 更新了一下文档
- 🌷 UI(模块): 修改了一下样式
- 🏰 chore(模块): 对脚手架做了些更改
- 🌐 locale(模块): 为国际化做了微小的贡献
- refactor：重构代码，没有新增功能或修复错误
- perf：提高代码性能
- workflow：改进工作流程
- build：修改构建系统
- CI：修改持续集成流程
- typos：修正拼写错误
- tests：新增或修改测试代码
- types：对类型系统进行修改
- wip：正在进行的工作
- release：发布新版本
- dep：更新依赖

### 2.2.2 作用域

作用域（scope）表示此次提交影响的范围。比如可以取值 api，表明只影响了接口。

### 2.2.3 主题

主题（subject）描述是简短的一句话，简单说明此次提交的内容。

### 2.3 正文和页脚

正文（body）和页眉（footer）这两部分不是必须的。

### 3 commit message template

为了规范 commit 信息，可以配置一个全局的 commit message template ,所有提交的 commit message

都按照这个配置来写

首先新建模板文件:

在任意目录下新建.getmessage.txt ，填入以下模板

```shell
# 类型字段包含:
# feat：新功能（feature）
# fix：修复 bug
# doc：文档（documentation）
# style： 格式化 ESLint 调整等（不影响代码运行的变动）
# refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
# test：增加测试
# build: 影响构建系统或外部依赖项的更改(maven,gradle,npm 等等)
# ci: 对 CI 配置文件和脚本的更改
# chore：对非 src 和 test 目录的修改
# revert: Revert a commit
# 影响范围：
# 用于说明 commit 影响的范围，比如修改的登录页、账户中心页等
# 主题：
# commit 目的的简短描述，不超过 50 个字符
# Body 部分是对本次 commit 的详细描述，可以分成多行
# Footer 用来关闭 Issue 或以 BREAKING CHANGE 开头，后面是对变动的描述、
# 以及变动理由和迁移方法
```

## 4. vscode 可视化提交工具

除了使用 Commitizen 信息交互工具来帮助我们规范 Commit Message 之外，我们也可以使用编译器自带的可视化提交工具。接下来，将会介绍 VSCode 可视化提交工具的使用方法。

在 `VSCode` 的 EXTENSIONS 中找到 `git-commit-plugin` 插件，点击 install 进行安装。

安装完成之后，可以通过 git add 添加要提交的文件，接着，在 Source Control 点击 show git commit template 图标，开始编写 Commit Message 信息。

接下来只需要按照指引进行 Commit Message 的编写。

当编写完成之后，可以得到符合规范的 Commit Message，这个时候就可以放心将 Commit Message 及所修改的文件进行提交啦。
