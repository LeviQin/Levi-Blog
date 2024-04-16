import { type ExtractPropTypes } from 'vue';
declare const collapseItemProps: {
    icon: StringConstructor;
    size: import("vue").PropType<import("../cell").CellSize>;
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
    valueClass: import("vue").PropType<unknown>;
    labelClass: import("vue").PropType<unknown>;
    titleClass: import("vue").PropType<unknown>;
    titleStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    arrowDirection: import("vue").PropType<import("../cell").CellArrowDirection>;
    clickable: {
        type: import("vue").PropType<boolean | null>;
        default: null;
    };
} & {
    name: (NumberConstructor | StringConstructor)[];
    isLink: {
        type: BooleanConstructor;
        default: true;
    };
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
};
export declare type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>;
declare const _default: import("vue").DefineComponent<{
    icon: StringConstructor;
    size: import("vue").PropType<import("../cell").CellSize>;
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
    valueClass: import("vue").PropType<unknown>;
    labelClass: import("vue").PropType<unknown>;
    titleClass: import("vue").PropType<unknown>;
    titleStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    arrowDirection: import("vue").PropType<import("../cell").CellArrowDirection>;
    clickable: {
        type: import("vue").PropType<boolean | null>;
        default: null;
    };
} & {
    name: (NumberConstructor | StringConstructor)[];
    isLink: {
        type: BooleanConstructor;
        default: true;
    };
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
}, (() => JSX.Element) | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    icon: StringConstructor;
    size: import("vue").PropType<import("../cell").CellSize>;
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
    valueClass: import("vue").PropType<unknown>;
    labelClass: import("vue").PropType<unknown>;
    titleClass: import("vue").PropType<unknown>;
    titleStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    arrowDirection: import("vue").PropType<import("../cell").CellArrowDirection>;
    clickable: {
        type: import("vue").PropType<boolean | null>;
        default: null;
    };
} & {
    name: (NumberConstructor | StringConstructor)[];
    isLink: {
        type: BooleanConstructor;
        default: true;
    };
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
}>>, {
    required: boolean;
    center: boolean;
    disabled: boolean;
    isLink: boolean;
    border: boolean;
    clickable: boolean | null;
    readonly: boolean;
    lazyRender: boolean;
}>;
export default _default;
