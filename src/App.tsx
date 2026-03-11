import "./App.css";
import { PopupRenderer } from "./components/PopupRenderer";
import { PopupID, stackRouter } from "./demo";

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
        <h1>React Stack Popup Demo</h1>
        <p>A stack-based popup router implementation</p>
      </header>

      <main className="main">
        <section className="controls">
          <h2>Wrapper Types</h2>
          <div className="button-group">
            <button onClick={() => stackRouter.open(PopupID.NONE, {})}>
              None Wrapper
            </button>
            <button onClick={() => stackRouter.open(PopupID.MASK, {})}>
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
            <button onClick={() => stackRouter.open(PopupID.PAGE, {})}>
              Page Wrapper
            </button>
            <button onClick={() => stackRouter.open(PopupID.CUSTOM, {})}>
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
