import { type PropType, type ExtractPropTypes } from 'vue';
declare type NumberRange = [number, number];
declare type SliderValue = number | NumberRange;
declare const sliderProps: {
    min: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    step: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    range: BooleanConstructor;
    reverse: BooleanConstructor;
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    vertical: BooleanConstructor;
    barHeight: (NumberConstructor | StringConstructor)[];
    buttonSize: (NumberConstructor | StringConstructor)[];
    activeColor: StringConstructor;
    inactiveColor: StringConstructor;
    modelValue: {
        type: PropType<SliderValue>;
        default: number;
    };
};
export declare type SliderProps = ExtractPropTypes<typeof sliderProps>;
declare const _default: import("vue").DefineComponent<{
    min: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    step: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    range: BooleanConstructor;
    reverse: BooleanConstructor;
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    vertical: BooleanConstructor;
    barHeight: (NumberConstructor | StringConstructor)[];
    buttonSize: (NumberConstructor | StringConstructor)[];
    activeColor: StringConstructor;
    inactiveColor: StringConstructor;
    modelValue: {
        type: PropType<SliderValue>;
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "drag-end" | "drag-start")[], "update:modelValue" | "change" | "drag-end" | "drag-start", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    min: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    step: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    range: BooleanConstructor;
    reverse: BooleanConstructor;
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    vertical: BooleanConstructor;
    barHeight: (NumberConstructor | StringConstructor)[];
    buttonSize: (NumberConstructor | StringConstructor)[];
    activeColor: StringConstructor;
    inactiveColor: StringConstructor;
    modelValue: {
        type: PropType<SliderValue>;
        default: number;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onDrag-end"?: ((...args: any[]) => any) | undefined;
    "onDrag-start"?: ((...args: any[]) => any) | undefined;
}, {
    range: boolean;
    max: string | number;
    reverse: boolean;
    disabled: boolean;
    modelValue: SliderValue;
    readonly: boolean;
    vertical: boolean;
    min: string | number;
    step: string | number;
}>;
export default _default;
