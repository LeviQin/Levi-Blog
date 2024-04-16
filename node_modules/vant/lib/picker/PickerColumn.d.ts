import { type InjectionKey } from 'vue';
import type { PickerOption, PickerColumnProvide } from './types';
export declare const PICKER_KEY: InjectionKey<PickerColumnProvide>;
declare const _default: import("vue").DefineComponent<{
    textKey: {
        type: StringConstructor;
        required: true;
    };
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    className: import("vue").PropType<unknown>;
    itemHeight: {
        type: NumberConstructor;
        required: true;
    };
    defaultIndex: {
        type: NumberConstructor;
        default: number;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    initialOptions: {
        type: import("vue").PropType<PickerOption[]>;
        default: () => never[];
    };
    visibleItemCount: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    textKey: {
        type: StringConstructor;
        required: true;
    };
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    className: import("vue").PropType<unknown>;
    itemHeight: {
        type: NumberConstructor;
        required: true;
    };
    defaultIndex: {
        type: NumberConstructor;
        default: number;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    initialOptions: {
        type: import("vue").PropType<PickerOption[]>;
        default: () => never[];
    };
    visibleItemCount: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    readonly: boolean;
    defaultIndex: number;
    allowHtml: boolean;
    initialOptions: PickerOption[];
}>;
export default _default;
