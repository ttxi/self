---
title: 开发技巧 (Skills)
---

本文档记录可复用的编码技巧与优化模式，便于在各类项目中统一实践与 Code Review 参考。会随使用持续补充。

---

## 1. 惰性函数 (Lazy Function)

### 是什么

**惰性函数**指：只在**第一次被调用时**做一次「重活」（如能力检测、环境判断、分支选择），并把结果**缓存**或**重写自身**，之后再次调用时直接走缓存或新逻辑，不再重复做检测或分支判断。

核心思想：**把只依赖运行环境、不会随参数变化的判断，从「每次调用都做」变成「只做一次」**。

### 适用场景

- **能力检测**：如 `typeof xxx === "function"`、`addEventListener` vs `attachEvent`，运行期内不变，只需检测一次。
- **环境/配置读取**：如 `process.env.XXX`、`window.xxx` 在应用生命周期内不变时，可惰性缓存。
- **根据首次调用的参数或返回值选定实现**：例如根据第一次拿到的 `Response.headers` 是否有 `forEach` 选定「拷贝 headers」的实现，后续请求复用同一实现。

### 典型写法

**方式一：缓存「能力」或引用，分支只走一次**

```javascript
let _getPropagationContext = undefined; // undefined = 未检测, null = 不存在, function = 可用

function getTraceId() {
  if (_getPropagationContext === undefined) {
    _getPropagationContext = typeof Sentry.getPropagationContext === "function"
      ? Sentry.getPropagationContext
      : null;
  }
  return _getPropagationContext ? _getPropagationContext()?.traceId : undefined;
}
```

**方式二：重写自身（第一次检测后替换成确定分支）**

```javascript
function addEvent(el, type, handler) {
  if (window.addEventListener) {
    addEvent = function (el, t, h) {
      el.addEventListener(t, h, false);
    };
  } else {
    addEvent = function (el, t, h) {
      el.attachEvent("on" + t, h);
    };
  }
  addEvent(el, type, handler);
}
```

### 注意

- 只对「与调用参数无关、只依赖环境/能力」的逻辑做惰性优化；若每次传入参数不同（如不同 user 的 avatar），用公共函数或普通缓存即可。
- 惰性后要保证线程/并发安全（若存在多线程）；前端单线程下通常无问题。

---

*（后续可在此追加更多技巧，如：提取公共工具函数、列表性能、状态结构设计等。）*
