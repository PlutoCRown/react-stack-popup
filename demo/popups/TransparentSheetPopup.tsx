export default function TransparentSheetPopup() {
  return (
    <div
      style={{
        padding: "18px 14px 18px",
      }}
    >
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
              "polygon(0 18%, 9% 10%, 19% 16%, 34% 2%, 48% 12%, 61% 0, 75% 14%, 89% 7%, 100% 18%, 100% 82%, 86% 89%, 75% 100%, 58% 94%, 44% 100%, 27% 91%, 13% 97%, 0 84%)",
            boxShadow: "0 24px 60px rgba(49, 18, 11, 0.28)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              width: "fit-content",
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(255, 247, 240, 0.14)",
              border: "1px solid rgba(255, 247, 240, 0.2)",
              backdropFilter: "blur(10px)",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Transparent Background
          </span>
          <h2
            style={{
              marginTop: 14,
              fontSize: 28,
              lineHeight: 1.05,
            }}
          >
            让 Sheet 的头顶不必是矩形
          </h2>
          <p
            style={{
              marginTop: 10,
              maxWidth: "22rem",
              color: "rgba(255, 247, 240, 0.84)",
              lineHeight: 1.55,
            }}
          >
            当前这层通过 `transparentBackground` 覆盖了 wrapper 内部的
            `--rsp-background`，所以你可以自己绘制顶部轮廓，而不是被默认底色填满。
          </p>
        </section>
      </div>
    </div>
  );
}
