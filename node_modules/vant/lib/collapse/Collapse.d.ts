import { type PropType, type InjectionKey, type ExtractPropTypes, type ComponentPublicInstance } from 'vue';
import { type Numeric } from '../utils';
export declare type CollapseProvide = {
    toggle: (name: Numeric, expanded: boolean) => void;
    isExpanded: (name: Numeric) => boolean;
};
export declare type CollapseToggleAllOptions = boolean | {
    expanded?: boolean;
    skipDisabled?: boolean;
};
export declare const COLLAPSE_KEY: InjectionKey<CollapseProvide>;
declare const collapseProps: {
    border: {
        type: BooleanConstructor;
        default: true;
    };
    accordion: BooleanConstructor;
    modelValue: {
        type: PropType<Numeric | Numeric[]>;
        default: string;
    };
};
export declare type CollapseProps = ExtractPropTypes<typeof collapseProps>;
export declare type CollapseInstance = ComponentPublicInstance<{
    toggleAll: (options?: boolean | CollapseToggleAllOptions) => void;
}>;
declare const _default: import("vue").DefineComponent<{
    border: {
        type: BooleanConstructor;
        default: true;
    };
    accordion: BooleanConstructor;
    modelValue: {
        type: PropType<Numeric | Numeric[]>;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    border: {
        type: BooleanConstructor;
        default: true;
    };
    accordion: BooleanConstructor;
    modelValue: {
        type: PropType<Numeric | Numeric[]>;
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    border: boolean;
    modelValue: Numeric | Numeric[];
    accordion: boolean;
}>;
export default _default;
