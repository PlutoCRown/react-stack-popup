import { lazy } from "react";
import { StackRouter } from "./store/StackRouter";
import { RegisterPopup } from "./store/popupRegistry";
import { PopupRenderer } from "./components/PopupRenderer";
import {
  MaskWrapper,
  BottomSheetWrapper,
  PageWrapper,
  NoneWrapper,
} from "./components/wrappers";
import "./App.css";

// Define popup IDs
enum PopupID {
  NONE = "none",
  MASK = "mask",
  BOTTOM_SHEET = "bottomSheet",
  CUSTOM = "custom",
  PAGE = "page",
}

// Lazy import demo components
const NonePopup = lazy(() => import("./demo/NonePopup"));
const MaskPopup = lazy(() => import("./demo/MaskPopup"));
const BottomSheetPopup = lazy(() => import("./demo/BottomSheetPopup"));
const CustomPopup = lazy(() => import("./demo/CustomPopup"));
const PagePopup = lazy(() => import("./demo/PagePopup"));

// Register popups
const popups = [
  RegisterPopup({
    id: PopupID.NONE,
    content: () => <NonePopup />,
    wrapper: NoneWrapper,
  }),
  RegisterPopup({
    id: PopupID.MASK,
    content: (onClose?: () => void) => <MaskPopup onClose={onClose} />,
    wrapper: MaskWrapper,
    wrapperProps: { maskClosable: true },
  }),
  RegisterPopup({
    id: PopupID.BOTTOM_SHEET,
    wrapper: BottomSheetWrapper,
    content: (title: string, message: string, onClose?: () => void) => (
      <BottomSheetPopup title={title} message={message} onClose={onClose} />
    ),
  }),
  RegisterPopup({
    id: PopupID.CUSTOM,
    content: () => <CustomPopup />,
    // 该示例是错误的
    wrapper: (
      preset,
      wrapperProps:
        | {
            backgroundColor?: string;
            onClose?: () => void;
            visible?: boolean;
            duration?: number;
          }
        | undefined,
    ) => (
      <button
        type="button"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
          animation: "pulse 1s ease",
          border: "none",
          padding: 0,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && wrapperProps?.onClose) {
            wrapperProps.onClose();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && wrapperProps?.onClose) {
            wrapperProps.onClose();
          }
        }}
      >
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
        <div
          style={{
            backgroundColor: wrapperProps?.backgroundColor || "#667eea",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          {preset}
        </div>
      </button>
    ),
    wrapperProps: { backgroundColor: "#667eea" },
  }),
  RegisterPopup({
    id: PopupID.PAGE,
    content: (onClose?: () => void) => <PagePopup onClose={onClose} />,
    wrapper: PageWrapper,
  }),
];

// Create stack router
const stackRouter = new StackRouter<PopupID, any[], any>(popups, {
  urlManage: true,
});

function App() {
  const openNestedPopup = (level: number) => {
    const colors = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#f39c12"];
    const color = colors[level % colors.length];
    stackRouter.open(PopupID.CUSTOM, [], {
      wrapperProps: { backgroundColor: color },
    });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>React Stack Popup Demo</h1>
        <p>A stack-based popup router implementation</p>
      </header>

      <main className="main">
        <section className="controls">
          <h2>Wrapper Types</h2>
          <div className="button-group">
            <button onClick={() => stackRouter.open(PopupID.NONE, [])}>
              None Wrapper
            </button>
            <button onClick={() => stackRouter.open(PopupID.MASK, [])}>
              Mask Wrapper
            </button>
            <button
              onClick={() =>
                stackRouter.open(PopupID.BOTTOM_SHEET, [
                  "Bottom Sheet Title",
                  "This is a bottom sheet popup",
                ])
              }
            >
              Bottom Sheet
            </button>
            <button onClick={() => stackRouter.open(PopupID.PAGE, [])}>
              Page Wrapper
            </button>
            <button onClick={() => stackRouter.open(PopupID.CUSTOM, [])}>
              Custom Wrapper
            </button>
          </div>
        </section>

        <section className="demo">
          <h2>Stack Operations</h2>
          <div className="button-group">
            <button type="button" onClick={() => stackRouter.close()}>
              Close Last Popup
            </button>
            <button onClick={() => stackRouter.close(PopupID.BOTTOM_SHEET)}>
              Close Bottom Sheet Only
            </button>
            <button type="button" onClick={() => openNestedPopup(0)}>
              Open Nested (Level 1)
            </button>
          </div>
        </section>

        <section className="info">
          <h2>How It Works</h2>
          <ul>
            <li>Register popups with unique IDs</li>
            <li>Create a StackRouter with your popups</li>
            <li>
              Open popups with <code>stackRouter.open(id, args)</code>
            </li>
            <li>
              Close popups with <code>stackRouter.close(id?)</code>
            </li>
            <li>The router maintains a stack of open popups</li>
          </ul>
        </section>
      </main>

      <PopupRenderer stackRouter={stackRouter} />
    </div>
  );
}

export default App;
