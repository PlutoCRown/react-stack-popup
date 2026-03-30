export function QuickStartPanel() {
  return (
    <section className="card info">
      <div className="card-header">
        <h2>快速开始</h2>
        <span className="subtle">核心接口</span>
      </div>
      <div className="code-block">
        <code>{`// Define
const routes = [
  RegisterPopup("Name",()=> <Content/>, Wrapper)
]
// Create
const router = new StackRouter(popups, config)
// Open
router.open("Name",{})
// Close
router.close()
`}</code>
      </div>
      <ul className="feature-list">
        <li>为弹窗注册唯一 ID</li>
        <li>组合 wrapper 完成动画与布局</li>
        <li>支持 URL 同步与栈式导航</li>
      </ul>
    </section>
  );
}
