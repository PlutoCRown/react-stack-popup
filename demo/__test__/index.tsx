import { lazy } from "react";
import {
  BottomSheetWrapper,
  MaskWrapper,
  RegisterPopup,
  StackRouter,
} from "../../src";

// Define popup IDs
export enum PopupID {
  BOTTOM_SHEET = "bottomSheet",
  MASK = "mask",
  NONE = "none",
}

const BottomSheetPopup = lazy(() => import("../popups/BottomSheetPopup"));
const MaskPopup = lazy(() => import("../popups/MaskPopup"));

// Register popups
const popups = [
  RegisterPopup({
    id: PopupID.BOTTOM_SHEET,
    content: BottomSheetPopup,
    wrapper: BottomSheetWrapper,
  }),
  RegisterPopup({
    id: PopupID.MASK,
    content: ({ onClose }: { onClose?: () => void }) => (
      <MaskPopup onClose={onClose} />
    ),
    wrapper: MaskWrapper,
  }),
] as const;

const stackRouter = new StackRouter(popups, {
  urlManage: true,
  freeze: true,
  suspense: true,
  errorBoundary: true,
});

// =============== TEST.1 基础功能类型 ===========
stackRouter.open(PopupID.BOTTOM_SHEET, {
  // @ts-expect-error ❌ 应该提醒 未知字段
  randomName: "",
});

// @ts-expect-error ❌ 应该提示缺少 message 字段
stackRouter.open(PopupID.BOTTOM_SHEET, {
  title: "",
});

// =============== TEST.2 参数传递校验 ===========
// // ✅ 第二个参数可不传
// stackRouter.open(PopupID.MASK);
// // @ts-expect-error ❌ 有参数的组件必须传
// stackRouter.open(PopupID.BOTTOM_SHEET);
// // ✅ 允许传第二个参数
// stackRouter.open(PopupID.MASK, {});

// =============== TEST.3 漏定义风险 ===========
export type MissPopup<T> = object extends T
  ? { isOk: true }
  : {
      ERROR: `定义了弹窗ID: ${Extract<keyof T, number | string>} 但是没有注册对应的组件！`;
    };

type MissRegister = Omit<Record<PopupID, any>, keyof typeof popups>;
// @ts-expect-error ❌ 检查有没有漏注册
type _ = MissPopup<MissRegister>["isOk"];
