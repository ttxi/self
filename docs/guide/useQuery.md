这是对 `useQuery` hook 的文档的翻译，涵盖了其参数、返回值以及相关配置项。

---

### `useQuery` Hook 参数

#### 参数 1（选项对象）

- **queryKey**: `unknown[]`  
  **必选**  
  用于该查询的唯一标识。查询的键会被哈希成稳定的哈希值。更多信息见 [Query Keys](https://tanstack.com/query/v4/docs/reference/queryKey)。当该键改变时，查询会自动更新（前提是 `enabled` 不为 `false`）。

- **queryFn**: `(context: QueryFunctionContext) => Promise<TData>`  
  **必选**，但如果没有定义默认查询函数，则必须提供。  
  用于请求数据的函数。该函数接收一个 `QueryFunctionContext`，必须返回一个 `Promise`，成功时解析为数据，失败时抛出错误。数据不能是 `undefined`。

- **enabled**: `boolean | (query: Query) => boolean`  
  设置为 `false` 可以禁用该查询的自动执行。可以用于依赖查询。

- **networkMode**: `'online' | 'always' | 'offlineFirst'`  
  **可选**，默认为 `'online'`  
  指定网络模式。详细信息见 [Network Mode](https://tanstack.com/query/v4/docs/guides/network-mode)。

- **retry**: `boolean | number | (failureCount: number, error: TError) => boolean`  
  **可选**，默认为 `3`  
  如果设置为 `false`，查询失败时将不会自动重试。如果设置为 `true`，查询将无限重试。如果设置为一个数字（例如 `3`），则查询会在失败时重试指定次数。

- **retryOnMount**: `boolean`  
  **可选**，默认为 `true`  
  如果设置为 `false`，查询在挂载时不会重试，即使它包含错误。

- **retryDelay**: `number | (retryAttempt: number, error: TError) => number`  
  **可选**  
  指定每次重试的延迟，单位为毫秒。可以传入一个函数，根据重试次数动态计算延迟。

- **staleTime**: `number | ((query: Query) => number)`  
  **可选**，默认为 `0`  
  数据被视为“过时”的时间，单位为毫秒。如果设置为 `Infinity`，数据将永远不会被视为过时。

- **gcTime**: `number | Infinity`  
  **可选**，默认为 `5 * 60 * 1000`（5 分钟）  
  指定未使用或未激活的缓存数据在内存中的存活时间。如果设置为 `Infinity`，将禁用垃圾回收。

- **queryKeyHashFn**: `(queryKey: QueryKey) => string`  
  **可选**  
  如果提供，该函数将用于将 `queryKey` 转换为字符串。

- **refetchInterval**: `number | false | ((query: Query) => number | false | undefined)`  
  **可选**  
  如果设置为一个数字，查询将在指定的时间间隔内持续重新获取。如果设置为 `false`，则不会进行定期重新获取。如果设置为函数，该函数将返回一个数字，表示重新获取的间隔。

- **refetchIntervalInBackground**: `boolean`  
  **可选**  
  如果设置为 `true`，在查询持续重新获取时，即使页面在后台，查询也会继续进行重新获取。

- **refetchOnMount**: `boolean | "always" | ((query: Query) => boolean | "always")`  
  **可选**，默认为 `true`  
  如果设置为 `true`，查询将在挂载时进行重新获取（如果数据已经过时）。如果设置为 `false`，查询将不会在挂载时重新获取数据。

- **refetchOnWindowFocus**: `boolean | "always" | ((query: Query) => boolean | "always")`  
  **可选**，默认为 `true`  
  如果设置为 `true`，查询将在窗口聚焦时重新获取（如果数据过时）。如果设置为 `false`，查询将在窗口聚焦时不会重新获取。

- **refetchOnReconnect**: `boolean | "always" | ((query: Query) => boolean | "always")`  
  **可选**，默认为 `true`  
  如果设置为 `true`，查询将在重新连接时重新获取（如果数据过时）。如果设置为 `false`，查询将在重新连接时不会重新获取。

- **notifyOnChangeProps**: `string[] | "all" | (() => string[] | "all" | undefined)`  
  **可选**  
  如果设置，组件仅在列出的属性变化时重新渲染。例如，如果设置为 `['data', 'error']`，则组件仅在 `data` 或 `error` 属性变化时重新渲染。

- **select**: `(data: TData) => unknown`  
  **可选**  
  该函数用于选择或转换查询返回的数据。这个函数只会在数据变化时执行，或者当 `select` 函数本身发生变化时执行。

- **initialData**: `TData | () => TData`  
  **可选**  
  如果设置，该值将用作查询缓存的初始数据（前提是查询还没有创建或缓存）。如果设置为一个函数，该函数将在查询初始化时执行，返回初始数据。

- **initialDataUpdatedAt**: `number | (() => number | undefined)`  
  **可选**  
  如果设置，该值将表示初始数据最后一次更新的时间（单位为毫秒）。

- **placeholderData**: `TData | (previousValue: TData | undefined, previousQuery: Query | undefined) => TData`  
  **可选**  
  如果设置，该值将用作查询仍处于待定状态时的占位数据。

- **structuralSharing**: `boolean | (oldData: unknown | undefined, newData: unknown) => unknown`  
  **可选**，默认为 `true`  
  如果设置为 `false`，则查询结果之间不会共享结构。如果设置为函数，则可以自定义如何合并旧数据和新数据，以提高性能。

- **throwOnError**: `undefined | boolean | (error: TError, query: Query) => boolean`  
  **可选**  
  如果设置为 `true`，查询失败时会抛出错误并传递到最近的错误边界。如果设置为 `false`，则不会触发错误边界。

- **meta**: `Record<string, unknown>`  
  **可选**  
  如果设置，查询缓存项将存储额外的信息，这些信息可以根据需要使用。

#### 参数 2（QueryClient）

- **queryClient?**: `QueryClient`  
  **可选**  
  如果提供自定义的 `QueryClient`，则会使用该客户端。如果不提供，将使用最近上下文中的 `QueryClient`。

---

### 返回值

- **status**: `QueryStatus`  
  查询的当前状态，可能的值为：

  - `pending`：没有缓存数据且查询请求尚未完成。
  - `error`：查询请求失败。
  - `success`：查询请求成功，数据准备好可以显示。

- **isPending**: `boolean`  
  derived from `status`，表示查询是否处于挂起状态。

- **isSuccess**: `boolean`  
  derived from `status`，表示查询是否成功。

- **isError**: `boolean`  
  derived from `status`，表示查询是否失败。

- **isLoadingError**: `boolean`  
  如果查询在首次获取时失败，则为 `true`。

- **isRefetchError**: `boolean`  
  如果查询在重新获取时失败，则为 `true`。

- **data**: `TData`  
  查询成功时返回的数据。

- **dataUpdatedAt**: `number`  
  数据最后一次更新的时间戳。

- **error**: `null | TError`  
  如果查询失败，将包含错误对象。

- **errorUpdatedAt**: `number`  
  错误最后一次更新的时间戳。

- **isStale**: `boolean`  
  如果缓存中的数据无效或数据过期，则为 `true`。

- **isPlaceholderData**: `boolean`  
  如果当前显示的是占位数据，则为 `true`。

- **isFetched**: `boolean`  
  如果查询已被获取，则为 `true`。

- **isFetchedAfterMount**: `boolean`  
  如果查询在组件挂载后被获取，则为 `true`。

- **fetchStatus**: `FetchStatus`  
  查询的抓取状态，可能的值：

  - `fetching`: 查询正在进行。
  - `paused`: 查询暂停。
  - `idle`: 查询处于空闲状态。

- **isFetching**: `boolean`  
  derived from `fetchStatus`，查询是否正在进行中。

- **isPaused**: `boolean`  
  derived from `fetchStatus`，查询是否暂停。

- **isRefetching**: `boolean`  
  如果查询正在重新获取，则为 `true`。

- **isLoading**: `boolean`  
  如果查询的第一次请求正在进行中，则为 `true`。

- **failureCount**: `number`  
  查询失败的次数。

- **failureReason**: `null | TError`  
  查询失败的原因。

- **refetch**: `(options: { throwOnError: boolean, cancelRefetch: boolean }) => Promise<UseQueryResult>`  
  手动重新获取查询。

- **promise**: `Promise<TData>`  
  一个稳定的 `Promise`，它将解析查询的结果数据。

---

这个文档描述了 `useQuery` hook 的详细配置选项和返回值，涵盖了查询执行、缓存、错误处理和重新获取等多个方面。
