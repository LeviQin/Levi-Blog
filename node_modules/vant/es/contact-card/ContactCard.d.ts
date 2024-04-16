import { type ExtractPropTypes } from 'vue';
export declare type ContactCardType = 'add' | 'edit';
declare const contactCardProps: {
    tel: StringConstructor;
    name: StringConstructor;
    type: {
        type: import("vue").PropType<ContactCardType>;
        default: ContactCardType;
    };
    addText: StringConstructor;
    editable: {
        type: BooleanConstructor;
        default: true;
    };
};
export declare type ContactCardProps = ExtractPropTypes<typeof contactCardProps>;
declare const _default: import("vue").DefineComponent<{
    tel: StringConstructor;
    name: StringConstructor;
    type: {
        type: import("vue").PropType<ContactCardType>;
        default: ContactCardType;
    };
    addText: StringConstructor;
    editable: {
        type: BooleanConstructor;
        default: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    tel: StringConstructor;
    name: StringConstructor;
    type: {
        type: import("vue").PropType<ContactCardType>;
        default: ContactCardType;
    };
    addText: StringConstructor;
    editable: {
        type: BooleanConstructor;
        default: true;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    type: ContactCardType;
    editable: boolean;
}>;
export default _default;
