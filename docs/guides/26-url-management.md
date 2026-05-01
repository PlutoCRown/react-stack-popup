---
title: URL 管理
description: urlManage、打开时传 URL 和浏览器返回行为。
---

# URL 管理

`StackRouter` 可以通过 History API 让浏览器返回键关闭弹窗。

```tsx
const stackRouter = new StackRouter(popups, {
  urlManage: true,
});
```

## 打开时同步 URL

```tsx
await stackRouter.open(
  "detail",
  { id: "42" },
  { url: "/detail/42" },
);
```

如果没有传 `url`，内部会使用当前 `window.location.href` 创建历史记录。

## 返回键行为

开启 `urlManage` 后：

1. `open` 时调用 `history.pushState`。
2. 用户点击浏览器返回。
3. `popstate` 触发。
4. router 调用 `close()` 关闭当前可见弹窗。

手动 `close()` 时也会尝试调用 `history.back()`，让 URL 和弹窗栈保持一致。

## 适合开启的场景

- 移动端页面级弹窗。
- 多层 PageWrapper 流程。
- 用户期望系统返回键关闭弹窗。
- 弹窗 URL 需要可分享或可追踪。

## 不建议开启的场景

- Toast、轻提示。
- 短暂确认框。
- 高频打开关闭的临时弹层。
- 已经由主路由系统完整管理的 modal route。

## 移动 Safari 策略

移动 Safari 对 History API 和手势返回更敏感。可以按环境关闭：

```tsx
const ua = navigator.userAgent;
const isMobileSafari =
  /Mobile Safari/.test(ua) && !/Chrome|CriOS|Chromium/.test(ua);

const stackRouter = new StackRouter(popups, {
  urlManage: !isMobileSafari,
});
```

## 与主路由的边界

`urlManage` 不是路由系统。它只负责弹窗栈与历史记录协作。页面匹配、数据加载、权限控制仍应交给主路由。
