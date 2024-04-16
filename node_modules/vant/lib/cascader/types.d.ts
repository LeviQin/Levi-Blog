import type { Numeric } from '../utils';
export declare type CascaderOption = {
    text?: string;
    value?: Numeric;
    color?: string;
    disabled?: boolean;
    children?: CascaderOption[];
    className?: unknown;
    [key: PropertyKey]: any;
};
export declare type CascaderTab = {
    options: CascaderOption[];
    selected: CascaderOption | null;
};
export declare type CascaderFieldNames = {
    text?: string;
    value?: string;
    children?: string;
};
