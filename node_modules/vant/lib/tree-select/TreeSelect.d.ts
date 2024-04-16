import { type PropType, type ExtractPropTypes } from 'vue';
import { type Numeric } from '../utils';
export declare type TreeSelectChild = {
    id: Numeric;
    text: string;
    disabled?: boolean;
};
export declare type TreeSelectItem = {
    dot?: boolean;
    text: string;
    badge?: Numeric;
    children?: TreeSelectChild[];
    disabled?: boolean;
    className?: unknown;
};
declare const treeSelectProps: {
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    items: {
        type: PropType<TreeSelectItem[]>;
        default: () => never[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    selectedIcon: {
        type: PropType<string>;
        default: string;
    };
    mainActiveIndex: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    activeId: {
        type: PropType<Numeric | Numeric[]>;
        default: number;
    };
};
export declare type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>;
declare const _default: import("vue").DefineComponent<{
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    items: {
        type: PropType<TreeSelectItem[]>;
        default: () => never[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    selectedIcon: {
        type: PropType<string>;
        default: string;
    };
    mainActiveIndex: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    activeId: {
        type: PropType<Numeric | Numeric[]>;
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click-item" | "click-nav" | "update:activeId" | "update:mainActiveIndex")[], "click-item" | "click-nav" | "update:activeId" | "update:mainActiveIndex", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    items: {
        type: PropType<TreeSelectItem[]>;
        default: () => never[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    selectedIcon: {
        type: PropType<string>;
        default: string;
    };
    mainActiveIndex: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    activeId: {
        type: PropType<Numeric | Numeric[]>;
        default: number;
    };
}>> & {
    "onClick-item"?: ((...args: any[]) => any) | undefined;
    "onClick-nav"?: ((...args: any[]) => any) | undefined;
    "onUpdate:activeId"?: ((...args: any[]) => any) | undefined;
    "onUpdate:mainActiveIndex"?: ((...args: any[]) => any) | undefined;
}, {
    height: string | number;
    max: string | number;
    items: TreeSelectItem[];
    selectedIcon: string;
    mainActiveIndex: string | number;
    activeId: Numeric | Numeric[];
}>;
export default _default;
