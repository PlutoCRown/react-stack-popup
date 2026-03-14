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

// Lazy import demo components
const NonePopup = lazy(() => import("./popups/NonePopup"));
const MaskPopup = lazy(() => import("./popups/MaskPopup"));
const BottomSheetPopup = lazy(() => import("./popups/BottomSheetPopup"));
const CustomPopup = lazy(() => import("./popups/CustomPopup"));
const PagePopup = lazy(() => import("./popups/PagePopup"));

// Register popups
const popups = [
  RegisterPopup({ id: PopupID.NONE, content: NonePopup, wrapper: NoneWrapper }),
  RegisterPopup({ id: PopupID.PAGE, content: PagePopup, wrapper: PageWrapper }),
  RegisterPopup({
    id: PopupID.MASK,
    content: MaskPopup,
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
    wrapper: (props: WrapperBaseProps & { backgroundColor?: string }) => (
      <button
        type="button"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
          animation: "pulse 1s ease",
          border: "none",
          padding: 0,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && props?.onClose) {
            props.onClose();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && props?.onClose) {
            props.onClose();
          }
        }}
      >
        <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `}</style>
        <div
          style={{
            backgroundColor: props?.backgroundColor || "#667eea",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          {props.children}
        </div>
      </button>
    ),
    wrapperProps: { backgroundColor: "#667eea" },
  }),
] as const;

export const stackRouter = new StackRouter(popups, {
  urlManage: true,
  freeze: true,
  suspense: true,
  errorBoundary: true,
});
