import type { ComponentPublicInstance } from 'vue';
import type { Numeric } from '../utils';
import type { IndexBarProps } from './IndexBar';
export declare type IndexBarProvide = {
    props: IndexBarProps;
};
export declare type IndexBarExpose = {
    scrollTo: (index: Numeric) => void;
};
export declare type IndexBarInstance = ComponentPublicInstance<IndexBarProps, IndexBarExpose>;
