---
title: DeepWiki 与 GitHub
description: react-stack-popup 的外部链接和源码入口。
---

# DeepWiki 与 GitHub

项目相关链接：

- DeepWiki：<https://deepwiki.com/PlutoCRown/react-stack-popup>
- GitHub：<https://github.com/PlutoCRown/react-stack-popup>

源码里的主要入口：

| 文件 | 说明 |
| --- | --- |
| `src/index.ts` | npm 包对外导出入口 |
| `src/store/StackRouter.ts` | 栈式路由核心实现 |
| `src/store/popupRegistry.ts` | `RegisterPopup` 实现 |
| `src/components/PopupRenderer.tsx` | 弹窗栈渲染入口 |
| `src/components/wrappers/` | 内置 Wrapper 与动画 Hook |
| `src/hooks/useStackState.ts` | 弹窗上下文 Hook |
| `src/store/FocusLock.ts` | 锁机制与关闭守卫 |
| `src/types.ts` | 对外类型定义 |

## 包入口导出范围

当前 npm 包入口从 `src/index.ts` 导出：

```ts
export * from "./components/PopupRenderer";
export * from "./components/wrappers";
export * from "./hooks/useStackState";
export * from "./store/StackRouter";
export * from "./store/FocusLock";
export * from "./store/popupRegistry";
export * from "./types";
```

文档默认只把这些入口视为稳定对外 API。源码中其他文件即使有 `export`，如果没有通过 `src/index.ts` 暴露，也不建议业务直接依赖。
