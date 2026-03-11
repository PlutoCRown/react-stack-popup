# 参数传递流程说明

本文档详细说明 React Stack Popup 中参数在不同层级之间的传递流程和命名规范。

## 参数流向概览

```
RegisterPopup.wrapperProps (注册时)
         ↓
    合并 (Provider 侧)
         ↓
  stackRouter.open(id, args, { wrapperProps }) (调用时)
         ↓
    allProps = Object.assign({}, Register.wrapperProps, open.params)
         ↓
    Wrapper 层接收
         ↓
    Content 层接收 (通过 args)
```

## Provider 侧：参数合并

在 `PopupRenderer` 中，参数按以下优先级合并：

```typescript
// 1. 注册时的默认 wrapperProps
const defaultProps = popupConfig.wrapperProps;

// 2. 打开时传入的 wrapperProps (优先级更高)
const runtimeProps = stackItem.config?.wrapperProps;

// 3. 合并策略
const finalWrapperProps = Object.assign({}, defaultProps, runtimeProps);

// 4. 添加系统注入的参数
const allProps = {
  ...finalWrapperProps,
  visible: popupItem.visible,  // 系统控制的可见性
  onClose,                      // 系统提供的关闭函数
};
```

### 示例

```typescript
// 注册时
RegisterPopup({
  id: 'example',
  content: (message: string, onClose?: () => void) => <ExamplePopup message={message} />,
  wrapper: (preset, wrapperProps) => <MaskWrapper {...wrapperProps}>{preset}</MaskWrapper>,
  wrapperProps: {
    opacity: 0.5,
    maskClosable: true,
    duration: 300,
  }
});

// 调用时
stackRouter.open('example', ['Hello'], {
  wrapperProps: {
    opacity: 0.8,  // 覆盖注册时的 0.5
    // maskClosable 和 duration 继承注册时的值
  }
});

// 最终 Wrapper 收到的 props:
{
  opacity: 0.8,           // 来自 open 调用
  maskClosable: true,     // 来自 Register
  duration: 300,          // 来自 Register
  visible: true,          // 系统注入
  onClose: () => {...},   // 系统注入
}
```

## Consumer 侧：参数解构

### Wrapper 层

Wrapper 组件应该解构出自己需要的参数，并将剩余参数传递给子组件：

```typescript
export const MaskWrapper = ({
  children,
  opacity = 0.5,
  maskClosable = true,
  visible = true,
  duration = 300,
  onClose,
  ...restProps  // 其他未知参数
}: MaskWrapperProps) => {
  // Wrapper 使用自己的参数
  // restProps 可以选择性传递或忽略
};
```

### Content 层

Content 组件通过 `content` 函数的参数接收数据：

```typescript
RegisterPopup({
  content: (message: string, count: number, onClose?: () => void) => {
    // message, count 来自 stackRouter.open 的 args
    // onClose 由系统自动追加
    return <MyPopup message={message} count={count} onClose={onClose} />;
  }
});

// 调用
stackRouter.open('myPopup', ['Hello', 42]);
```

## 保留参数列表

以下参数由 Wrapper 层保留使用，**Content 层应避免使用相同的参数名**：

### 系统级保留参数（所有 Wrapper 通用）

| 参数名     | 类型         | 说明              | 来源          |
| ---------- | ------------ | ----------------- | ------------- |
| `visible`  | `boolean`    | 控制显示/隐藏状态 | 系统注入      |
| `onClose`  | `() => void` | 关闭当前 popup    | 系统注入      |
| `duration` | `number`     | 动画时长（毫秒）  | Register/Open |
| `children` | `ReactNode`  | 子内容            | 系统传递      |

### MaskWrapper 保留参数

| 参数名         | 类型      | 说明             |
| -------------- | --------- | ---------------- |
| `opacity`      | `number`  | 遮罩透明度 (0-1) |
| `maskClosable` | `boolean` | 点击遮罩是否关闭 |

### BottomSheetWrapper 保留参数

| 参数名      | 类型     | 说明              |
| ----------- | -------- | ----------------- |
| `maxHeight` | `string` | 最大高度 (CSS 值) |

### PageWrapper 保留参数

目前无额外保留参数，仅使用系统级参数。

### RegisterPopup 保留参数

| 参数名             | 类型        | 说明              |
| ------------------ | ----------- | ----------------- |
| `freeze`           | `boolean`   | 是否冻结背景交互  |
| `suspense`         | `boolean`   | 是否启用 Suspense |
| `errorBoundary`    | `boolean`   | 是否启用错误边界  |
| `suspenseFallback` | `ReactNode` | Suspense 加载组件 |
| `errorFallback`    | `ReactNode` | 错误显示组件      |

## 参数命名建议

### ✅ 推荐做法

1. **Content 层使用业务相关的参数名**
   ```typescript
   content: (title: string, message: string, data: any) => {...}
   ```

2. **避免使用保留参数名**
   ```typescript
   // ❌ 错误
   content: (visible: boolean, onClose: () => void) => {...}

   // ✅ 正确
   content: (isActive: boolean, handleDismiss: () => void) => {...}
   ```

3. **Wrapper Props 使用描述性前缀**
   ```typescript
   wrapperProps: {
     maskOpacity: 0.5,      // 而不是 opacity
     sheetMaxHeight: '80vh', // 而不是 maxHeight
   }
   ```

## 完整示例

```typescript
// 1. 注册 Popup
RegisterPopup({
  id: 'userProfile',
  content: (userId: string, onClose?: () => void) => (
    <UserProfile userId={userId} onDismiss={onClose} />
  ),
  wrapper: MaskWrapper,
  wrapperProps: {
    opacity: 0.6,
    maskClosable: true,
    duration: 300,
  },
});

// 2. 打开 Popup (使用默认配置)
stackRouter.open('userProfile', ['user123']);

// 3. 打开 Popup (覆盖部分配置)
stackRouter.open('userProfile', ['user456'], {
  wrapperProps: {
    opacity: 0.9,        // 覆盖默认的 0.6
    maskClosable: false, // 覆盖默认的 true
    // duration 继承默认的 300
  }
});

// 4. 参数流向
// Register.wrapperProps: { opacity: 0.6, maskClosable: true, duration: 300 }
//                  ↓
// open.params:           { opacity: 0.9, maskClosable: false }
//                  ↓
// allProps:              { opacity: 0.9, maskClosable: false, duration: 300, visible: true, onClose: fn }
//                  ↓
// MaskWrapper 接收:      { opacity: 0.9, maskClosable: false, duration: 300, visible: true, onClose: fn, children: <UserProfile /> }
//                  ↓
// UserProfile 接收:      userId='user456', onDismiss=fn
```

## 类型安全建议

为了确保类型安全，建议为每个 Popup 定义明确的类型：

```typescript
// 定义 Wrapper Props 类型
interface MyWrapperProps {
  opacity?: number;
  maskClosable?: boolean;
  duration?: number;
  visible?: boolean;
  onClose?: () => void;
}

// 定义 Content Args 类型
type MyContentArgs = [userId: string, onClose?: () => void];

// 注册时使用类型
RegisterPopup({
  id: 'myPopup',
  content: (userId, onClose) => <MyPopup userId={userId} onClose={onClose} />,
  wrapper: MaskWrapper,
  wrapperProps: {
    opacity: 0.5,
    maskClosable: true,
  }
});
```

## 总结

1. **参数合并**：`Object.assign({}, Register.wrapperProps, open.params, systemProps)`
2. **优先级**：`open.params` > `Register.wrapperProps` > 默认值
3. **系统注入**：`visible` 和 `onClose` 始终由系统提供
4. **命名规范**：Content 层避免使用 Wrapper 保留参数名
5. **类型安全**：使用 TypeScript 泛型确保参数类型正确
