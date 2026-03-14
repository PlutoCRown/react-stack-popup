import "./App.css";
import { PopupRenderer } from "../src";
import { PopupID, stackRouter } from "./stackRouter";

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
        <section className="card controls">
          <div className="card-header">
            <h2>Wrapper Types</h2>
            <span className="subtle">Pick a wrapper to open</span>
          </div>
          <div className="button-group">
            <button
              type="button"
              onClick={() => stackRouter.open(PopupID.MASK, {})}
            >
              Mask Wrapper
            </button>
            <button
              type="button"
              onClick={() =>
                stackRouter.open(PopupID.BOTTOM_SHEET, {
                  title: "Bottom Sheet",
                  message: "Slides from the bottom with a clean sheet layout.",
                })
              }
            >
              Bottom Sheet
            </button>
            <button
              type="button"
              onClick={() => stackRouter.open(PopupID.PAGE, {})}
            >
              Page Wrapper
            </button>

            <button
              type="button"
              onClick={() => stackRouter.open(PopupID.NONE, {})}
            >
              None Wrapper
            </button>
            <button
              type="button"
              onClick={() => stackRouter.open(PopupID.CUSTOM, {})}
            >
              Custom Wrapper
            </button>
          </div>
        </section>

        <section className="card demo">
          <div className="card-header">
            <h2>Stack Operations</h2>
            <span className="subtle">Manage the popup stack</span>
          </div>
          <div className="button-group">
            <button type="button" onClick={() => stackRouter.close()}>
              Close Last Popup
            </button>
            <button
              type="button"
              onClick={() => stackRouter.close(PopupID.BOTTOM_SHEET)}
            >
              Close Bottom Sheet Only
            </button>
            <button type="button" onClick={() => openNestedPopup(0)}>
              Open Nested (Level 1)
            </button>
          </div>
        </section>

        <section className="card info">
          <div className="card-header">
            <h2>Quick Start</h2>
            <span className="subtle">The core API</span>
          </div>
          <div className="code-block">
            <code>stackRouter.open(id, args)</code>
            <code>stackRouter.close(id?)</code>
            <code>new StackRouter(popups, config)</code>
          </div>
          <ul className="feature-list">
            <li>Register popups with unique IDs</li>
            <li>Compose wrappers for animation + layout</li>
            <li>URL sync and stack-driven navigation</li>
          </ul>
        </section>
      </main>

      <PopupRenderer stackRouter={stackRouter} />
    </div>
  );
}

export default App;
