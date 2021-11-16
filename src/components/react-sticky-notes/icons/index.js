import { h, getElementStyle } from './../utils';
const iconsClassName = "material-icons";
export const add = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'add');
export const trash = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'delete_outlined');
export const menu = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'more_horiz');
export const hide = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'visibility_off');
export const show = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'minimize');
export const clear = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'monitor_shimmer');
export const normalview = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'widgets');
export const bubbleview = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'grain');
export const pageview = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'fullscreen');
export const upload = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'cloud_upload');
export const fullscreen = h('i',{ className: iconsClassName, style: getElementStyle('icon') },'fullscreen_exit');
