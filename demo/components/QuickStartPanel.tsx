export function QuickStartPanel() {
  return (
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
  );
}
