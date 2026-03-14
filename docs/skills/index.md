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

## 2. 卫语句 / 提前 return (Guard Clauses)

### 是什么

**卫语句**：在函数开头用 `if` 处理异常分支或前置条件，直接 **return**（或 throw），主逻辑保持「无缩进」或少缩进，避免深层 `if-else` 嵌套。

核心思想：**先处理「不满足就退出」的情况，再写主流程，让主流程一眼能读完**。

### 适用场景

- 参数校验、权限/登录态检查、空值/空数组提前返回。
- 替代「嵌套 if-else」或「大段主逻辑包在 if 里」的写法。
- 任何「先判断再做事」的逻辑，优先考虑「先判断不行就 return」。

### 典型写法

```javascript
// ❌ 嵌套深，主逻辑被包在 if 里
function submit(data) {
  if (data) {
    if (data.userId) {
      if (isValid(data)) {
        return api.post("/submit", data);
      }
    }
  }
  return null;
}

// ✅ 卫语句：先排除非法情况，主逻辑一条线
function submit(data) {
  if (!data?.userId) return null;
  if (!isValid(data)) return null;
  return api.post("/submit", data);
}
```

### 注意

- 卫语句后不要再接 `else`，直接写「正常路径」即可。
- 若多种非法情况要返回不同错误信息，可保留多个 `if ... return`，或集中到一个「校验函数」里再 return。

---

## 3. 请求取消与竞态 (AbortController)

### 是什么

**竞态**：后发起的请求比先发起的请求更晚返回，若按返回顺序直接写状态，会把「旧结果」盖掉「新结果」（例如搜索框连续输入、Tab 切换加载不同列表）。

**做法**：用 **AbortController** 在发起新请求时取消上一次请求，或根据「请求版本/id」在回调里忽略过期结果。

### 适用场景

- 搜索框输入、筛选条件变化触发的列表/详情请求。
- Tab 或路由切换时，取消未完成的上一屏请求。
- 任何「同一数据源会连续请求多次、只关心最新一次」的异步场景。

### 典型写法

**方式一：AbortController 取消上一次请求**

```javascript
let controller = null;

async function search(keyword) {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;
  const res = await fetch(`/api/search?q=${keyword}`, { signal });
  const data = await res.json();
  setResults(data);
}
```

**方式二：React 里结合 useEffect 取消**

```javascript
useEffect(() => {
  const ctrl = new AbortController();
  fetchList(id, ctrl.signal).then(setList).catch(ignoreAbort);
  return () => ctrl.abort();
}, [id]);
```

### 注意

- `fetch` 被 abort 会抛 `DOMException`，在 catch 里可判断 `err.name === "AbortError"` 后忽略，避免当业务错误处理。
- 若用的是 axios，可用 `CancelToken` 或 axios 新版基于 AbortController 的 `signal`，同样在清理时 cancel。

---

## 4. 命名常量替代魔法值 (No Magic Numbers/Strings)

### 是什么

**魔法值**：在逻辑里直接写死的数字、字符串（如 `status === 1`、`type === "VIP"`），含义要靠注释或记忆才能懂。

**做法**：用有语义的**命名常量**（或枚举）集中定义，业务代码里只出现常量名，便于修改和搜索。

### 适用场景

- 状态码、类型码、枚举值（订单状态、用户类型、接口 code）。
- 配置类数字（超时时间、重试次数、分页 size）。
- 多处复用的同一字符串（事件名、localStorage key、API path 片段）。

### 典型写法

```javascript
// ❌ 魔法值
if (order.status === 2) { /* 发货中 */ }
setTimeout(fn, 3000);

// ✅ 命名常量
const OrderStatus = {
  PENDING: 0,
  PAID: 1,
  SHIPPING: 2,
  DONE: 3,
};
if (order.status === OrderStatus.SHIPPING) { /* 发货中 */ }

const TOAST_DURATION_MS = 3000;
setTimeout(fn, TOAST_DURATION_MS);
```

### 注意

- 常量可放在使用处同文件顶部、或统一放在 `constants` 模块，按业务域拆分（如 `orderConstants.js`）。
- 若用 TypeScript，可 `const enum` 或 `as const` 对象，既去魔法值又保留类型收窄。
