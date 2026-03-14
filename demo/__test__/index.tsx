import { lazy } from "react";
import { RegisterPopup, MaskWrapper, StackRouter } from "../../src";
import { Equal, Expect, Length, UnionLength } from "./types";

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
    wrapper: MaskWrapper,
  }),
  RegisterPopup({
    id: PopupID.TestNone,
    content: NoneTest,
    wrapper: MaskWrapper,
  }),
  // 错误注册 ⬇️
  RegisterPopup({
    id: PopupID.TestNone,
    content: PropsTest,
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
  ? never
  : `定义了弹窗ID: ${Extract<keyof T, number | string>} 但是没有注册对应的组件！`;

type MissRegister = Omit<Record<PopupID, any>, (typeof popups)[number]["id"]>;
type Error = MissPopup<MissRegister>;
// @ts-expect-error ❌ 检查有没有漏注册，瞄准 Error 以查看错误
type _ = Expect<Equal<never, Error>>;

// =============== TEST.3 重复ID校验 ===========

type Len = Length<typeof popups>;

type PopupCount = UnionLength<(typeof popups)[number]["id"]>;

// @ts-expect-error ❌ 核算有无重复的PopupID被注册
type __ = Expect<Equal<Len, PopupCount>>;
