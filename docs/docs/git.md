# GIT

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
