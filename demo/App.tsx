import "./App.css";
import { PopupRenderer } from "../src";
import { stackRouter } from "./stackRouter";
import { PopupID } from "./constants/popupIds";
import { QuickStartPanel } from "./components/QuickStartPanel";
import { StackPanel } from "./components/StackPanel";
import { WrapperPanel } from "./components/WrapperPanel";
import { BottomSheetIntroPanel } from "./components/BottomSheetIntroPanel";

function App() {
  const openNestedPopup = (level: number) => {
    const colors = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#f39c12"];
    const color = colors[level % colors.length];
    stackRouter.open(PopupID.TestCustom, {
      wrapperProps: { backgroundColor: color },
    });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="badge">弹窗栈</span>
          <h1>弹窗可以堆叠、动画、路由联动。</h1>
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
              onClick={() => stackRouter.open(PopupID.FullPage, {})}
            >
              全屏页面
            </button>
          </div>
        </div>
        <div className="hero-panel">
          <div className="metric">
            <span className="metric-label">包装器</span>
            <span className="metric-value">4</span>
          </div>
          <div className="metric">
            <span className="metric-label">路由</span>
            <span className="metric-value">地址</span>
          </div>
          <div className="metric">
            <span className="metric-label">堆叠</span>
            <span className="metric-value">支持</span>
          </div>
        </div>
      </header>

      <main className="main">
        <WrapperPanel />
        <BottomSheetIntroPanel />
        <StackPanel openNestedPopup={openNestedPopup} />
        <QuickStartPanel />
      </main>

      <PopupRenderer stackRouter={stackRouter} />
    </div>
  );
}

export default App;
