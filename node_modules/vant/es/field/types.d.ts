import type { ComputedRef, ComponentPublicInstance } from 'vue';
import type { FieldProps } from './Field';
export declare type FieldType = 'tel' | 'url' | 'date' | 'file' | 'text' | 'time' | 'week' | 'color' | 'digit' | 'email' | 'image' | 'month' | 'radio' | 'range' | 'reset' | 'button' | 'hidden' | 'number' | 'search' | 'submit' | 'checkbox' | 'password' | 'textarea' | 'datetime-local';
export declare type FieldTextAlign = 'left' | 'center' | 'right';
export declare type FieldClearTrigger = 'always' | 'focus';
export declare type FieldFormatTrigger = 'onBlur' | 'onChange';
export declare type FieldValidateTrigger = 'onBlur' | 'onChange' | 'onSubmit';
export declare type FieldAutosizeConfig = {
    maxHeight?: number;
    minHeight?: number;
};
export declare type FieldValidateError = {
    name?: string;
    message: string;
};
export declare type FieldRuleMessage = string | ((value: any, rule: FieldRule) => string);
export declare type FieldRuleValidator = (value: any, rule: FieldRule) => boolean | string | Promise<boolean | string>;
export declare type FiledRuleFormatter = (value: any, rule: FieldRule) => string;
export declare type FieldRule = {
    pattern?: RegExp;
    trigger?: FieldValidateTrigger | FieldValidateTrigger[];
    message?: FieldRuleMessage;
    required?: boolean;
    validator?: FieldRuleValidator;
    formatter?: FiledRuleFormatter;
    validateEmpty?: boolean;
};
export declare type FieldValidationStatus = 'passed' | 'failed' | 'unvalidated';
export declare type FieldFormSharedProps = 'colon' | 'disabled' | 'readonly' | 'labelWidth' | 'labelAlign' | 'inputAlign' | 'errorMessageAlign';
export declare type FieldExpose = {
    blur: () => void | undefined;
    focus: () => void | undefined;
    validate: (rules?: FieldRule[] | undefined) => Promise<void | FieldValidateError>;
    resetValidation: () => void;
    getValidationStatus: () => FieldValidationStatus;
    /** @private */
    formValue: ComputedRef<unknown>;
};
export declare type FieldInstance = ComponentPublicInstance<FieldProps, FieldExpose>;
declare global {
    interface EventTarget {
        composing?: boolean;
    }
}
