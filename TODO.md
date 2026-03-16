[x] StackRouter 功能
[x] 内置 Wrapper 功能
[x] HistoryManager 功能 (未测试)
[x] 层间动画
[x] 滚动Demo

[ ] 自定义动画 Demo
[ ] 脱离 Zustand 依赖，无需那么重的状态管理

[ ] Wrapper 动画由 css 变量完全控制，无任何状态变更
  - 现在 duration 写死在 html 里面，应该每层单独控制
  - 需要支持动画曲线自定义

[ ] 专注锁
  - 阻止退出
  - 阻止进入
  - 忽略进入
  - 忽略退出
  - Promise版API

[ ] 测试
  - 冻结功能
  - 刷新问题
  - 修复 SheetWrapper 的 swipe 功能


[ ] Context 和 Channel 功能完善，弹窗内容能更好的知道自己的状态
  - visible 可以用 channel 实现，减少一次组件更新
  - 测试作为内容组件可以拿到什么信息
  - 看看 wrapper要不要支持 .config = { duration, animate-timing-function }

[ ] 额外配置
  - 懒卸载距离控制
  - Suspense Fallback
  - ErrorBoundary Fallback