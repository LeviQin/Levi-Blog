import { App } from 'vue';
import { type ComponentInstance } from '../utils';
import type { NotifyMessage, NotifyOptions } from './types';
declare function Notify(options: NotifyMessage | NotifyOptions): ComponentInstance | undefined;
declare namespace Notify {
    var clear: () => void;
    var currentOptions: NotifyOptions;
    var setDefaultOptions: (options: NotifyOptions) => void;
    var resetDefaultOptions: () => void;
    var Component: import("../utils").WithInstall<import("vue").DefineComponent<{
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
        overlayStyle: import("vue").PropType<import("vue").CSSProperties>;
        overlayClass: import("vue").PropType<unknown>;
        transitionAppear: BooleanConstructor;
        closeOnClickOverlay: {
            type: BooleanConstructor;
            default: true;
        };
    } & {
        type: {
            type: import("vue").PropType<import("./types").NotifyType>;
            default: import("./types").NotifyType;
        };
        color: StringConstructor;
        message: (NumberConstructor | StringConstructor)[];
        position: {
            type: import("vue").PropType<import("./types").NotifyPosition>;
            default: import("./types").NotifyPosition;
        };
        className: import("vue").PropType<unknown>;
        background: StringConstructor;
        lockScroll: BooleanConstructor;
    }, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:show"[], "update:show", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
        overlayStyle: import("vue").PropType<import("vue").CSSProperties>;
        overlayClass: import("vue").PropType<unknown>;
        transitionAppear: BooleanConstructor;
        closeOnClickOverlay: {
            type: BooleanConstructor;
            default: true;
        };
    } & {
        type: {
            type: import("vue").PropType<import("./types").NotifyType>;
            default: import("./types").NotifyType;
        };
        color: StringConstructor;
        message: (NumberConstructor | StringConstructor)[];
        position: {
            type: import("vue").PropType<import("./types").NotifyPosition>;
            default: import("./types").NotifyPosition;
        };
        className: import("vue").PropType<unknown>;
        background: StringConstructor;
        lockScroll: BooleanConstructor;
    }>> & {
        "onUpdate:show"?: ((...args: any[]) => any) | undefined;
    }, {
        type: import("./types").NotifyType;
        position: import("./types").NotifyPosition;
        overlay: boolean;
        show: boolean;
        lockScroll: boolean;
        lazyRender: boolean;
        transitionAppear: boolean;
        closeOnClickOverlay: boolean;
    }>>;
    var install: (app: App<any>) => void;
}
export { Notify };
