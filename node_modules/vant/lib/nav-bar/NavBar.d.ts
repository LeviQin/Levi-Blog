import { type ExtractPropTypes } from 'vue';
declare const navBarProps: {
    title: StringConstructor;
    fixed: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    border: {
        type: BooleanConstructor;
        default: true;
    };
    leftText: StringConstructor;
    rightText: StringConstructor;
    leftArrow: BooleanConstructor;
    placeholder: BooleanConstructor;
    safeAreaInsetTop: BooleanConstructor;
};
export declare type NavBarProps = ExtractPropTypes<typeof navBarProps>;
declare const _default: import("vue").DefineComponent<{
    title: StringConstructor;
    fixed: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    border: {
        type: BooleanConstructor;
        default: true;
    };
    leftText: StringConstructor;
    rightText: StringConstructor;
    leftArrow: BooleanConstructor;
    placeholder: BooleanConstructor;
    safeAreaInsetTop: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click-left" | "click-right")[], "click-left" | "click-right", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    title: StringConstructor;
    fixed: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    border: {
        type: BooleanConstructor;
        default: true;
    };
    leftText: StringConstructor;
    rightText: StringConstructor;
    leftArrow: BooleanConstructor;
    placeholder: BooleanConstructor;
    safeAreaInsetTop: BooleanConstructor;
}>> & {
    "onClick-left"?: ((...args: any[]) => any) | undefined;
    "onClick-right"?: ((...args: any[]) => any) | undefined;
}, {
    fixed: boolean;
    border: boolean;
    placeholder: boolean;
    safeAreaInsetTop: boolean;
    leftArrow: boolean;
}>;
export default _default;
