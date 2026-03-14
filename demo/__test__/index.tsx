import { lazy } from "react";
import {
  RegisterPopup,
  BottomSheetWrapper,
  MaskWrapper,
  StackRouter,
} from "../../src";

// Define popup IDs
enum PopupID {
  TestProps = "1",
  TestNone = "2",
  TestMissRegister = "3",
}

const NoneTest = lazy(() => import("./NoneTest"));
const PropsTest = lazy(() => import("./PropsTest"));

// Register popups
const popups = [
  RegisterPopup({
    id: PopupID.TestProps,
    content: PropsTest,
    wrapper: BottomSheetWrapper,
  }),
  RegisterPopup({
    id: PopupID.TestNone,
    content: NoneTest,
    wrapper: MaskWrapper,
  }),
] as const;

const stackRouter = new StackRouter(popups);

// =============== TEST.1 基础功能类型 ===========
stackRouter.open(PopupID.TestProps, {
  // @ts-expect-error ❌ 应该提醒 未知字段
  randomName: "",
});

// @ts-expect-error ❌ 应该提示缺少 message 字段
stackRouter.open(PopupID.TestProps, {
  title: "",
});

// =============== TEST.2 漏定义风险 ===========
type MissPopup<T> = object extends T
  ? { isOk: true }
  : {
      ERROR: `定义了弹窗ID: ${Extract<keyof T, number | string>} 但是没有注册对应的组件！`;
    };

type MissRegister = Omit<Record<PopupID, any>, keyof typeof popups>;
// @ts-expect-error ❌ 检查有没有漏注册
type _ = MissPopup<MissRegister>["isOk"];
