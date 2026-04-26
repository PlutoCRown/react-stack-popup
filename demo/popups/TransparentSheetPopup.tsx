export default function TransparentSheetPopup() {
  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        gap: 0,
        color: "#241b17",
      }}
    >
      <section
        style={{
          position: "relative",
          minHeight: 188,
          padding: "32px 24px 72px",
          color: "#fff7f0",
          background:
            "radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.22), transparent 30%), radial-gradient(circle at 82% 18%, rgba(255, 243, 216, 0.18), transparent 24%), linear-gradient(135deg, #20120f 0%, #5c2518 48%, #d05b34 100%)",
          clipPath:
            "polygon(0px 18%, 9% 10%, 19% 16%, 34% 2%, 48% 12%, 61% 0px, 75% 14%, 89% 7%, 100% 18%, 100% 100%, 0px 100%)",
        }}
      >
        <h2
          style={{ marginTop: 14, fontSize: 28, lineHeight: 1.05, }}
        >
          透明背景
        </h2>
        <p
          style={{ marginTop: 10, maxWidth: "22rem", color: "rgba(255, 247, 240, 0.84)", lineHeight: 1.55, }}
        >
          让 Sheet 的头顶不必是矩形
        </p>
      </section>
    </div>
  );
}
