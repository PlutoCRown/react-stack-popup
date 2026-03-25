## URL 管理与返回行为
当 `urlManage: true` 时，`StackRouter` 会把弹窗栈和浏览器 history 同步起来：

- `open()` 会调用 `history.pushState(...)`
- `close()` 会尝试回退一层 history
- 用户点击浏览器返回按钮时，会反向驱动弹窗关闭

这里有两条不同的触发路径：

1. 用户主动调用 `stackRouter.close()`
   `StackRouter.close -> HistoryManager.pop -> history.back -> popstate -> HistoryManager.handlePopState(忽略)`

2. 用户点击浏览器返回
   `popstate -> HistoryManager.handlePopState -> StackRouter.close -> HistoryManager.pop(跳过 history.back)`

为了避免这两条链路互相打架，`HistoryManager` 内部维护了两个状态：

- `suppressPop`
  表示下一次 `popstate` 是由代码主动调用 `history.back()` 触发的，需要吞掉，避免再次触发 `close()`

- `handlingPopState`
  表示当前正在处理浏览器发出的 `popstate` 回调；此时如果 `close()` 又走回 `HistoryManager.pop()`，就不应该再次调用 `history.back()`

这两个状态都封装在 `HistoryManager` 内部，对外部 API 没有额外要求，`StackRouter.close(id?)` 的调用方式保持不变。
