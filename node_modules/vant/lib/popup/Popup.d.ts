import { type CSSProperties, type ExtractPropTypes } from 'vue';
import type { PopupPosition, PopupCloseIconPosition } from './types';
declare const popupProps: {
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: import("vue").PropType<string | import("vue").RendererElement | null | undefined>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: import("vue").PropType<import("../utils").Interceptor>;
    overlayStyle: import("vue").PropType<CSSProperties>;
    overlayClass: import("vue").PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    round: BooleanConstructor;
    position: {
        type: import("vue").PropType<PopupPosition>;
        default: PopupPosition;
    };
    closeIcon: {
        type: import("vue").PropType<string>;
        default: string;
    };
    closeable: BooleanConstructor;
    transition: StringConstructor;
    iconPrefix: StringConstructor;
    closeOnPopstate: BooleanConstructor;
    closeIconPosition: {
        type: import("vue").PropType<PopupCloseIconPosition>;
        default: PopupCloseIconPosition;
    };
    safeAreaInsetTop: BooleanConstructor;
    safeAreaInsetBottom: BooleanConstructor;
};
export declare type PopupProps = ExtractPropTypes<typeof popupProps>;
declare const _default: import("vue").DefineComponent<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: import("vue").PropType<string | import("vue").RendererElement | null | undefined>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: import("vue").PropType<import("../utils").Interceptor>;
    overlayStyle: import("vue").PropType<CSSProperties>;
    overlayClass: import("vue").PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    round: BooleanConstructor;
    position: {
        type: import("vue").PropType<PopupPosition>;
        default: PopupPosition;
    };
    closeIcon: {
        type: import("vue").PropType<string>;
        default: string;
    };
    closeable: BooleanConstructor;
    transition: StringConstructor;
    iconPrefix: StringConstructor;
    closeOnPopstate: BooleanConstructor;
    closeIconPosition: {
        type: import("vue").PropType<PopupCloseIconPosition>;
        default: PopupCloseIconPosition;
    };
    safeAreaInsetTop: BooleanConstructor;
    safeAreaInsetBottom: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "keydown" | "open" | "opened" | "closed" | "update:show" | "click-overlay" | "click-close-icon")[], "open" | "close" | "keydown" | "opened" | "closed" | "update:show" | "click-overlay" | "click-close-icon", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: import("vue").PropType<string | import("vue").RendererElement | null | undefined>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: import("vue").PropType<import("../utils").Interceptor>;
    overlayStyle: import("vue").PropType<CSSProperties>;
    overlayClass: import("vue").PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    round: BooleanConstructor;
    position: {
        type: import("vue").PropType<PopupPosition>;
        default: PopupPosition;
    };
    closeIcon: {
        type: import("vue").PropType<string>;
        default: string;
    };
    closeable: BooleanConstructor;
    transition: StringConstructor;
    iconPrefix: StringConstructor;
    closeOnPopstate: BooleanConstructor;
    closeIconPosition: {
        type: import("vue").PropType<PopupCloseIconPosition>;
        default: PopupCloseIconPosition;
    };
    safeAreaInsetTop: BooleanConstructor;
    safeAreaInsetBottom: BooleanConstructor;
}>> & {
    onKeydown?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    onOpened?: ((...args: any[]) => any) | undefined;
    onClosed?: ((...args: any[]) => any) | undefined;
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
    "onClick-overlay"?: ((...args: any[]) => any) | undefined;
    "onClick-close-icon"?: ((...args: any[]) => any) | undefined;
}, {
    position: PopupPosition;
    round: boolean;
    safeAreaInsetBottom: boolean;
    overlay: boolean;
    show: boolean;
    lockScroll: boolean;
    lazyRender: boolean;
    transitionAppear: boolean;
    closeOnClickOverlay: boolean;
    closeIcon: string;
    closeable: boolean;
    closeOnPopstate: boolean;
    closeIconPosition: PopupCloseIconPosition;
    safeAreaInsetTop: boolean;
}>;
export default _default;
