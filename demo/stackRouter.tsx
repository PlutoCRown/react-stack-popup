import {
  NoneWrapper,
  MaskWrapper,
  SheetWrapper,
  PageWrapper,
  DrawerWrapper,
  RegisterPopup,
  StackRouter,
  FocusLock,
} from "../src";
import { PopupID } from "./constants/popupIds";

import RandomHeightPopup from "./popups/RandomHeightPopup";
import NormalPopup from "./popups/NormalPopup";
import CustomPopup from "./popups/Custom/Popup";
import CustomWrapper from "./popups/Custom/Wrapper";
import PagePopup from "./popups/PagePopup";
import DrawerPopup from "./popups/DrawerPopup";
import PropsPopup from "./popups/PropsPopup";
import React from "react";
import LongContent from "./popups/LongContent";
import { ImageViewer } from "./popups/ImageViewer";
import ConfirmLeave from "./popups/ConfirmLeave";
import TransparentSheetPopup from "./popups/TransparentSheetPopup";

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
  RegisterPopup(PopupID.TransparentSheet, TransparentSheetPopup, SheetWrapper, {
    transparentBackground: true,
  }),
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
  RegisterPopup(PopupID.CustomWrapper, CustomPopup, CustomWrapper),
  // 查看大图

  RegisterPopup(PopupID.ImageViewer, ImageViewer, NoneWrapper, { duration: 200 }),
  RegisterPopup(PopupID.FormView, PropsPopup, PageWrapper),
  RegisterPopup(PopupID.ConfirmLeave, ConfirmLeave, MaskWrapper),
] as const;

const ua = navigator.userAgent;
const isMobileSafari =
  /Mobile Safari/.test(ua) && !/Chrome|CriOS|Chromium/.test(ua);
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

export const focusLock = new FocusLock();

export const stackRouter = new StackRouter(popups, {
  urlManage: isMobileSafari ? false : true,
  prefersReducedMotion,
  unloadDistance: 5,
  lock: focusLock,
});
