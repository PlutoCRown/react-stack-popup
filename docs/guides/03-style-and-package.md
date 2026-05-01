---
title: 样式与发布物
description: CSS 引入方式、sideEffects 和发布产物说明。
---

# 样式与发布物

`react-stack-popup` 的样式通过子路径导出：

```tsx
import "react-stack-popup/style.css";
```

这个文件对应 npm 包里的 `dist/style.css`。包声明中包含：

```json
{
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./style.css": "./dist/style.css"
  },
  "sideEffects": [
    "./dist/*.css",
    "./dist/**/*.css"
  ]
}
```

`sideEffects` 会避免构建工具错误移除 CSS。

## 必须引入样式吗

使用内置 Wrapper 时必须引入样式，否则遮罩、定位、动画、底部面板、页面滑入、抽屉布局都可能表现异常。

如果完全使用自定义 Wrapper，并且不依赖内置 CSS，也可以不引入默认样式。但一般仍建议引入，因为 `PopupRenderer` 和 Wrapper 约定了一些基础 class。

## 发布物

库构建后主要发布：

- `dist/index.js`：ESM 入口
- `dist/index.cjs`：CommonJS 入口
- `dist/types/index.d.ts`：类型入口
- `dist/style.css`：样式入口

业务项目不应该直接引用 `dist` 内部路径，应通过包导出路径引用。
