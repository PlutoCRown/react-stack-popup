import "./App.css";
import { PopupRenderer } from "../src";
import { stackRouter } from "./stackRouter";
import { PopupID } from "./constants/popupIds";
import { QuickStartPanel } from "./components/QuickStartPanel";
import { WrapperPanel } from "./components/WrapperPanel";
import { SheetIntroPanel } from "./components/SheetIntroPanel";
import { ScrollCompatiblePanel } from "./components/ScrollCompatiblePanel";
import { OtherUseCasePanel } from "./components/OtherUseCasePanel";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="badge">REACT STACK POPUP</span>
          <h1>堆叠、动画、路由联动。</h1>
          <p>
            一个轻量、类型安全的 React 弹窗路由器。用简单的栈式接口和可组合
            包装器管理复杂流程。
          </p>
          <div className="hero-actions">
            <button
              type="button"
              onClick={() => stackRouter.open(PopupID.CenterPopup, {})}
            >
              打开演示
            </button>
            <button
              type="button"
              className="ghost"
              onClick={() =>
                stackRouter.open(
                  PopupID.FullPage,
                  {},
                  { url: "/react-stack-popup/cta" },
                )
              }
            >
              全屏页面
            </button>
          </div>
        </div>
        <div className="hero-panel">
          <div className="metric">
            <span className="metric-label">可组合包装器</span>
            <span className="metric-value">5 种</span>
          </div>
          <div className="metric">
            <span className="metric-label">路由联动</span>
            <span className="metric-value">URL 同步</span>
          </div>
          <div className="metric">
            <span className="metric-label">层间交互</span>
            <span className="metric-value">零刷新动画</span>
          </div>
        </div>
      </header>

      <main className="main">
        <WrapperPanel />
        <SheetIntroPanel />
        <ScrollCompatiblePanel />
        <OtherUseCasePanel />
        <QuickStartPanel />
      </main>

      <PopupRenderer stackRouter={stackRouter} />
    </div>
  );
}

export default App;
