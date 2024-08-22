# css

## css 换行

CSS 中用来控制换行的属性有很多，包括：

- `white-space`：控制空白符的处理方式，常用的值有 normal、pre 和 nowrap。

- `word-wrap` 和 `overflow-wrap`：控制单词的换行方式，常用的值有 normal 和 break-word。

- `word-break`：控制单词的换行方式，常用的值有 normal 和 break-all。

- `line-break`：控制文本内部的换行方式，常用的值有 auto、loose、normal 和 strict。

- `text-wrap`：控制文本是否允许换行，常用的值有 none 和 normal。

## 适配

```less
/* 
1920px = 100vw
19.2px = 1vw
100px = 0.520833333vw  // 100 / 19.2
*/
html {
  font-size: 5.20833333333vw;
}
```

## font-family css 字体

```css

```

## scrollbar

```less
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
:hover::-webkit-scrollbar-thumb {
  background: hsla(217, 8%, 55%, 0.5);
}
::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  border-radius: 4px;
}
```

## css 函数

### clamp()

clamp() 函数的作用是把一个值限制在一个上限和下限之间，当这个值超过最小值和最大值的范围时，在最小值和最大值之间选择一个值使用。它接收三个参数：最小值、首选值、最大值。

clamp(MIN, VAL, MAX) 其实就是表示 max(MIN, min(VAL, MAX))

### color-mix()

## css 数据类型

### \<percentage\>
