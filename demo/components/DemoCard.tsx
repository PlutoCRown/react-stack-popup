import React from "react";
import { stackRouter } from "../stackRouter";

interface DemoCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  closeable?: boolean;
}

export function DemoCard({
  title,
  subtitle,
  children,
  closeable,
}: DemoCardProps) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        boxShadow: "0 18px 40px rgba(0,0,0,0.2)",
        padding: 24,
        width: "100%",
      }}
    >
      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ margin: 0, color: "#666" }}>{subtitle}</p>}
      </div>
      {children}
      {closeable && (
        <div style={{ marginTop: 16 }}>
          <button className="close-button" onClick={() => stackRouter.close()}>
            关闭
          </button>
        </div>
      )}
    </div>
  );
}
