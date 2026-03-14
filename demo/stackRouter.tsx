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
  // 基础用法
  RegisterPopup(PopupID.TestNoneWrap, NormalPopup, NoneWrapper, {
    duration: 0,
  }),
  RegisterPopup(PopupID.FullPage, PagePopup, PageWrapper),
  RegisterPopup(PopupID.CenterPopup, NormalPopup, MaskWrapper),
  RegisterPopup(PopupID.BottomSheet, RandomHeightPopup, BottomSheetWrapper, {
    swipable: false,
  }),
  // BottomSheet
  RegisterPopup(PopupID.TestSwipable, PropsPopup, BottomSheetWrapper),
  RegisterPopup(PopupID.HighSheet, PropsPopup, BottomSheetWrapper, {
    fitContent: false,
  }),
  // 测试页滚动
  RegisterPopup(PopupID.ScrollPage, LongContent, PageWrapper),
  RegisterPopup(PopupID.ScrollSheet, LongContent, BottomSheetWrapper),
  // 特殊用法：动态调用弹窗
  RegisterPopup(
    PopupID.CustomContent,
    (({ Component }) => Component) as React.FC<{
      Component: React.ReactNode;
    }>,
    MaskWrapper,
  ),
  // 特殊用法：自定义包装层弹窗
  RegisterPopup(
    PopupID.CustomWrapper,
    CustomPopup,
    // 该示例是错误的
    ({
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
    { backgroundColor: "#667eea", duration: 0 },
  ),
] as const;

export const stackRouter = new StackRouter(popups, { urlManage: false });
