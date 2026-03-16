# react-stack-popup

一个面向移动端的轻量弹窗路由与堆叠系统。用“注册弹窗 + 栈式路由”的方式管理复杂流程，并通过可组合的 Wrapper 控制遮罩、动画与布局。

## 特性
- 类型安全的弹窗注册与调用
- 栈式路由管理，支持多层弹窗与回退
- 内置多种 Wrapper，可组合与可替换
- 适合移动端：遮罩、底部弹窗、触摸交互
- demo 站点，展示多种用法

## 快速开始
安装依赖（项目使用 Bun）：
```bash
bun install
```

运行 demo：
```bash
bun run dev
```

构建 demo：
```bash
bun run build
```

## 核心用法
注册弹窗：
```ts
const popup = RegisterPopup({
  id: PopupID.Center,
  content: (props) => <MyPopup {...props} />,
  wrapper: (preset) => preset.Mask,
})
```

创建路由器：
```ts
const stackRouter = new StackRouter([popup], {
  urlManage: true,
})
```

打开/关闭：
```ts
stackRouter.open(PopupID.Center, { userId: "42" })
stackRouter.close(PopupID.Center)
```

## 目录结构
- `src/`：核心实现与内置 Wrapper
- `demo/`：演示站点
- `dist/`：构建产物

## 内置 Wrapper
- `NoneWrapper`：不添加任何外层结构
- `MaskWrapper`：遮罩层与渐隐动画
- `SheetWrapper`：自适应高度 + 滑动关闭
- `PageWrapper`：页面级过渡动画

## 适用场景
- 复杂流程的弹窗堆叠
- 移动端底部弹窗与遮罩交互
- 需要路由联动的弹窗导航

## 许可
MIT
