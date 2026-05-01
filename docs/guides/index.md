---
title: 指南
description: react-stack-popup 的完整 VitePress 文档入口。
---

# react-stack-popup 指南

`react-stack-popup` 是一个面向 React 的弹窗路由与堆叠系统。它用“注册弹窗 + 栈式路由 + 可组合 Wrapper”的方式管理多层弹窗、移动端页面流、底部面板、抽屉、关闭确认和浏览器返回键。

这组文档覆盖当前包入口导出的 API：

- 核心：`RegisterPopup`、`StackRouter`、`PopupRenderer`
- Hooks：`useStackState`、`useInStackState`
- Wrapper：`NoneWrapper`、`MaskWrapper`、`SheetWrapper`、`PageWrapper`、`DrawerWrapper`、`useWrapperAnimation`
- 锁机制：`FocusLock`、`FocusLockState`
- 类型：`WrapperBaseProps`、`PopupConfig`、`StackRouterConfig`、`StackItem`、`StackContext` 等

## 1. 安装说明、DeepWiki、GitHub 链接

- [安装说明](./01-installation.md)
- [DeepWiki 与 GitHub](./02-links.md)
- [样式与发布物](./03-style-and-package.md)

## 2. 基本使用

- [核心概念](./04-core-concepts.md)
- [最小可用示例](./05-quick-start.md)
- [注册弹窗 RegisterPopup](./06-register-popup.md)
- [打开与关闭弹窗](./07-open-close.md)
- [渲染入口 PopupRenderer](./08-popup-renderer.md)
- [类型安全优势](./09-type-safety.md)
- [Wrapper 总览与选择](./10-wrapper-overview.md)
- [NoneWrapper](./11-none-wrapper.md)
- [MaskWrapper](./12-mask-wrapper.md)
- [SheetWrapper](./13-sheet-wrapper.md)
- [PageWrapper](./14-page-wrapper.md)
- [DrawerWrapper](./15-drawer-wrapper.md)
- [自定义 Wrapper](./16-custom-wrapper.md)

## 3. 高级用法

- [StackRouter 配置指南](./17-router-config.md)
- [Context 与状态读取](./18-context-state.md)
- [useWrapperAnimation](./19-use-wrapper-animation.md)
- [性能相关介绍](./20-performance.md)
- [防刷新与状态保留](./21-anti-refresh.md)
- [Suspense 与 ErrorBoundary](./22-suspense-error-boundary.md)

## 4. 锁功能和应用场景

- [FocusLock 总览](./23-focus-lock.md)
- [关闭确认与关闭守卫](./24-close-guard.md)
- [锁的应用场景](./25-lock-recipes.md)

## 5. URL 管理和已知问题

- [URL 管理](./26-url-management.md)
- [已知问题](./27-known-issues.md)

## API 参考与实践

- [类型 API 参考](./28-types-reference.md)
- [常见组合配方](./29-recipes.md)
- [调试与排查](./30-debugging.md)
