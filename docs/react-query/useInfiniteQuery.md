# useInfiniteQuery

## 代码示例

```tsx
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => firstPage.prevCursor,
});
```

---

## 参数解释

`useInfiniteQuery` 的选项与 `useQuery` 函数的选项基本一致，额外增加以下几个属性：

### `queryFn`

- 必填（除非已定义默认的查询函数 `defaultQueryFn`）。
- 用于请求数据的函数。
- 接收一个 `QueryFunctionContext` 对象作为参数。
- 必须返回一个 Promise，该 Promise 要么解析为数据，要么抛出错误。

### `initialPageParam`

- 必填。用于获取第一页数据时的默认分页参数。

### `getNextPageParam`

- 必填。定义如何获取下一页的分页参数。
- 参数：
  - `lastPage`: 当前数据的最后一页。
  - `allPages`: 所有已加载的页面数据。
  - `lastPageParam`: 当前页的分页参数。
  - `allPageParams`: 所有页的分页参数。
- 返回：
  - 用于下一页请求的参数，或 `undefined`/`null`（表示没有下一页）。

### `getPreviousPageParam`

- 定义如何获取上一页的分页参数。
- 参数与 `getNextPageParam` 相同。
- 返回：
  - 用于上一页请求的参数，或 `undefined`/`null`（表示没有上一页）。

### `maxPages`

- 指定存储在查询数据中的最大页数。
- 达到最大页数时，获取新页面会移除最前或最后一页（根据方向决定）。
- 如果未设置或等于 0，则页数不受限制（默认值为 `undefined`）。
- 如果设置 `maxPages > 0`，需要正确定义 `getNextPageParam` 和 `getPreviousPageParam`。

---

## `返回值`

`useInfiniteQuery` 的返回属性与 `useQuery` 基本相同，但增加了以下内容：

### `data.pages`

包含所有页面数据的数组。

### `data.pageParams`

包含所有页面参数的数组。

### `isFetchingNextPage`

如果正在获取下一页数据，则为 `true`。

### `isFetchingPreviousPage`

如果正在获取上一页数据，则为 `true`。

### `fetchNextPage`

用于获取下一页数据的函数。

- 参数：
  - `options.cancelRefetch`（布尔值，默认为 `true`）：
    - 如果为 `true`，每次调用都会执行新的 `queryFn` 请求，忽略之前未完成的请求。
    - 如果为 `false`，则在当前请求完成前重复调用不会产生效果。

### `fetchPreviousPage`

用于获取上一页数据的函数，参数与 `fetchNextPage` 相同。

### `hasNextPage`

如果有下一页数据可获取，则为 `true`。

### `hasPreviousPage`

如果有上一页数据可获取，则为 `true`。

### `isFetchNextPageError`

如果获取下一页失败，则为 `true`。

### `isFetchPreviousPageError`

如果获取上一页失败，则为 `true`。

### `isRefetching`

如果正在进行后台重新请求，则为 `true`。  
 此状态不包括初始请求、下一页或上一页的加载。

### `isRefetchError`

如果重新请求失败，则为 `true`。

### `promise`

一个稳定的 Promise，会解析为查询结果。

- 此功能需要启用 QueryClient 的 `experimental_prefetchInRender` 特性。

---

## 注意事项

1. **避免数据冲突**：  
   像 `fetchNextPage` 这样的命令式请求可能会干扰默认的重新请求行为，导致数据不一致。  
   请确保仅在用户操作时调用这些函数，或者添加条件（如 `hasNextPage && !isFetching`）。

2. **分页数据管理**：  
   当使用 `maxPages` 限制页数时，需小心处理数据丢弃（如限制方向或维护全局状态）。
