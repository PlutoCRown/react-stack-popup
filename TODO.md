[ ] 自定义动画 Demo
  [ ] ImageViewer
  [ ] DetailViewer
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

[ ] Context 和 Channel 功能完善，弹窗内容能更好的知道自己的状态
  - visible 可以用 channel 实现，减少一次组件更新
  - 看看 wrapper 要不要支持 .config = { duration, animate-timing-function }

[ ] 额外配置
  - Suspense Fallback
  - ErrorBoundary Fallback