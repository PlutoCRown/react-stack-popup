import { lazy } from "react";
import {
  RegisterPopup,
  BottomSheetWrapper,
  MaskWrapper,
  StackRouter,
} from "../../src";

// Define popup IDs
enum PopupID {
  TestProps = "HasProps",
  TestNone = "NoProps",
  TestMissRegister = "TestMissRegister",
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

// @ts-expect-error ❌ 没有参数的弹窗传递了参数，应该提示
stackRouter.open(PopupID.TestNone, { title: "123" });

// @ts-expect-error ❌ 需要参数的弹窗没有传递，应该提示缺少字段
stackRouter.open(PopupID.TestProps, { title: "miss message" });

// =============== TEST.2 漏定义风险 ===========
type MissPopup<T> = object extends T
  ? { isOk: true }
  : {
      ERROR: `定义了弹窗ID: ${Extract<keyof T, number | string>} 但是没有注册对应的组件！`;
    };

type MissRegister = Omit<Record<PopupID, any>, (typeof popups)[number]["id"]>;
// @ts-expect-error ❌ 检查有没有漏注册
type _ = MissPopup<MissRegister>["isOk"];
