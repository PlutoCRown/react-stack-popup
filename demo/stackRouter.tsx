import {
  NoneWrapper,
  MaskWrapper,
  SheetWrapper,
  PageWrapper,
  DrawerWrapper,
  RegisterPopup,
  StackRouter,
} from "../src";
import { PopupID } from "./constants/popupIds";

import RandomHeightPopup from "./popups/RandomHeightPopup";
import NormalPopup from "./popups/NormalPopup";
import CustomPopup from "./popups/CustomPopup";
import PagePopup from "./popups/PagePopup";
import DrawerPopup from "./popups/DrawerPopup";
import PropsPopup from "./popups/PropsPopup";
import React from "react";
import LongContent from "./popups/LongContent";
import { ImageViewer } from "./popups/ImageViewer";

// Register popups
const popups = [
  // 基础用法
  RegisterPopup(PopupID.TestNoneWrap, PropsPopup, NoneWrapper, {
    duration: 0,
  }),
  RegisterPopup(PopupID.FullPage, PagePopup, PageWrapper),
  RegisterPopup(PopupID.Drawer, DrawerPopup, DrawerWrapper),
  RegisterPopup(PopupID.CenterPopup, NormalPopup, MaskWrapper),
  RegisterPopup(PopupID.Sheet, RandomHeightPopup, SheetWrapper, {
    swipable: false,
  }),
  // Sheet
  RegisterPopup(PopupID.TestSwipable, PropsPopup, SheetWrapper),
  RegisterPopup(PopupID.HighSheet, RandomHeightPopup, SheetWrapper, {
    fitContent: false,
  }),
  // 测试页滚动
  RegisterPopup(PopupID.ScrollPage, LongContent, PageWrapper),
  RegisterPopup(PopupID.ScrollSheet, LongContent, SheetWrapper),
  RegisterPopup(PopupID.ScrollMask, LongContent, MaskWrapper),
  // 特殊用法：动态调用弹窗
  RegisterPopup(
    PopupID.CustomContent,
    (({ Component }) => Component) as React.FC<{
      Component: React.ReactNode;
    }>,
    MaskWrapper,
  ),
  // 特殊用法：自定义包装层弹窗
  RegisterPopup(PopupID.CustomWrapper, CustomPopup, PageWrapper),
  // 查看大图

  RegisterPopup(PopupID.ImageViewer, ImageViewer, NoneWrapper),
] as const;

const isMobileSafari = navigator.userAgent.includes("Mobile Safari");

export const stackRouter = new StackRouter(popups, {
  urlManage: isMobileSafari ? false : true,
  unloadDistance: 5,
});
