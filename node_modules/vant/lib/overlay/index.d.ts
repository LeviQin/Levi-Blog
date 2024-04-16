export declare const Overlay: import("../utils").WithInstall<import("vue").DefineComponent<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    duration: (NumberConstructor | StringConstructor)[];
    className: import("vue").PropType<unknown>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    customStyle: import("vue").PropType<import("vue").CSSProperties>;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    duration: (NumberConstructor | StringConstructor)[];
    className: import("vue").PropType<unknown>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    customStyle: import("vue").PropType<import("vue").CSSProperties>;
}>>, {
    show: boolean;
    lockScroll: boolean;
    lazyRender: boolean;
}>>;
export default Overlay;
export type { OverlayProps } from './Overlay';
declare module 'vue' {
    interface GlobalComponents {
        VanOverlay: typeof Overlay;
    }
}
