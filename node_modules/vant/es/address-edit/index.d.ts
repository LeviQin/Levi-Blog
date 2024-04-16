import { AddressEditProps } from './AddressEdit';
export declare const AddressEdit: import("../utils").WithInstall<import("vue").DefineComponent<{
    areaList: import("vue").PropType<import("..").AreaList>;
    isSaving: BooleanConstructor;
    isDeleting: BooleanConstructor;
    validator: import("vue").PropType<(key: string, value: string) => string | undefined>;
    showArea: {
        type: BooleanConstructor;
        default: true;
    };
    showDetail: {
        type: BooleanConstructor;
        default: true;
    };
    showDelete: BooleanConstructor;
    showPostal: BooleanConstructor;
    disableArea: BooleanConstructor;
    searchResult: import("vue").PropType<import("./types").AddressEditSearchItem[]>;
    telMaxlength: (NumberConstructor | StringConstructor)[];
    showSetDefault: BooleanConstructor;
    saveButtonText: StringConstructor;
    areaPlaceholder: StringConstructor;
    deleteButtonText: StringConstructor;
    showSearchResult: BooleanConstructor;
    detailRows: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    detailMaxlength: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    areaColumnsPlaceholder: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    addressInfo: {
        type: import("vue").PropType<Partial<import("./types").AddressEditInfo>>;
        default: () => import("./types").AddressEditInfo;
    };
    telValidator: {
        type: import("vue").PropType<(val: string) => boolean>;
        default: typeof import("../utils").isMobile;
    };
    postalValidator: {
        type: import("vue").PropType<(val: string) => boolean>;
        default: (value: string) => boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("focus" | "select-search" | "save" | "delete" | "click-area" | "change-area" | "change-detail" | "change-default")[], "focus" | "select-search" | "save" | "delete" | "click-area" | "change-area" | "change-detail" | "change-default", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    areaList: import("vue").PropType<import("..").AreaList>;
    isSaving: BooleanConstructor;
    isDeleting: BooleanConstructor;
    validator: import("vue").PropType<(key: string, value: string) => string | undefined>;
    showArea: {
        type: BooleanConstructor;
        default: true;
    };
    showDetail: {
        type: BooleanConstructor;
        default: true;
    };
    showDelete: BooleanConstructor;
    showPostal: BooleanConstructor;
    disableArea: BooleanConstructor;
    searchResult: import("vue").PropType<import("./types").AddressEditSearchItem[]>;
    telMaxlength: (NumberConstructor | StringConstructor)[];
    showSetDefault: BooleanConstructor;
    saveButtonText: StringConstructor;
    areaPlaceholder: StringConstructor;
    deleteButtonText: StringConstructor;
    showSearchResult: BooleanConstructor;
    detailRows: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    detailMaxlength: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    areaColumnsPlaceholder: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    addressInfo: {
        type: import("vue").PropType<Partial<import("./types").AddressEditInfo>>;
        default: () => import("./types").AddressEditInfo;
    };
    telValidator: {
        type: import("vue").PropType<(val: string) => boolean>;
        default: typeof import("../utils").isMobile;
    };
    postalValidator: {
        type: import("vue").PropType<(val: string) => boolean>;
        default: (value: string) => boolean;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    "onSelect-search"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    "onClick-area"?: ((...args: any[]) => any) | undefined;
    "onChange-area"?: ((...args: any[]) => any) | undefined;
    "onChange-detail"?: ((...args: any[]) => any) | undefined;
    "onChange-default"?: ((...args: any[]) => any) | undefined;
}, {
    isSaving: boolean;
    isDeleting: boolean;
    showArea: boolean;
    showDetail: boolean;
    showDelete: boolean;
    showPostal: boolean;
    disableArea: boolean;
    showSetDefault: boolean;
    showSearchResult: boolean;
    detailRows: string | number;
    detailMaxlength: string | number;
    areaColumnsPlaceholder: string[];
    addressInfo: Partial<import("./types").AddressEditInfo>;
    telValidator: (val: string) => boolean;
    postalValidator: (val: string) => boolean;
}>>;
export default AddressEdit;
export type { AddressEditProps };
export type { AddressEditInfo, AddressEditInstance, AddressEditSearchItem, } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanAddressEdit: typeof AddressEdit;
    }
}
