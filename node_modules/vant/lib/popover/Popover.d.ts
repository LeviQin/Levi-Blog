import { type PropType, type CSSProperties, type ExtractPropTypes } from 'vue';
import { PopoverTheme, PopoverAction, PopoverTrigger, PopoverPlacement } from './types';
declare const popoverProps: {
    show: BooleanConstructor;
    theme: {
        type: PropType<PopoverTheme>;
        default: PopoverTheme;
    };
    overlay: BooleanConstructor;
    actions: {
        type: PropType<PopoverAction[]>;
        default: () => never[];
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: PopoverTrigger;
    };
    duration: (NumberConstructor | StringConstructor)[];
    showArrow: {
        type: BooleanConstructor;
        default: true;
    };
    placement: {
        type: PropType<PopoverPlacement>;
        default: PopoverPlacement;
    };
    iconPrefix: StringConstructor;
    overlayClass: PropType<unknown>;
    overlayStyle: PropType<CSSProperties>;
    closeOnClickAction: {
        type: BooleanConstructor;
        default: true;
    };
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
    closeOnClickOutside: {
        type: BooleanConstructor;
        default: true;
    };
    offset: {
        type: PropType<[number, number]>;
        default: () => number[];
    };
    teleport: {
        type: PropType<string | import("vue").RendererElement | null | undefined>;
        default: string;
    };
};
export declare type PopoverProps = ExtractPropTypes<typeof popoverProps>;
declare const _default: import("vue").DefineComponent<{
    show: BooleanConstructor;
    theme: {
        type: PropType<PopoverTheme>;
        default: PopoverTheme;
    };
    overlay: BooleanConstructor;
    actions: {
        type: PropType<PopoverAction[]>;
        default: () => never[];
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: PopoverTrigger;
    };
    duration: (NumberConstructor | StringConstructor)[];
    showArrow: {
        type: BooleanConstructor;
        default: true;
    };
    placement: {
        type: PropType<PopoverPlacement>;
        default: PopoverPlacement;
    };
    iconPrefix: StringConstructor;
    overlayClass: PropType<unknown>;
    overlayStyle: PropType<CSSProperties>;
    closeOnClickAction: {
        type: BooleanConstructor;
        default: true;
    };
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
    closeOnClickOutside: {
        type: BooleanConstructor;
        default: true;
    };
    offset: {
        type: PropType<[number, number]>;
        default: () => number[];
    };
    teleport: {
        type: PropType<string | import("vue").RendererElement | null | undefined>;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "touchstart" | "update:show")[], "select" | "touchstart" | "update:show", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    show: BooleanConstructor;
    theme: {
        type: PropType<PopoverTheme>;
        default: PopoverTheme;
    };
    overlay: BooleanConstructor;
    actions: {
        type: PropType<PopoverAction[]>;
        default: () => never[];
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: PopoverTrigger;
    };
    duration: (NumberConstructor | StringConstructor)[];
    showArrow: {
        type: BooleanConstructor;
        default: true;
    };
    placement: {
        type: PropType<PopoverPlacement>;
        default: PopoverPlacement;
    };
    iconPrefix: StringConstructor;
    overlayClass: PropType<unknown>;
    overlayStyle: PropType<CSSProperties>;
    closeOnClickAction: {
        type: BooleanConstructor;
        default: true;
    };
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
    closeOnClickOutside: {
        type: BooleanConstructor;
        default: true;
    };
    offset: {
        type: PropType<[number, number]>;
        default: () => number[];
    };
    teleport: {
        type: PropType<string | import("vue").RendererElement | null | undefined>;
        default: string;
    };
}>> & {
    onSelect?: ((...args: any[]) => any) | undefined;
    onTouchstart?: ((...args: any[]) => any) | undefined;
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
}, {
    offset: [number, number];
    overlay: boolean;
    show: boolean;
    teleport: string | import("vue").RendererElement | null | undefined;
    closeOnClickOverlay: boolean;
    actions: PopoverAction[];
    closeOnClickAction: boolean;
    theme: PopoverTheme;
    closeOnClickOutside: boolean;
    trigger: PopoverTrigger;
    showArrow: boolean;
    placement: PopoverPlacement;
}>;
export default _default;
