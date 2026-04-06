[ ] 脱离 Zustand 依赖，无需那么重的状态管理

[ ] Wrapper 动画由 css 变量完全控制，无任何状态变更
  - 需要支持动画曲线自定义

[ ] 专注锁
  - 阻止退出 ✅
  - 阻止进入
  - Promise版API ✅

[ ] 测试
  - 冻结功能
  - 看看 wrapper 要不要支持 .config = { duration, animate-timing-function }

[ ] 更丰富的关闭方法封装
- 测 拒绝关闭的时候 History 有没有被推回
- 抽层的History问题修复
- closeLayer(2)
- closeImmidate()

[ ] Context
- 对本层的 onClose 操作 ✅
- 知道自己是否在弹窗中 ✅
- 方便对 visible 的一些状态读取，但是不要react state ✅
- 读到Router.config ✅

[ ] Ready for Prod
- npm
- useCase for human docs
- llm.txt