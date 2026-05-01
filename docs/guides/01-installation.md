---
title: 安装说明
description: 安装 react-stack-popup 并完成基础入口配置。
---

# 安装说明

安装包：

::: code-group

```bash [npm]
npm install react-stack-popup
```

```bash [pnpm]
pnpm add react-stack-popup
```

```bash [yarn]
yarn add react-stack-popup
```

```bash [bun]
bun add react-stack-popup
```

:::

`react` 和 `react-dom` 是 peer dependencies，需要由业务项目自己安装。当前包声明支持 React 18 及以上版本：

```json
{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

在应用入口引入样式：

```tsx
import "react-stack-popup/style.css";
```

如果使用 TypeScript，不需要额外安装类型包。库本身发布 `dist/types/index.d.ts`。

## 推荐入口结构

通常建议把弹窗注册和 `StackRouter` 实例放在单独文件中，例如 `stackRouter.tsx`：

```tsx
import {
  MaskWrapper,
  RegisterPopup,
  StackRouter,
} from "react-stack-popup";
import { ConfirmPopup } from "./popups/ConfirmPopup";

const popups = [
  RegisterPopup("confirm", ConfirmPopup, MaskWrapper),
] as const;

export const stackRouter = new StackRouter(popups);
```

然后在应用根组件渲染 `PopupRenderer`：

```tsx
import { PopupRenderer } from "react-stack-popup";
import { stackRouter } from "./stackRouter";

export function App() {
  return <PopupRenderer stackRouter={stackRouter} />;
}
```

`StackRouter` 不应该在每次 render 中重新创建。它保存弹窗栈状态、注册配置、锁和 URL 管理器，应该作为稳定实例存在。
