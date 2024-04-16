import { type PropType, type CSSProperties, type ExtractPropTypes } from 'vue';
export declare type CellSize = 'normal' | 'large';
export declare type CellArrowDirection = 'up' | 'down' | 'left' | 'right';
export declare const cellSharedProps: {
    icon: StringConstructor;
    size: PropType<CellSize>;
    title: (NumberConstructor | StringConstructor)[];
    value: (NumberConstructor | StringConstructor)[];
    label: (NumberConstructor | StringConstructor)[];
    center: BooleanConstructor;
    isLink: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: true;
    };
    required: BooleanConstructor;
    iconPrefix: StringConstructor;
    valueClass: PropType<unknown>;
    labelClass: PropType<unknown>;
    titleClass: PropType<unknown>;
    titleStyle: PropType<string | CSSProperties>;
    arrowDirection: PropType<CellArrowDirection>;
    clickable: {
        type: PropType<boolean | null>;
        default: null;
    };
};
declare const cellProps: {
    icon: StringConstructor;
    size: PropType<CellSize>;
    title: (NumberConstructor | StringConstructor)[];
    value: (NumberConstructor | StringConstructor)[];
    label: (NumberConstructor | StringConstructor)[];
    center: BooleanConstructor;
    isLink: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: true;
    };
    required: BooleanConstructor;
    iconPrefix: StringConstructor;
    valueClass: PropType<unknown>;
    labelClass: PropType<unknown>;
    titleClass: PropType<unknown>;
    titleStyle: PropType<string | CSSProperties>;
    arrowDirection: PropType<CellArrowDirection>;
    clickable: {
        type: PropType<boolean | null>;
        default: null;
    };
} & {
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
};
export declare type CellProps = ExtractPropTypes<typeof cellProps>;
declare const _default: import("vue").DefineComponent<{
    icon: StringConstructor;
    size: PropType<CellSize>;
    title: (NumberConstructor | StringConstructor)[];
    value: (NumberConstructor | StringConstructor)[];
    label: (NumberConstructor | StringConstructor)[];
    center: BooleanConstructor;
    isLink: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: true;
    };
    required: BooleanConstructor;
    iconPrefix: StringConstructor;
    valueClass: PropType<unknown>;
    labelClass: PropType<unknown>;
    titleClass: PropType<unknown>;
    titleStyle: PropType<string | CSSProperties>;
    arrowDirection: PropType<CellArrowDirection>;
    clickable: {
        type: PropType<boolean | null>;
        default: null;
    };
} & {
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    icon: StringConstructor;
    size: PropType<CellSize>;
    title: (NumberConstructor | StringConstructor)[];
    value: (NumberConstructor | StringConstructor)[];
    label: (NumberConstructor | StringConstructor)[];
    center: BooleanConstructor;
    isLink: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: true;
    };
    required: BooleanConstructor;
    iconPrefix: StringConstructor;
    valueClass: PropType<unknown>;
    labelClass: PropType<unknown>;
    titleClass: PropType<unknown>;
    titleStyle: PropType<string | CSSProperties>;
    arrowDirection: PropType<CellArrowDirection>;
    clickable: {
        type: PropType<boolean | null>;
        default: null;
    };
} & {
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
}>>, {
    replace: boolean;
    required: boolean;
    center: boolean;
    isLink: boolean;
    border: boolean;
    clickable: boolean | null;
}>;
export default _default;
