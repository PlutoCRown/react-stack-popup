import {
  NoneWrapper,
  MaskWrapper,
  BottomSheetWrapper,
  PageWrapper,
  RegisterPopup,
  StackRouter,
  WrapperBaseProps,
} from "../src";
import { PopupID } from "./constants/popupIds";

import RandomHeightPopup from "./popups/RandomHeightPopup";
import NormalPopup from "./popups/NormalPopup";
import CustomPopup from "./popups/CustomPopup";
import PagePopup from "./popups/PagePopup";
import PropsPopup from "./popups/PropsPopup";
import React from "react";
import LongContent from "./popups/LongContent";

// Register popups
const popups = [
  // 无包装弹窗
  RegisterPopup({
    id: PopupID.TestNoneWrap,
    content: NormalPopup,
    wrapper: NoneWrapper,
    wrapperProps: { duration: 0 },
  }),
  // 页包装
  RegisterPopup({
    id: PopupID.FullPage,
    content: PagePopup,
    wrapper: PageWrapper,
  }),
  // 背景包装
  RegisterPopup({
    id: PopupID.CenterPopup,
    content: NormalPopup,
    wrapper: MaskWrapper,
  }),
  // 底部表
  RegisterPopup({
    id: PopupID.BottomSheet,
    content: RandomHeightPopup,
    wrapper: BottomSheetWrapper,
    wrapperProps: { swipable: false },
  }),
  // 测试 Swipe
  RegisterPopup({
    id: PopupID.TestSwipable,
    content: PropsPopup,
    wrapper: BottomSheetWrapper,
  }),
  // 测试 FitContent
  RegisterPopup({
    id: PopupID.HighSheet,
    content: PropsPopup,
    wrapper: BottomSheetWrapper,
    wrapperProps: { fitContent: false },
  }),
  // 测试页滚动
  RegisterPopup({
    id: PopupID.ScrollPage,
    content: LongContent,
    wrapper: PageWrapper,
  }),
  // 测试底表滚动
  RegisterPopup({
    id: PopupID.ScrollSheet,
    content: LongContent,
    wrapper: BottomSheetWrapper,
  }),
  // 动态调用弹窗
  RegisterPopup({
    id: PopupID.Invoke,
    content: (({ Component }) => Component) as React.FC<{
      Component: React.ReactNode;
    }>,
    wrapper: MaskWrapper,
  }),
  RegisterPopup({
    id: PopupID.TestCustom,
    content: CustomPopup,
    // 该示例是错误的
    wrapper: ({
      backgroundColor,
      onClose,
      children,
    }: WrapperBaseProps & { backgroundColor?: string }) => (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
          animation: "pulse 1s ease",
          border: "none",
          padding: 0,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `}</style>
        <div
          style={{ backgroundColor, padding: 20, borderRadius: 12, margin: 20 }}
        >
          {children}
        </div>
      </div>
    ),
    wrapperProps: { backgroundColor: "#667eea", duration: 0 },
  }),
] as const;

export const stackRouter = new StackRouter(popups, { urlManage: false });
