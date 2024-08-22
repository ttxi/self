# html 生命周期

- 当浏览器窗口`关闭`或者`刷新`时，会触发 `beforeunload` 事件

```js
window.addEventListener('beforeunload', (event) => {
  // event.preventDefault();
  // event.returnValue = '';
});
```

- 根据规范，要显示确认对话框，事件处理程序需要在事件上调用 `preventDefault()`。
- 事件使网页能够`触发一个确认对话框`，询问用户是否真的要离开该页面。如果用户确认，浏览器将导航到新页面，否则导航将会取消。
