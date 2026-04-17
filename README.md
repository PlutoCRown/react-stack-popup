# react-stack-popup

一个面向移动端的轻量弹窗路由与堆叠系统。用“注册弹窗 + 栈式路由”的方式管理复杂流程，并通过可组合的 Wrapper 控制遮罩、动画与布局。

## 特性
- 类型安全的弹窗注册与调用
- 栈式路由管理，支持多层弹窗与回退
- 内置多种 Wrapper，可组合与可替换
- 适合移动端：遮罩、底部弹窗、触摸交互

## 安装
```bash
npm install react-stack-popup
```

```tsx
import "react-stack-popup/style.css";
```

`react` 和 `react-dom` 是 peer dependencies，需要由业务项目自己提供。

## 最小用法
```tsx
import {
  MaskWrapper,
  PopupRenderer,
  RegisterPopup,
  StackRouter,
} from "react-stack-popup";

type PopupId = "profile";

const ProfilePopup = ({ userId }: { userId: string }) => {
  return <div>User: {userId}</div>;
};

const popups = [
  RegisterPopup("profile" as PopupId, ProfilePopup, MaskWrapper),
] as const;

export const stackRouter = new StackRouter(popups, {
  urlManage: true,
});

export function App() {
  return (
    <>
      <button
        onClick={() => stackRouter.open("profile", { userId: "42" })}
      >
        Open popup
      </button>
      <PopupRenderer stackRouter={stackRouter} />
    </>
  );
}
```

## 内置 Wrapper
- `NoneWrapper`：不添加任何外层结构
- `MaskWrapper`：遮罩层与渐隐动画
- `SheetWrapper`：自适应高度 + 滑动关闭
- `PageWrapper`：页面级过渡动画
- `DrawerWrapper`：左右侧抽屉

## 仓库开发
```bash
bun install
bun run dev
```

构建 npm 包：
```bash
bun run build
```

构建 demo：
```bash
bun run build:demo
```

检查最终 npm 包内容：
```bash
bun run pack:check
```

## 发布物
- `dist/`：npm 包最小发布产物
- `dist-demo/`：demo 站点构建产物
- npm publish 仅包含 `dist`、`README.md`、`LICENSE`

## 许可
MIT
