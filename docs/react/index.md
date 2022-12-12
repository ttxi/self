---
nav:
  title: react
  order: 1
---

# react

```js
const babel = require('@babel/core');
const sourcecode = `
<h1>
hello<span style={{color:'red'}}>world</span>
</h1>
`;
const result = babel.transform(sourcecode, {
  plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic'/* classic */ }]],
});
```

## hook
### useLayoutEffect
useLayoutEffect：与useEffect基本一致，不同的地方时，useLayoutEffect是同步

要注意的是useLayoutEffect在 DOM 更新之后，浏览器绘制之前，这样做的好处是可以更加方便的修改 DOM，获取 DOM 信息,这样浏览器只会绘制一次，所以useLayoutEffect在useEffect之前执行

如果是useEffect的话 ，useEffect 执行在浏览器绘制视图之后，如果在此时改变DOM，有可能会导致浏览器再次回流和重绘。

除此之外useLayoutEffect的 callback 中代码执行会阻塞浏览器绘制

## React v18中的hooks
### useSyncExternalStore
### useTransition
### useDeferredValue
### useInsertionEffect
### useId