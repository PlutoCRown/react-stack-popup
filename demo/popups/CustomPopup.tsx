import React from "react";
import { stackRouter } from "../stackRouter";

type Props = {};

export const CustomPopup: React.FC<Props> = ({}) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#f6f6f6",
      }}
    >
      <div
        style={{
          height: 48,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
          flexShrink: 0,
        }}
      >
        <div
          onClick={() => stackRouter.close()}
          style={{
            width: 32,
            height: 32,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 0,
          }}
        >
          <img
            src="https://placehold.co/300x400?text=Click+Me!"
            alt="Click Me"
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ padding: "16px 20px 32px" }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            sollicitudin, urna non luctus congue, dolor neque gravida nisl, eget
            consequat sem erat at ipsum. Curabitur non erat a augue dignissim
            suscipit. Proin volutpat sem sit amet mi tempor, in posuere nisi
            consectetur. Sed id purus viverra, malesuada urna in, fermentum
            orci.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            aliquet ligula eu diam elementum, ac tristique mi tempus. Mauris
            vulputate, ligula at pellentesque ultricies, ex tellus luctus ipsum,
            non faucibus turpis mi at sapien. Donec et nibh non risus luctus
            mollis. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            consectetur, nulla a gravida ultrices, magna orci volutpat arcu, nec
            ultrices eros augue ac metus. Donec euismod, mi sed luctus dapibus,
            felis sem pharetra dolor, vitae facilisis urna erat vitae urna.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            hendrerit, justo vitae venenatis ullamcorper, ligula nunc placerat
            justo, sed convallis lacus purus vel eros. Duis consequat, leo non
            luctus ultrices, metus justo mattis erat, a bibendum lacus lorem sed
            enim.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
