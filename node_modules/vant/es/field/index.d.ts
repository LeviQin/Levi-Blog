import { FieldProps } from './Field';
export declare const Field: import("../utils").WithInstall<import("vue").DefineComponent<{
    icon: StringConstructor;
    size: import("vue").PropType<import("..").CellSize>;
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
    arrowDirection: import("vue").PropType<import("..").CellArrowDirection>;
    clickable: {
        type: import("vue").PropType<boolean | null>;
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
    formatter: import("vue").PropType<(value: string) => string>;
    clearIcon: {
        type: import("vue").PropType<string>;
        default: string;
    };
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    inputAlign: import("vue").PropType<import("./types").FieldTextAlign>;
    placeholder: StringConstructor;
    autocomplete: StringConstructor;
    errorMessage: StringConstructor;
    enterkeyhint: StringConstructor;
    clearTrigger: {
        type: import("vue").PropType<import("./types").FieldClearTrigger>;
        default: import("./types").FieldClearTrigger;
    };
    formatTrigger: {
        type: import("vue").PropType<import("./types").FieldFormatTrigger>;
        default: import("./types").FieldFormatTrigger;
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
        type: import("vue").PropType<import("./types").FieldType>;
        default: import("./types").FieldType;
    };
    rules: import("vue").PropType<import("./types").FieldRule[]>;
    autosize: import("vue").PropType<boolean | import("./types").FieldAutosizeConfig>;
    labelWidth: (NumberConstructor | StringConstructor)[];
    labelClass: import("vue").PropType<unknown>;
    labelAlign: import("vue").PropType<import("./types").FieldTextAlign>;
    showWordLimit: BooleanConstructor;
    errorMessageAlign: import("vue").PropType<import("./types").FieldTextAlign>;
    colon: {
        type: BooleanConstructor;
        default: null;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("clear" | "focus" | "blur" | "keypress" | "click-input" | "end-validate" | "start-validate" | "click-left-icon" | "click-right-icon" | "update:modelValue")[], "clear" | "focus" | "blur" | "keypress" | "click-input" | "end-validate" | "start-validate" | "click-left-icon" | "click-right-icon" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    icon: StringConstructor;
    size: import("vue").PropType<import("..").CellSize>;
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
    arrowDirection: import("vue").PropType<import("..").CellArrowDirection>;
    clickable: {
        type: import("vue").PropType<boolean | null>;
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
    formatter: import("vue").PropType<(value: string) => string>;
    clearIcon: {
        type: import("vue").PropType<string>;
        default: string;
    };
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    inputAlign: import("vue").PropType<import("./types").FieldTextAlign>;
    placeholder: StringConstructor;
    autocomplete: StringConstructor;
    errorMessage: StringConstructor;
    enterkeyhint: StringConstructor;
    clearTrigger: {
        type: import("vue").PropType<import("./types").FieldClearTrigger>;
        default: import("./types").FieldClearTrigger;
    };
    formatTrigger: {
        type: import("vue").PropType<import("./types").FieldFormatTrigger>;
        default: import("./types").FieldFormatTrigger;
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
        type: import("vue").PropType<import("./types").FieldType>;
        default: import("./types").FieldType;
    };
    rules: import("vue").PropType<import("./types").FieldRule[]>;
    autosize: import("vue").PropType<boolean | import("./types").FieldAutosizeConfig>;
    labelWidth: (NumberConstructor | StringConstructor)[];
    labelClass: import("vue").PropType<unknown>;
    labelAlign: import("vue").PropType<import("./types").FieldTextAlign>;
    showWordLimit: BooleanConstructor;
    errorMessageAlign: import("vue").PropType<import("./types").FieldTextAlign>;
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
    type: import("./types").FieldType;
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
    clearTrigger: import("./types").FieldClearTrigger;
    formatTrigger: import("./types").FieldFormatTrigger;
    error: boolean;
    readonly: boolean;
    showWordLimit: boolean;
    colon: boolean;
}>>;
export default Field;
export type { FieldProps };
export type { FieldType, FieldRule, FieldInstance, FieldTextAlign, FieldRuleMessage, FieldClearTrigger, FieldFormatTrigger, FieldRuleValidator, FiledRuleFormatter, FieldValidateError, FieldAutosizeConfig, FieldValidateTrigger, FieldValidationStatus, } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanField: typeof Field;
    }
}
