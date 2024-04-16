import { type PropType, type ComputedRef, type InjectionKey, type ExtractPropTypes } from 'vue';
export declare type RowSpaces = {
    left?: number;
    right: number;
}[];
export declare type RowProvide = {
    spaces: ComputedRef<RowSpaces>;
};
export declare const ROW_KEY: InjectionKey<RowProvide>;
export declare type RowAlign = 'top' | 'center' | 'bottom';
export declare type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
declare const rowProps: {
    tag: {
        type: PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    wrap: {
        type: BooleanConstructor;
        default: true;
    };
    align: PropType<RowAlign>;
    gutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    justify: PropType<RowJustify>;
};
export declare type RowProps = ExtractPropTypes<typeof rowProps>;
declare const _default: import("vue").DefineComponent<{
    tag: {
        type: PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    wrap: {
        type: BooleanConstructor;
        default: true;
    };
    align: PropType<RowAlign>;
    gutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    justify: PropType<RowJustify>;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    tag: {
        type: PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    wrap: {
        type: BooleanConstructor;
        default: true;
    };
    align: PropType<RowAlign>;
    gutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    justify: PropType<RowJustify>;
}>>, {
    tag: keyof HTMLElementTagNameMap;
    wrap: boolean;
    gutter: string | number;
}>;
export default _default;
