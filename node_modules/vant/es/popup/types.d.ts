import type { Ref, ComponentPublicInstance } from 'vue';
import type { PopupProps } from './Popup';
export declare type PopupPosition = 'top' | 'left' | 'bottom' | 'right' | 'center' | '';
export declare type PopupCloseIconPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export declare type PopupExpose = {
    popupRef: Ref<HTMLElement>;
};
export declare type PopupInstance = ComponentPublicInstance<PopupProps, PopupExpose>;
