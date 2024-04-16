export declare const Pagination: import("../utils").WithInstall<import("vue").DefineComponent<{
    mode: {
        type: import("vue").PropType<import("./Pagination").PaginationMode>;
        default: import("./Pagination").PaginationMode;
    };
    prevText: StringConstructor;
    nextText: StringConstructor;
    pageCount: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    totalItems: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showPageSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    forceEllipses: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    mode: {
        type: import("vue").PropType<import("./Pagination").PaginationMode>;
        default: import("./Pagination").PaginationMode;
    };
    prevText: StringConstructor;
    nextText: StringConstructor;
    pageCount: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    totalItems: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showPageSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    itemsPerPage: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    forceEllipses: BooleanConstructor;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: number;
    mode: import("./Pagination").PaginationMode;
    pageCount: string | number;
    totalItems: string | number;
    showPageSize: string | number;
    itemsPerPage: string | number;
    forceEllipses: boolean;
}>>;
export default Pagination;
export type { PaginationMode, PaginationProps } from './Pagination';
declare module 'vue' {
    interface GlobalComponents {
        VanPagination: typeof Pagination;
    }
}
