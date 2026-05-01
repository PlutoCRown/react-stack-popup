---
title: 防刷新与状态保留
description: 避免弹窗内部状态丢失和重复渲染的实践。
---

# 防刷新与状态保留

这里的“防刷新”主要指：

- 被覆盖的历史层不要重复渲染。
- 返回上一层时内部状态仍在。
- router 实例不要因组件 render 重建。
- 浏览器返回和关闭动作不要造成状态错乱。

## 保持 router 实例稳定

不要这样写：

```tsx
function App() {
  const router = new StackRouter(popups);
  return <PopupRenderer stackRouter={router} />;
}
```

每次 render 都会创建新 router，栈状态会丢失。

推荐模块级实例：

```tsx
export const stackRouter = new StackRouter(popups);
```

或者在组件内用稳定 memo：

```tsx
const router = React.useMemo(() => new StackRouter(popups), []);
```

## 保持 freeze 开启

```tsx
const stackRouter = new StackRouter(popups, {
  freeze: true,
});
```

被覆盖层会保留 DOM 和 React state，同时停止无意义更新。

## 谨慎设置 unloadDistance

```tsx
const stackRouter = new StackRouter(popups, {
  unloadDistance: 5,
});
```

如果用户可能回到很早的历史层，并且需要保留输入内容，就不要设置太小。

## 关键状态上提

这些状态不建议只存在弹窗内部：

- 未保存表单草稿
- 支付或提交状态
- 多步骤流程的最终数据
- 需要刷新恢复的数据

可以上提到：

- 业务 store
- URL 参数
- 服务端草稿
- 父级 React state

## 与 URL 管理配合

开启 `urlManage` 后，浏览器返回会触发关闭。关闭被锁拒绝时，浏览器历史恢复可能受浏览器限制。因此关键状态仍应独立保存，不能只依赖历史栈恢复。
