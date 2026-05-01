<h1 align="center">react-stack-popup</h1>

<p align="center">
  Strongly typed popup orchestration for React.
</p>

<p align="center">
  <a href="./docs/guides/index.md">Documentation</a>
  ·
  <a href="https://deepwiki.com/PlutoCRown/react-stack-popup">DeepWiki</a>
  ·
  <a href="https://github.com/PlutoCRown/react-stack-popup">GitHub</a>
</p>

---

`react-stack-popup` is a command-driven popup stack for React. It keeps popup registration, lifecycle handling, wrapper composition, URL history, and lock control in one system, with strong TypeScript inference across the whole API surface.

## Installation

```bash
npm install react-stack-popup
```

Import the stylesheet:

```bash
import "react-stack-popup/style.css";
```

## Documentation

See the full docs at [`docs/guides`](./docs/guides/index.md).

## Core value

| Area | What you get |
| --- | --- |
| Command API | `StackRouter.open` and `close` for direct popup control |
| Type safety | Popup IDs, content props, wrapper props, and stack state are inferred |
| Runtime model | Multi-layer stack, lifecycle channels, and current-layer context |
| Performance | Freeze inactive layers, cap render distance, and reduce motion |
| Reliability | Suspense, error boundaries, lock sequencing, and close guards |

## Where it fits

| Scenario | Fit |
| --- | --- |
| H5 app-like navigation | Popup flows that behave like native screens |
| URL-aware flows | Browser-return coordination and deep-link friendly popup state |
| WebView embedding | Popup orchestration inside host app containers |

## Contributing

This repository is maintained as a library-first project. Typical contributions include:

- documentation improvements
- bug fixes
- wrapper or lifecycle refinements
- demo coverage for new behaviors

Before sending changes, run:

- `bun run build`
- `bun run pack:check`
- `bun run lint`

## License

MIT
