import { type ExtractPropTypes } from 'vue';
import { AddressListAddress } from './AddressListItem';
declare const addressListProps: {
    list: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    modelValue: (NumberConstructor | StringConstructor)[];
    switchable: {
        type: BooleanConstructor;
        default: true;
    };
    disabledText: StringConstructor;
    disabledList: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    addButtonText: StringConstructor;
    defaultTagText: StringConstructor;
};
export declare type AddressListProps = ExtractPropTypes<typeof addressListProps>;
declare const _default: import("vue").DefineComponent<{
    list: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    modelValue: (NumberConstructor | StringConstructor)[];
    switchable: {
        type: BooleanConstructor;
        default: true;
    };
    disabledText: StringConstructor;
    disabledList: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    addButtonText: StringConstructor;
    defaultTagText: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "update:modelValue" | "add" | "edit" | "click-item" | "edit-disabled" | "select-disabled")[], "select" | "update:modelValue" | "add" | "edit" | "click-item" | "edit-disabled" | "select-disabled", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    list: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    modelValue: (NumberConstructor | StringConstructor)[];
    switchable: {
        type: BooleanConstructor;
        default: true;
    };
    disabledText: StringConstructor;
    disabledList: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    addButtonText: StringConstructor;
    defaultTagText: StringConstructor;
}>> & {
    onSelect?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onEdit?: ((...args: any[]) => any) | undefined;
    onAdd?: ((...args: any[]) => any) | undefined;
    "onClick-item"?: ((...args: any[]) => any) | undefined;
    "onEdit-disabled"?: ((...args: any[]) => any) | undefined;
    "onSelect-disabled"?: ((...args: any[]) => any) | undefined;
}, {
    switchable: boolean;
    list: AddressListAddress[];
    disabledList: AddressListAddress[];
}>;
export default _default;
