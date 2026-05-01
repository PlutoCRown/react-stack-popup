---
title: 常见组合配方
description: 常见业务场景的推荐写法。
---

# 常见组合配方

## 确认框

```tsx
type ConfirmProps = {
  title: string;
  onConfirm: () => void;
};

function ConfirmPopup({ title, onConfirm }: ConfirmProps) {
  const stack = useStackState();
  if (!stack.inStack) return null;

  return (
    <div>
      <h3>{title}</h3>
      <button onClick={stack.onClose}>取消</button>
      <button onClick={onConfirm}>确定</button>
    </div>
  );
}

RegisterPopup("confirm", ConfirmPopup, MaskWrapper, {
  maskClosable: false,
});
```

## 底部操作面板

```tsx
RegisterPopup("actions", ActionsPopup, SheetWrapper, {
  fitContent: true,
  swipable: true,
});
```

## 全屏编辑页

```tsx
RegisterPopup("edit", EditPopup, PageWrapper);
```

```tsx
function EditPopup() {
  const stack = useInStackState();

  return (
    <main>
      <button onClick={stack.onClose}>返回</button>
      <form>{/* fields */}</form>
    </main>
  );
}
```

## 图片预览

```tsx
RegisterPopup("image-viewer", ImageViewer, NoneWrapper, {
  duration: 200,
});
```

`NoneWrapper` 不提供关闭按钮，内容需要自己处理。

## 动态内容弹窗

```tsx
type DynamicProps = {
  Component: React.ReactNode;
};

const DynamicPopup = ({ Component }: DynamicProps) => Component;

RegisterPopup("dynamic", DynamicPopup, MaskWrapper);
```

打开：

```tsx
stackRouter.open("dynamic", {
  Component: <CustomPanel />,
});
```

这种方式适合少量特殊场景。常规业务仍建议显式注册弹窗类型。

## 多层流程

```tsx
await stackRouter.open("step-1", {});
await stackRouter.open("step-2", {});
await stackRouter.open("step-3", {});
```

多层页面流程建议使用 `PageWrapper`，并开启：

```tsx
{
  freeze: true,
  unloadDistance: 5,
  urlManage: true
}
```
