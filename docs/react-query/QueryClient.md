# QueryClient

### QueryClient（查询客户端）

`QueryClient` 可用于与缓存交互：

```tsx
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

await queryClient.prefetchQuery({ queryKey: ["posts"], queryFn: fetchPosts });
```

### 可用方法

- **queryClient.fetchQuery**
- **queryClient.fetchInfiniteQuery**
- **queryClient.prefetchQuery**
- **queryClient.prefetchInfiniteQuery**
- **queryClient.getQueryData**
- **queryClient.ensureQueryData**
- **queryClient.ensureInfiniteQueryData**
- **queryClient.getQueriesData**
- **queryClient.setQueryData**
- **queryClient.getQueryState**
- **queryClient.setQueriesData**
- **queryClient.invalidateQueries**
- **queryClient.refetchQueries**
- **queryClient.cancelQueries**
- **queryClient.removeQueries**
- **queryClient.resetQueries**
- **queryClient.isFetching**
- **queryClient.isMutating**
- **queryClient.getDefaultOptions**
- **queryClient.setDefaultOptions**
- **queryClient.getQueryDefaults**
- **queryClient.setQueryDefaults**
- **queryClient.getMutationDefaults**
- **queryClient.setMutationDefaults**
- **queryClient.getQueryCache**
- **queryClient.getMutationCache**
- **queryClient.clear**
- **queryClient.resumePausedMutations**

---

### 配置项

- **queryCache**（可选）：关联的查询缓存。
- **mutationCache**（可选）：关联的变更缓存。
- **defaultOptions**（可选）：为所有查询和变更定义默认配置。

---

### 方法详细介绍

#### **queryClient.fetchQuery**

用于异步获取并缓存查询数据。返回数据或抛出错误。

```tsx
try {
  const data = await queryClient.fetchQuery({ queryKey, queryFn });
} catch (error) {
  console.log(error);
}
```

可通过 `staleTime` 配置，设置数据的失效时间：

```tsx
try {
  const data = await queryClient.fetchQuery({
    queryKey,
    queryFn,
    staleTime: 10000,
  });
} catch (error) {
  console.log(error);
}
```

**选项**：与 `useQuery` 的选项相同，但以下属性除外：  
`enabled`、`refetchInterval`、`refetchOnWindowFocus` 等。

**返回值**：  
`Promise<TData>`。

---

#### **queryClient.fetchInfiniteQuery**

用于异步获取并缓存分页查询数据。

```tsx
try {
  const data = await queryClient.fetchInfiniteQuery({ queryKey, queryFn });
  console.log(data.pages);
} catch (error) {
  console.log(error);
}
```

**选项**：与 `fetchQuery` 相同。

**返回值**：  
`Promise<InfiniteData<TData, TPageParam>>`。

---

#### **queryClient.prefetchQuery**

用于预取查询数据，仅执行获取操作，不返回数据或抛出错误。

```tsx
await queryClient.prefetchQuery({ queryKey, queryFn });
```

**选项**：与 `fetchQuery` 相同。

**返回值**：  
`Promise<void>`。

---

#### **queryClient.prefetchInfiniteQuery**

类似 `prefetchQuery`，但用于分页查询。

```tsx
await queryClient.prefetchInfiniteQuery({ queryKey, queryFn });
```

**返回值**：  
`Promise<void>`。

---

#### **queryClient.getQueryData**

同步获取缓存中的查询数据。

```tsx
const data = queryClient.getQueryData(queryKey);
```

**返回值**：  
`TQueryFnData | undefined`。

---

#### **queryClient.ensureQueryData**

确保返回查询数据，若数据不存在，则调用 `fetchQuery`。

```tsx
const data = await queryClient.ensureQueryData({ queryKey, queryFn });
```

**选项**：同 `fetchQuery`，另有 `revalidateIfStale` 选项（默认 `false`）。

**返回值**：  
`Promise<TData>`。

---

#### **queryClient.ensureInfiniteQueryData**

与 `ensureQueryData` 类似，但用于分页查询。

```tsx
const data = await queryClient.ensureInfiniteQueryData({
  queryKey,
  queryFn,
  initialPageParam,
  getNextPageParam,
});
```

---

#### **queryClient.getQueriesData**

获取多个查询的缓存数据。

```tsx
const data = queryClient.getQueriesData(filters);
```

**返回值**：  
`[queryKey: QueryKey, data: TQueryFnData | undefined][]`。

---

#### **queryClient.setQueryData**

同步更新缓存中的查询数据，若不存在则创建。

```tsx
queryClient.setQueryData(queryKey, updater);
```

**选项**：  
`updater` 可为直接值或函数。函数接收旧值并返回新值。

**注意**：需要以不可变的方式更新数据。

---

#### **queryClient.getQueryState**

同步获取查询的状态。

```tsx
const state = queryClient.getQueryState(queryKey);
```

---

#### **queryClient.setQueriesData**

用于批量更新多个查询的数据。

```tsx
queryClient.setQueriesData(filters, updater);
```

---

#### **queryClient.invalidateQueries**

使查询失效并触发重新获取数据。

```tsx
await queryClient.invalidateQueries({ queryKey: ["posts"], exact, refetchType: "active" });
```

**选项**：

- `refetchType`：控制是否以及哪些查询需要重新获取。

---

#### **queryClient.refetchQueries**

手动触发查询重新获取数据。

```tsx
await queryClient.refetchQueries({ queryKey: ["posts"], type: "active" });
```

---

#### **queryClient.cancelQueries**

取消正在进行的查询。

```tsx
await queryClient.cancelQueries({ queryKey: ["posts"], exact: true });
```

---

#### **queryClient.removeQueries**

移除缓存中的查询。

```tsx
queryClient.removeQueries({ queryKey, exact: true });
```

---

#### **queryClient.resetQueries**

重置查询至初始状态。

```tsx
queryClient.resetQueries({ queryKey, exact: true });
```

---

#### **queryClient.isFetching**

返回当前正在获取数据的查询数。

```tsx
if (queryClient.isFetching()) {
  console.log("At least one query is fetching!");
}
```

---

#### **queryClient.isMutating**

返回当前正在进行的变更数。

```tsx
if (queryClient.isMutating()) {
  console.log("At least one mutation is fetching!");
}
```

---

#### **queryClient.getDefaultOptions & setDefaultOptions**

获取或动态设置默认配置。

```tsx
queryClient.setDefaultOptions({
  queries: {
    staleTime: Infinity,
  },
});
```

---

#### **queryClient.getQueryDefaults & setQueryDefaults**

获取或设置特定查询的默认配置。

```tsx
queryClient.setQueryDefaults(["posts"], { queryFn: fetchPosts });
```

---

#### **queryClient.getMutationDefaults & setMutationDefaults**

获取或设置特定变更的默认配置。

```tsx
queryClient.setMutationDefaults(["addPost"], { mutationFn: addPost });
```

---

#### **queryClient.getQueryCache & getMutationCache**

获取查询或变更的缓存对象。

---

#### **queryClient.clear**

清除所有缓存。

```tsx
queryClient.clear();
```

---

#### **queryClient.resumePausedMutations**

恢复因网络问题暂停的变更。

```tsx
queryClient.resumePausedMutations();
```
