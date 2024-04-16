import type { ComponentPublicInstance } from 'vue';
import type { Numeric } from '../utils';
import type { PickerProps } from './Picker';
export declare type PickerToolbarPosition = 'top' | 'bottom';
export declare type PickerFieldNames = {
    text?: string;
    values?: string;
    children?: string;
};
export declare type PickerObjectOption = {
    text?: Numeric;
    disabled?: boolean;
    [key: PropertyKey]: any;
};
export declare type PickerOption = Numeric | PickerObjectOption;
export declare type PickerObjectColumn = {
    values?: PickerOption[];
    children?: PickerColumn;
    className?: unknown;
    defaultIndex?: number;
    [key: PropertyKey]: any;
};
export declare type PickerColumn = PickerOption[] | PickerObjectColumn;
export declare type PickerExpose = {
    confirm: () => void;
    getValues: <T = PickerOption>() => T[];
    setValues: (values: string[]) => void;
    getIndexes: () => number[];
    setIndexes: (indexes: number[]) => void;
    getColumnIndex: (index: number) => number;
    setColumnIndex: (columnIndex: number, optionIndex: number) => void;
    getColumnValue: <T = PickerOption>(index: number) => T;
    setColumnValue: (index: number, value: string) => void;
    getColumnValues: <T = PickerOption>(index: number) => T[];
    setColumnValues: (index: number, options: PickerOption[]) => void;
};
export declare type PickerColumnProvide = {
    state: {
        index: number;
        offset: number;
        duration: number;
        options: PickerOption[];
    };
    setIndex: (index: number, emitChange?: boolean | undefined) => void;
    getValue: () => PickerOption;
    setValue: (value: string) => void;
    setOptions: (options: PickerOption[]) => void;
    stopMomentum: () => void;
};
export declare type PickerInstance = ComponentPublicInstance<PickerProps, PickerExpose>;
