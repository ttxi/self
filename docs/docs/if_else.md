# 这么多 if，怎样干掉?

## 问题

```js
function getUserDescribe(name) {
  if (name === '小刘') {
    console.log('刘哥哥');
  } else if (name === '小红') {
    console.log('小红妹妹');
  } else if (name === '陈龙') {
    console.log('大师');
  } else if (name === '李龙') {
    console.log('师傅');
  } else if (name === '大鹏') {
    console.log('恶人');
  } else {
    console.log('此人比较神秘！');
  }
}
```

## 1.简单分支优化

```js
function getUserDescribe(name) {
  const describeForNameMap = {
    小刘: () => console.log('刘哥哥'),
    小红: () => console.log('小红妹妹'),
    陈龙: () => console.log('大师'),
    李龙: () => console.log('师傅'),
    大鹏: () => console.log('恶人'),
  };
  describeForNameMap[name]
    ? describeForNameMap[name]()
    : console.log('此人比较神秘！');
}
```

## 2.复杂分支优化

那如果我们的 if 分支中的判断条件不只是简单的相等判断，还具有一些需要计算的表达式时，我们该怎么办呢？（如下所示）

```js
function getUserDescribe(name) {
  if (name.length > 3) {
    console.log('名字太长');
  } else if (name.length < 2) {
    console.log('名字太短');
  } else if (name[0] === '陈') {
    console.log('小陈');
  } else if (name[0] === '李' && name !== '李鹏') {
    console.log('小李');
  } else if (name === '李鹏') {
    console.log('管理员');
  } else {
    console.log('此人比较神秘！');
  }
}
```

对于这种结构的代码就不能引入对象来进行分支优化了，我们可以引入二维数组来进行分支优化：

```js
function getUserDescribe(name) {
  const describeForNameMap = [
    [
      (name) => name.length > 3, // 判断条件
      () => console.log('名字太长'), // 执行函数
    ],
    [(name) => name.length < 2, () => console.log('名字太短')],
    [(name) => name[0] === '陈', () => console.log('小陈')],
    [(name) => name === '大鹏', () => console.log('管理员')],
    [(name) => name[0] === '李' && name !== '李鹏', () => console.log('小李')],
  ];
  // 获取符合条件的子数组
  const getDescribe = describeForNameMap.find((item) => item[0](name));
  // 子数组存在则运行子数组中的第二个元素（执行函数）
  getDescribe ? getDescribe[1]() : console.log('此人比较神秘！');
}
```

### 抽离分支

```js
const describeForNameMap = {
  小刘: () => console.log('刘哥哥'),
  小红: () => console.log('小红妹妹'),
  陈龙: () => console.log('大师'),
  李龙: () => console.log('师傅'),
  大鹏: () => console.log('恶人'),
};

function getUserDescribe(name) {
  describeForNameMap[name]
    ? describeForNameMap[name]()
    : console.log('此人比较神秘！');
}
```

```js
const describeForNameMap = [
  [
    (name) => name.length > 3, // 判断条件
    () => console.log('名字太长'), // 执行函数
  ],
  [(name) => name.length < 2, () => console.log('名字太短')],
  [(name) => name[0] === '陈', () => console.log('小陈')],
  [(name) => name === '大鹏', () => console.log('管理员')],
  [(name) => name[0] === '李' && name !== '李鹏', () => console.log('小李')],
];

function getUserDescribe(name) {
  // 获取符合条件的子数组
  const getDescribe = describeForNameMap.find((item) => item[0](name));
  // 子数组存在则运行子数组中的第二个元素（执行函数）
  getDescribe ? getDescribe[1]() : console.log('此人比较神秘！');
}
```

> > > 通过模块化的开发也可以将这个 map 对象写进一个单独的 js 文件，之后在需要使用的地方导入即可。

## 争议

这样一来整个 getUserDescribe 函数就变得非常简洁，有的同学可能会问这有什么用呢？这不是更加麻烦了吗？如果真的嫌 if else 不好看，那我就使用 if return 不用 else 就好了：

```js
function getUserDescribe(name) {
  if (name === '小刘') {
    console.log('刘哥哥');
    return;
  }
  if (name === '小红') {
    console.log('小红妹妹');
    return;
  }
  if (name === '陈龙') {
    console.log('大师');
    return;
  }
  if (name === '李龙') {
    console.log('师傅');
    return;
  }
  if (name === '大鹏') {
    console.log('恶人');
    return;
  }
  console.log('此人比较神秘！');
}
```

如果你不进行分支优化，getUserDescribe 函数就会被大量的 if 分支抢占空间，使得 getUserDescribe 函数的重点迷失（getUserDescribe 函数重点在于对判断结果的处理，而不在于这个结果是通过什么分支获取的），这时你再看一下我们优化后的代码：

```js
const describeForNameMap = [
  [(name) => name.length > 3, () => '名字太长'],
  [(name) => name.length < 2, () => '名字太短'],
  [(name) => name[0] === '陈', () => '小陈'],
  [(name) => name === '大鹏', () => '管理员'],
  [(name) => name[0] === '李' && name !== '李鹏', () => '小李'],
];

function getUserDescribe(name) {
  let str; // 存储判断结果
  const getDescribe = describeForNameMap.find((item) => item[0](name));
  if (getDescribe) {
    str = getDescribe[1]();
  } else {
    str = '此人比较神秘！';
  }
  // 对判断结果str的一些处理
  // ......
  console.log(str);
  return str;
}
```

## 结语

关于分支优化这个问题一直存在争议，目前存在两种观点：

- 观点 1：压根不需要多此一举去优化它，并且优化后的代码因为多创建了一个对象/数组，对对象/数组进行检索反而比单纯的 if else 还是废性能。
- 观点 2：分支优化后的代码可读性/可维护性更好，并且引入对象/数组所带来的性能问题在当今时代根本不值一提。
