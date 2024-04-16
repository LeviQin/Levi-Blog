import { SwipeProps } from './Swipe';
export declare const Swipe: import("../utils").WithInstall<import("vue").DefineComponent<{
    loop: {
        type: BooleanConstructor;
        default: true;
    };
    width: (NumberConstructor | StringConstructor)[];
    height: (NumberConstructor | StringConstructor)[];
    vertical: BooleanConstructor;
    autoplay: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    touchable: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: BooleanConstructor;
    initialSwipe: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    indicatorColor: StringConstructor;
    showIndicators: {
        type: BooleanConstructor;
        default: true;
    };
    stopPropagation: {
        type: BooleanConstructor;
        default: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    loop: {
        type: BooleanConstructor;
        default: true;
    };
    width: (NumberConstructor | StringConstructor)[];
    height: (NumberConstructor | StringConstructor)[];
    vertical: BooleanConstructor;
    autoplay: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    touchable: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: BooleanConstructor;
    initialSwipe: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    indicatorColor: StringConstructor;
    showIndicators: {
        type: BooleanConstructor;
        default: true;
    };
    stopPropagation: {
        type: BooleanConstructor;
        default: true;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    autoplay: string | number;
    loop: boolean;
    vertical: boolean;
    duration: string | number;
    lazyRender: boolean;
    touchable: boolean;
    initialSwipe: string | number;
    showIndicators: boolean;
    stopPropagation: boolean;
}>>;
export default Swipe;
export type { SwipeProps };
export type { SwipeInstance, SwipeToOptions } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanSwipe: typeof Swipe;
    }
}
