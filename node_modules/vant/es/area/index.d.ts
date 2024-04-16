export declare const Area: import("../utils").WithInstall<import("vue").DefineComponent<{
    title: StringConstructor;
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    itemHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleItemCount: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
} & {
    value: StringConstructor;
    columnsNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    columnsPlaceholder: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    areaList: {
        type: import("vue").PropType<import("./types").AreaList>;
        default: () => {};
    };
    isOverseaCode: {
        type: import("vue").PropType<(code: string) => boolean>;
        default: (code: string) => boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "cancel" | "confirm")[], "change" | "cancel" | "confirm", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    itemHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleItemCount: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
} & {
    value: StringConstructor;
    columnsNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    columnsPlaceholder: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    areaList: {
        type: import("vue").PropType<import("./types").AreaList>;
        default: () => {};
    };
    isOverseaCode: {
        type: import("vue").PropType<(code: string) => boolean>;
        default: (code: string) => boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
}, {
    readonly: boolean;
    loading: boolean;
    allowHtml: boolean;
    itemHeight: string | number;
    showToolbar: boolean;
    swipeDuration: string | number;
    visibleItemCount: string | number;
    columnsNum: string | number;
    columnsPlaceholder: string[];
    areaList: import("./types").AreaList;
    isOverseaCode: (code: string) => boolean;
}>>;
export default Area;
export type { AreaProps } from './Area';
export type { AreaList, AreaInstance, AreaColumnOption } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanArea: typeof Area;
    }
}
