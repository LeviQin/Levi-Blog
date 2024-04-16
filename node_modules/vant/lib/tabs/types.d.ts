import type { ComponentPublicInstance, ComputedRef } from 'vue';
import type { Numeric } from '../utils';
import type { TabsProps } from './Tabs';
export declare type TabsType = 'line' | 'card';
export declare type TabsClickTabEventParams = {
    name: Numeric;
    title: string;
    event: MouseEvent;
    disabled: boolean;
};
export declare type TabsProvide = {
    id: string;
    props: TabsProps;
    setLine: () => void;
    onRendered: (name: Numeric, title?: string) => void;
    scrollIntoView: (immediate?: boolean) => void;
    currentName: ComputedRef<Numeric | undefined>;
};
export declare type TabsExpose = {
    resize: () => void;
    scrollTo: (name: Numeric) => void;
};
export declare type TabsInstance = ComponentPublicInstance<TabsProps, TabsExpose>;
