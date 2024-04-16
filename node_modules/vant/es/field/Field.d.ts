import { type PropType, type ExtractPropTypes } from 'vue';
import type { FieldRule, FieldType, FieldTextAlign, FieldClearTrigger, FieldFormatTrigger, FieldAutosizeConfig } from './types';
export declare const fieldSharedProps: {
    id: StringConstructor;
    name: StringConstructor;
    leftIcon: StringConstructor;
    rightIcon: StringConstructor;
    autofocus: BooleanConstructor;
    clearable: BooleanConstructor;
    maxlength: (NumberConstructor | StringConstructor)[];
    formatter: PropType<(value: string) => string>;
    clearIcon: {
        type: PropType<string>;
        default: string;
    };
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    inputAlign: PropType<FieldTextAlign>;
    placeholder: StringConstructor;
    autocomplete: StringConstructor;
    errorMessage: StringConstructor;
    enterkeyhint: StringConstructor;
    clearTrigger: {
        type: PropType<FieldClearTrigger>;
        default: FieldClearTrigger;
    };
    formatTrigger: {
        type: PropType<FieldFormatTrigger>;
        default: FieldFormatTrigger;
    };
    error: {
        type: BooleanConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: null;
    };
    readonly: {
        type: BooleanConstructor;
        default: null;
    };
};
declare const fieldProps: {
    icon: StringConstructor;
    size: PropType<import("../cell").CellSize>;
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
    titleStyle: PropType<string | import("vue").CSSProperties>;
    arrowDirection: PropType<import("../cell").CellArrowDirection>;
    clickable: {
        type: PropType<boolean | null>;
        default: null;
    };
} & {
    id: StringConstructor;
    name: StringConstructor;
    leftIcon: StringConstructor;
    rightIcon: StringConstructor;
    autofocus: BooleanConstructor;
    clearable: BooleanConstructor;
    maxlength: (NumberConstructor | StringConstructor)[];
    formatter: PropType<(value: string) => string>;
    clearIcon: {
        type: PropType<string>;
        default: string;
    };
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    inputAlign: PropType<FieldTextAlign>;
    placeholder: StringConstructor;
    autocomplete: StringConstructor;
    errorMessage: StringConstructor;
    enterkeyhint: StringConstructor;
    clearTrigger: {
        type: PropType<FieldClearTrigger>;
        default: FieldClearTrigger;
    };
    formatTrigger: {
        type: PropType<FieldFormatTrigger>;
        default: FieldFormatTrigger;
    };
    error: {
        type: BooleanConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: null;
    };
    readonly: {
        type: BooleanConstructor;
        default: null;
    };
} & {
    rows: (NumberConstructor | StringConstructor)[];
    type: {
        type: PropType<FieldType>;
        default: FieldType;
    };
    rules: PropType<FieldRule[]>;
    autosize: PropType<boolean | FieldAutosizeConfig>;
    labelWidth: (NumberConstructor | StringConstructor)[];
    labelClass: PropType<unknown>;
    labelAlign: PropType<FieldTextAlign>;
    showWordLimit: BooleanConstructor;
    errorMessageAlign: PropType<FieldTextAlign>;
    colon: {
        type: BooleanConstructor;
        default: null;
    };
};
export declare type FieldProps = ExtractPropTypes<typeof fieldProps>;
declare const _default: import("vue").DefineComponent<{
    icon: StringConstructor;
    size: PropType<import("../cell").CellSize>;
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
    titleStyle: PropType<string | import("vue").CSSProperties>;
    arrowDirection: PropType<import("../cell").CellArrowDirection>;
    clickable: {
        type: PropType<boolean | null>;
        default: null;
    };
} & {
    id: StringConstructor;
    name: StringConstructor;
    leftIcon: StringConstructor;
    rightIcon: StringConstructor;
    autofocus: BooleanConstructor;
    clearable: BooleanConstructor;
    maxlength: (NumberConstructor | StringConstructor)[];
    formatter: PropType<(value: string) => string>;
    clearIcon: {
        type: PropType<string>;
        default: string;
    };
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    inputAlign: PropType<FieldTextAlign>;
    placeholder: StringConstructor;
    autocomplete: StringConstructor;
    errorMessage: StringConstructor;
    enterkeyhint: StringConstructor;
    clearTrigger: {
        type: PropType<FieldClearTrigger>;
        default: FieldClearTrigger;
    };
    formatTrigger: {
        type: PropType<FieldFormatTrigger>;
        default: FieldFormatTrigger;
    };
    error: {
        type: BooleanConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: null;
    };
    readonly: {
        type: BooleanConstructor;
        default: null;
    };
} & {
    rows: (NumberConstructor | StringConstructor)[];
    type: {
        type: PropType<FieldType>;
        default: FieldType;
    };
    rules: PropType<FieldRule[]>;
    autosize: PropType<boolean | FieldAutosizeConfig>;
    labelWidth: (NumberConstructor | StringConstructor)[];
    labelClass: PropType<unknown>;
    labelAlign: PropType<FieldTextAlign>;
    showWordLimit: BooleanConstructor;
    errorMessageAlign: PropType<FieldTextAlign>;
    colon: {
        type: BooleanConstructor;
        default: null;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("clear" | "focus" | "blur" | "keypress" | "click-input" | "end-validate" | "start-validate" | "click-left-icon" | "click-right-icon" | "update:modelValue")[], "clear" | "focus" | "blur" | "keypress" | "click-input" | "end-validate" | "start-validate" | "click-left-icon" | "click-right-icon" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    icon: StringConstructor;
    size: PropType<import("../cell").CellSize>;
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
    titleStyle: PropType<string | import("vue").CSSProperties>;
    arrowDirection: PropType<import("../cell").CellArrowDirection>;
    clickable: {
        type: PropType<boolean | null>;
        default: null;
    };
} & {
    id: StringConstructor;
    name: StringConstructor;
    leftIcon: StringConstructor;
    rightIcon: StringConstructor;
    autofocus: BooleanConstructor;
    clearable: BooleanConstructor;
    maxlength: (NumberConstructor | StringConstructor)[];
    formatter: PropType<(value: string) => string>;
    clearIcon: {
        type: PropType<string>;
        default: string;
    };
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    inputAlign: PropType<FieldTextAlign>;
    placeholder: StringConstructor;
    autocomplete: StringConstructor;
    errorMessage: StringConstructor;
    enterkeyhint: StringConstructor;
    clearTrigger: {
        type: PropType<FieldClearTrigger>;
        default: FieldClearTrigger;
    };
    formatTrigger: {
        type: PropType<FieldFormatTrigger>;
        default: FieldFormatTrigger;
    };
    error: {
        type: BooleanConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: null;
    };
    readonly: {
        type: BooleanConstructor;
        default: null;
    };
} & {
    rows: (NumberConstructor | StringConstructor)[];
    type: {
        type: PropType<FieldType>;
        default: FieldType;
    };
    rules: PropType<FieldRule[]>;
    autosize: PropType<boolean | FieldAutosizeConfig>;
    labelWidth: (NumberConstructor | StringConstructor)[];
    labelClass: PropType<unknown>;
    labelAlign: PropType<FieldTextAlign>;
    showWordLimit: BooleanConstructor;
    errorMessageAlign: PropType<FieldTextAlign>;
    colon: {
        type: BooleanConstructor;
        default: null;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onKeypress?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onClick-input"?: ((...args: any[]) => any) | undefined;
    "onEnd-validate"?: ((...args: any[]) => any) | undefined;
    "onStart-validate"?: ((...args: any[]) => any) | undefined;
    "onClick-left-icon"?: ((...args: any[]) => any) | undefined;
    "onClick-right-icon"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: FieldType;
    required: boolean;
    center: boolean;
    autofocus: boolean;
    disabled: boolean;
    isLink: boolean;
    border: boolean;
    clickable: boolean | null;
    clearable: boolean;
    clearIcon: string;
    modelValue: string | number;
    clearTrigger: FieldClearTrigger;
    formatTrigger: FieldFormatTrigger;
    error: boolean;
    readonly: boolean;
    showWordLimit: boolean;
    colon: boolean;
}>;
export default _default;
