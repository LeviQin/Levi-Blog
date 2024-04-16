declare const _default: import("vue").DefineComponent<{
    title: StringConstructor;
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    itemHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleItemCount: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
} & {
    filter: import("vue").PropType<(type: string, values: string[]) => string[]>;
    columnsOrder: import("vue").PropType<import("./types").DatetimePickerColumnType[]>;
    formatter: {
        type: import("vue").PropType<(type: string, value: string) => string>;
        default: (type: string, value: string) => string;
    };
} & {
    minHour: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    maxHour: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    minMinute: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    maxMinute: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    modelValue: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "cancel" | "confirm")[], "update:modelValue" | "change" | "cancel" | "confirm", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    itemHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleItemCount: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
} & {
    filter: import("vue").PropType<(type: string, values: string[]) => string[]>;
    columnsOrder: import("vue").PropType<import("./types").DatetimePickerColumnType[]>;
    formatter: {
        type: import("vue").PropType<(type: string, value: string) => string>;
        default: (type: string, value: string) => string;
    };
} & {
    minHour: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    maxHour: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    minMinute: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    maxMinute: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    modelValue: StringConstructor;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
}, {
    formatter: (type: string, value: string) => string;
    readonly: boolean;
    loading: boolean;
    allowHtml: boolean;
    itemHeight: string | number;
    showToolbar: boolean;
    swipeDuration: string | number;
    visibleItemCount: string | number;
    minHour: string | number;
    maxHour: string | number;
    minMinute: string | number;
    maxMinute: string | number;
}>;
export default _default;
