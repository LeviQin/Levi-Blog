import { type App } from 'vue';
import type { ToastType, ToastOptions, ToastWrapperInstance } from './types';
declare function Toast(options?: string | ToastOptions): ToastWrapperInstance;
declare namespace Toast {
    var loading: (options: string | ToastOptions) => ToastWrapperInstance;
    var success: (options: string | ToastOptions) => ToastWrapperInstance;
    var fail: (options: string | ToastOptions) => ToastWrapperInstance;
    var clear: (all?: boolean | undefined) => void;
    var setDefaultOptions: {
        (options: ToastOptions): void;
        (type: ToastType, options: ToastOptions): void;
    };
    var resetDefaultOptions: (type?: ToastType | undefined) => void;
    var allowMultiple: (value?: boolean) => void;
    var install: (app: App<any>) => void;
}
export { Toast };
