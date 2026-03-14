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

import NonePopup from "./popups/NonePopup";
import MaskPopup from "./popups/MaskPopup";
import BottomSheetPopup from "./popups/BottomSheetPopup";
import CustomPopup from "./popups/CustomPopup";
import PagePopup from "./popups/PagePopup";
import InfoPopup from "./popups/InfoPopup";
import ConfirmPopup from "./popups/ConfirmPopup";
import FormPopup from "./popups/FormPopup";

// Register popups
const popups = [
  RegisterPopup({
    id: PopupID.NONE,
    content: NonePopup,
    wrapper: NoneWrapper,
    wrapperProps: { duration: 0 },
  }),
  RegisterPopup({
    id: PopupID.PAGE,
    content: PagePopup,
    wrapper: PageWrapper,
  }),
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
    wrapperProps: { fitContent: true, swipable: true },
  }),
  RegisterPopup({
    id: PopupID.INFO,
    content: InfoPopup,
    wrapper: MaskWrapper,
    wrapperProps: { maskClosable: true },
  }),
  RegisterPopup({
    id: PopupID.CONFIRM,
    content: ConfirmPopup,
    wrapper: MaskWrapper,
    wrapperProps: { maskClosable: true },
  }),
  RegisterPopup({
    id: PopupID.FORM,
    content: FormPopup,
    wrapper: MaskWrapper,
    wrapperProps: { maskClosable: true },
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
