import { lazy } from "react";
import { BottomSheetWrapper } from "./components/wrappers";
import { RegisterPopup } from "./store/popupRegistry";
import { StackRouter } from "./store/StackRouter";

// Define popup IDs
export enum PopupID {
  BOTTOM_SHEET = "bottomSheet",
}

const BottomSheetPopup = lazy(() => import("./demo/BottomSheetPopup"));

// Register popups
const popups = [
  RegisterPopup({
    id: PopupID.BOTTOM_SHEET,
    content: BottomSheetPopup,
    wrapper: BottomSheetWrapper,
  }),
] as const;

export const stackRouter = new StackRouter(popups, {
  urlManage: true,
  freeze: true,
  suspense: true,
  errorBoundary: true,
});

stackRouter.open(PopupID.BOTTOM_SHEET, {
  // @ts-expect-error 应该提醒 未知字段
  randomName: "",
});

// @ts-expect-error 应该提示缺少 message 字段
stackRouter.open(PopupID.BOTTOM_SHEET, {
  title: "",
});
