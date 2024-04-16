import { type ExtractPropTypes } from 'vue';
declare const cellGroupProps: {
    title: StringConstructor;
    inset: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: true;
    };
};
export declare type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>;
declare const _default: import("vue").DefineComponent<{
    title: StringConstructor;
    inset: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    title: StringConstructor;
    inset: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: true;
    };
}>>, {
    border: boolean;
    inset: boolean;
}>;
export default _default;
