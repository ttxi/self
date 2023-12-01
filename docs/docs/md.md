# md 语法

## 标题

```html
# 一级标签 >
<h1>一级标签</h1>
```

## 链接

```html
### 行内式 [Windows/Mac/Linux 全平台客户端](https://www.zybuluo.com/cmd/)

<p><a href="https://www.zybuluo.com/cmd/">Windows/Mac/Linux 全平台客户端</a></p>
```

```html
###参数式 [Windows/Mac/Linux 全平台客户端](https://www.zybuluo.com/cmd/
'title属性')

<p>
  <a href="https://www.zybuluo.com/cmd/" title="title属性"
    >Windows/Mac/Linux 全平台客户端</a
  >
</p>
```

## 图片

```html
![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)

<p>
  <img
    src="https://www.zybuluo.com/static/img/logo.png"
    alt="cmd-markdown-logo"
    title=""
  />
</p>
```

## 文本样式

- `__字体加粗__` >>> **字体加粗**
- `~~字体删除~~` >> ~~字体删除~~
- `*字体倾斜*` >>> _字体倾斜_

> 符号与字体之间不要有空格

## 加强的代码块

支持四十一种编程语言的语法高亮的显示，行号显示。

## 表格

```txt
| 项目        | 价格    |  数量   |
| --------    | -----: | :----:  |
| 计算机      | \$1600  |   5    |
| 手机        |   \$12  |   12   |
| 管线        |    \$1  |   234  |

: 是对齐方向
```

| 项目   |   价格 | 数量 |
| ------ | -----: | :--: |
| 计算机 | \$1600 |  5   |
| 手机   |   \$12 |  12  |
| 管线   |    \$1 | 234  |

### 换行

```
类型 | 书籍
:---: | :---:
Android | 《第一行代码》 <br> 《Android 开发艺术探索》
Java | 《深入理解 Java 虚拟机》
```

|  类型   |                     书籍                     |
| :-----: | :------------------------------------------: |
| Android | 《第一行代码》 <br> 《Android 开发艺术探索》 |
|  Java   |           《深入理解 Java 虚拟机》           |
