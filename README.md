# 这是什么
一个 堆叠路由栈的实现。
项目基建基于 vite 8 + oxlint 等较新技术栈
数据管理： zustand

# 实现了什么
1. 注册弹窗
cosnt popup = RegisterPopup({
    id: PopupID // enum
    content: (...T) => ReactNode
    wrapper: (preset) => ReactNode
})
2. 创建Router
const StackRouter = new StackRouter<PopupID>([popup,...] as const,{
    urlManage: boolean // 若开启。并且在StackRouter.open种传递url参数的话，会代理执行 history.pushState / history.back
})
> 注： 此前需要定义好全部PopupID

1. 打开和关闭
StackRouter.open(PopupID,T,config);
StackRouter.close(PopupID?);

# 项目包含
- StackRouter实现
- 4 种预设 Wrapper
  - NoneWrapper // 什么都没有
  - MaskWrapper // 仅透明背景。动画是透明度变化
  - BottomSheetWrapper // MaskWrapper的基础上
- demo演示
  - 每种预设 Wrapper 展示
  - 自定义 Wrapper 并透传动画参数实现动画
  - 演示无限嵌套的打开弹窗层。
- Utils 里面实现一个 LRU Map ，仅支持保存有限个key的map，不要问为什么
  