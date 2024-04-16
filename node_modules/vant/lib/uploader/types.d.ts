import type { ComponentPublicInstance } from 'vue';
import type { ImageFit } from '../image';
import type { Numeric, Interceptor } from '../utils';
import type { UploaderProps } from './Uploader';
export declare type UploaderResultType = 'dataUrl' | 'text' | 'file';
export declare type UploaderFileListItem = {
    url?: string;
    file?: File;
    objectUrl?: string;
    content?: string;
    isImage?: boolean;
    status?: '' | 'uploading' | 'done' | 'failed';
    message?: string;
    imageFit?: ImageFit;
    deletable?: boolean;
    previewSize?: Numeric;
    beforeDelete?: Interceptor;
};
export declare type UploaderMaxSize = Numeric | ((file: File) => boolean);
export declare type UploaderBeforeRead = (file: File | File[], detail: {
    name: Numeric;
    index: number;
}) => boolean | undefined | Promise<File | File[] | undefined>;
export declare type UploaderAfterRead = (items: UploaderFileListItem | UploaderFileListItem[], detail: {
    name: Numeric;
    index: number;
}) => void;
export declare type UploaderExpose = {
    chooseFile: () => void;
    closeImagePreview: () => void;
};
export declare type UploaderInstance = ComponentPublicInstance<UploaderProps, UploaderExpose>;
