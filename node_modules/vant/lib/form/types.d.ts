import type { ComponentPublicInstance } from 'vue';
import type { FormProps } from './Form';
import type { FieldValidationStatus } from '../field';
export declare type FormExpose = {
    submit: () => void;
    validate: (name?: string | string[] | undefined) => Promise<void>;
    getValues: () => Record<string, unknown>;
    scrollToField: (name: string, options?: boolean | ScrollIntoViewOptions | undefined) => void;
    resetValidation: (name?: string | string[] | undefined) => void;
    getValidationStatus: () => Record<string, FieldValidationStatus>;
};
export declare type FormProvide = {
    props: FormProps;
};
export declare type FormInstance = ComponentPublicInstance<FormProps, FormExpose>;
