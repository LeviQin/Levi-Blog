import { TabsProps } from './Tabs';
export declare const Tabs: import("../utils").WithInstall<import("vue").DefineComponent<{
    type: {
        type: import("vue").PropType<import("./types").TabsType>;
        default: import("./types").TabsType;
    };
    color: StringConstructor;
    border: BooleanConstructor;
    sticky: BooleanConstructor;
    shrink: BooleanConstructor;
    active: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    animated: BooleanConstructor;
    ellipsis: {
        type: BooleanConstructor;
        default: true;
    };
    swipeable: BooleanConstructor;
    scrollspy: BooleanConstructor;
    offsetTop: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    background: StringConstructor;
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    lineWidth: (NumberConstructor | StringConstructor)[];
    lineHeight: (NumberConstructor | StringConstructor)[];
    beforeChange: import("vue").PropType<import("../utils").Interceptor>;
    swipeThreshold: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    titleActiveColor: StringConstructor;
    titleInactiveColor: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("scroll" | "disabled" | "change" | "click" | "rendered" | "click-tab" | "update:active")[], "scroll" | "disabled" | "change" | "click" | "rendered" | "click-tab" | "update:active", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: import("vue").PropType<import("./types").TabsType>;
        default: import("./types").TabsType;
    };
    color: StringConstructor;
    border: BooleanConstructor;
    sticky: BooleanConstructor;
    shrink: BooleanConstructor;
    active: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    animated: BooleanConstructor;
    ellipsis: {
        type: BooleanConstructor;
        default: true;
    };
    swipeable: BooleanConstructor;
    scrollspy: BooleanConstructor;
    offsetTop: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    background: StringConstructor;
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    lineWidth: (NumberConstructor | StringConstructor)[];
    lineHeight: (NumberConstructor | StringConstructor)[];
    beforeChange: import("vue").PropType<import("../utils").Interceptor>;
    swipeThreshold: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    titleActiveColor: StringConstructor;
    titleInactiveColor: StringConstructor;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
    onScroll?: ((...args: any[]) => any) | undefined;
    onDisabled?: ((...args: any[]) => any) | undefined;
    onRendered?: ((...args: any[]) => any) | undefined;
    "onClick-tab"?: ((...args: any[]) => any) | undefined;
    "onUpdate:active"?: ((...args: any[]) => any) | undefined;
}, {
    type: import("./types").TabsType;
    border: boolean;
    ellipsis: boolean;
    sticky: boolean;
    active: string | number;
    duration: string | number;
    lazyRender: boolean;
    offsetTop: string | number;
    shrink: boolean;
    animated: boolean;
    swipeable: boolean;
    scrollspy: boolean;
    swipeThreshold: string | number;
}>>;
export default Tabs;
export type { TabsProps };
export type { TabsType, TabsInstance } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanTabs: typeof Tabs;
    }
}
