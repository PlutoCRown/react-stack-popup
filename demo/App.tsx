import "./App.css";
import { PopupRenderer } from "../src";
import { PopupID, stackRouter } from "./stackRouter";
import { QuickStartPanel } from "./components/QuickStartPanel";
import { StackPanel } from "./components/StackPanel";
import { WrapperPanel } from "./components/WrapperPanel";

function App() {
  const openNestedPopup = (level: number) => {
    const colors = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#f39c12"];
    const color = colors[level % colors.length];
    stackRouter.open(PopupID.CUSTOM, {
      wrapperProps: { backgroundColor: color },
    });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="badge">React Stack Popup</span>
          <h1>Popups that stack, animate, and route with confidence.</h1>
          <p>
            A minimal, type-safe popup router for React. Manage complex flows
            with a simple stack API and composable wrappers.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              onClick={() => stackRouter.open(PopupID.MASK, {})}
            >
              Launch Demo
            </button>
            <button
              type="button"
              className="ghost"
              onClick={() => stackRouter.open(PopupID.PAGE, {})}
            >
              Full Page
            </button>
          </div>
        </div>
        <div className="hero-panel">
          <div className="metric">
            <span className="metric-label">Wrappers</span>
            <span className="metric-value">4</span>
          </div>
          <div className="metric">
            <span className="metric-label">Routing</span>
            <span className="metric-value">URL</span>
          </div>
          <div className="metric">
            <span className="metric-label">Stacked</span>
            <span className="metric-value">Yes</span>
          </div>
        </div>
      </header>

      <main className="main">
        <WrapperPanel />
        <StackPanel openNestedPopup={openNestedPopup} />
        <QuickStartPanel />
      </main>

      <PopupRenderer stackRouter={stackRouter} />
    </div>
  );
}

export default App;
