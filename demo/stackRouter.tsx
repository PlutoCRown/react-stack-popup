import { lazy } from "react";
import {
  NoneWrapper,
  MaskWrapper,
  BottomSheetWrapper,
  PageWrapper,
  RegisterPopup,
  StackRouter,
  WrapperBaseProps,
} from "../src";

// Define popup IDs
export enum PopupID {
  NONE = "none",
  MASK = "mask",
  BOTTOM_SHEET = "bottomSheet",
  CUSTOM = "custom",
  PAGE = "page",
}

// // Lazy import demo components
// const NonePopup = lazy(() => import("./popups/NonePopup"));
// const MaskPopup = lazy(() => import("./popups/MaskPopup"));
// const BottomSheetPopup = lazy(() => import("./popups/BottomSheetPopup"));
// const CustomPopup = lazy(() => import("./popups/CustomPopup"));
// const PagePopup = lazy(() => import("./popups/PagePopup"));

// import demo components
import NonePopup from "./popups/NonePopup";
import CommonPopup from "./popups/CommonPopup";
import BottomSheetPopup from "./popups/BottomSheetPopup";
import CustomPopup from "./popups/CustomPopup";
import PagePopup from "./popups/PagePopup";

// Register popups
const popups = [
  RegisterPopup({
    id: PopupID.NONE,
    content: CommonPopup,
    wrapper: NoneWrapper,
    wrapperProps: { duration: 0 },
  }),
  RegisterPopup({
    id: PopupID.PAGE,
    content: CommonPopup,
    wrapper: PageWrapper,
  }),
  RegisterPopup({
    id: PopupID.MASK,
    content: CommonPopup,
    wrapper: MaskWrapper,
    wrapperProps: { maskClosable: true },
  }),
  RegisterPopup({
    id: PopupID.BOTTOM_SHEET,
    content: BottomSheetPopup,
    wrapper: BottomSheetWrapper,
  }),
  RegisterPopup({
    id: PopupID.CUSTOM,
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
