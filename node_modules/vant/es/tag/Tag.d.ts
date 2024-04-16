import { type PropType, type ExtractPropTypes } from 'vue';
export declare type TagSize = 'large' | 'medium';
export declare type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
declare const tagProps: {
    size: PropType<TagSize>;
    mark: BooleanConstructor;
    show: {
        type: BooleanConstructor;
        default: true;
    };
    type: {
        type: PropType<TagType>;
        default: TagType;
    };
    color: StringConstructor;
    plain: BooleanConstructor;
    round: BooleanConstructor;
    textColor: StringConstructor;
    closeable: BooleanConstructor;
};
export declare type TagProps = ExtractPropTypes<typeof tagProps>;
declare const _default: import("vue").DefineComponent<{
    size: PropType<TagSize>;
    mark: BooleanConstructor;
    show: {
        type: BooleanConstructor;
        default: true;
    };
    type: {
        type: PropType<TagType>;
        default: TagType;
    };
    color: StringConstructor;
    plain: BooleanConstructor;
    round: BooleanConstructor;
    textColor: StringConstructor;
    closeable: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    size: PropType<TagSize>;
    mark: BooleanConstructor;
    show: {
        type: BooleanConstructor;
        default: true;
    };
    type: {
        type: PropType<TagType>;
        default: TagType;
    };
    color: StringConstructor;
    plain: BooleanConstructor;
    round: BooleanConstructor;
    textColor: StringConstructor;
    closeable: BooleanConstructor;
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    type: TagType;
    mark: boolean;
    round: boolean;
    show: boolean;
    plain: boolean;
    closeable: boolean;
}>;
export default _default;
