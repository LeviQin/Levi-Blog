import { type PropType, type ExtractPropTypes } from 'vue';
import type { CascaderOption, CascaderFieldNames } from './types';
declare const cascaderProps: {
    title: StringConstructor;
    options: {
        type: PropType<CascaderOption[]>;
        default: () => never[];
    };
    closeable: {
        type: BooleanConstructor;
        default: true;
    };
    swipeable: {
        type: BooleanConstructor;
        default: true;
    };
    closeIcon: {
        type: PropType<string>;
        default: string;
    };
    showHeader: {
        type: BooleanConstructor;
        default: true;
    };
    modelValue: (NumberConstructor | StringConstructor)[];
    fieldNames: PropType<CascaderFieldNames>;
    placeholder: StringConstructor;
    activeColor: StringConstructor;
};
export declare type CascaderProps = ExtractPropTypes<typeof cascaderProps>;
declare const _default: import("vue").DefineComponent<{
    title: StringConstructor;
    options: {
        type: PropType<CascaderOption[]>;
        default: () => never[];
    };
    closeable: {
        type: BooleanConstructor;
        default: true;
    };
    swipeable: {
        type: BooleanConstructor;
        default: true;
    };
    closeIcon: {
        type: PropType<string>;
        default: string;
    };
    showHeader: {
        type: BooleanConstructor;
        default: true;
    };
    modelValue: (NumberConstructor | StringConstructor)[];
    fieldNames: PropType<CascaderFieldNames>;
    placeholder: StringConstructor;
    activeColor: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "close" | "click-tab" | "finish")[], "update:modelValue" | "change" | "close" | "click-tab" | "finish", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    title: StringConstructor;
    options: {
        type: PropType<CascaderOption[]>;
        default: () => never[];
    };
    closeable: {
        type: BooleanConstructor;
        default: true;
    };
    swipeable: {
        type: BooleanConstructor;
        default: true;
    };
    closeIcon: {
        type: PropType<string>;
        default: string;
    };
    showHeader: {
        type: BooleanConstructor;
        default: true;
    };
    modelValue: (NumberConstructor | StringConstructor)[];
    fieldNames: PropType<CascaderFieldNames>;
    placeholder: StringConstructor;
    activeColor: StringConstructor;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    "onClick-tab"?: ((...args: any[]) => any) | undefined;
    onFinish?: ((...args: any[]) => any) | undefined;
}, {
    closeIcon: string;
    closeable: boolean;
    options: CascaderOption[];
    swipeable: boolean;
    showHeader: boolean;
}>;
export default _default;
