import { type PropType, type ExtractPropTypes } from 'vue';
import { type Numeric } from '../utils';
export declare type SkeletonAvatarShape = 'square' | 'round';
declare const skeletonProps: {
    row: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    title: BooleanConstructor;
    round: BooleanConstructor;
    avatar: BooleanConstructor;
    loading: {
        type: BooleanConstructor;
        default: true;
    };
    animate: {
        type: BooleanConstructor;
        default: true;
    };
    avatarSize: (NumberConstructor | StringConstructor)[];
    titleWidth: (NumberConstructor | StringConstructor)[];
    avatarShape: {
        type: PropType<SkeletonAvatarShape>;
        default: SkeletonAvatarShape;
    };
    rowWidth: {
        type: PropType<Numeric | Numeric[]>;
        default: string;
    };
};
export declare type SkeletonProps = ExtractPropTypes<typeof skeletonProps>;
declare const _default: import("vue").DefineComponent<{
    row: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    title: BooleanConstructor;
    round: BooleanConstructor;
    avatar: BooleanConstructor;
    loading: {
        type: BooleanConstructor;
        default: true;
    };
    animate: {
        type: BooleanConstructor;
        default: true;
    };
    avatarSize: (NumberConstructor | StringConstructor)[];
    titleWidth: (NumberConstructor | StringConstructor)[];
    avatarShape: {
        type: PropType<SkeletonAvatarShape>;
        default: SkeletonAvatarShape;
    };
    rowWidth: {
        type: PropType<Numeric | Numeric[]>;
        default: string;
    };
}, () => JSX.Element | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    row: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    title: BooleanConstructor;
    round: BooleanConstructor;
    avatar: BooleanConstructor;
    loading: {
        type: BooleanConstructor;
        default: true;
    };
    animate: {
        type: BooleanConstructor;
        default: true;
    };
    avatarSize: (NumberConstructor | StringConstructor)[];
    titleWidth: (NumberConstructor | StringConstructor)[];
    avatarShape: {
        type: PropType<SkeletonAvatarShape>;
        default: SkeletonAvatarShape;
    };
    rowWidth: {
        type: PropType<Numeric | Numeric[]>;
        default: string;
    };
}>>, {
    title: boolean;
    animate: boolean;
    round: boolean;
    loading: boolean;
    row: string | number;
    avatar: boolean;
    avatarShape: SkeletonAvatarShape;
    rowWidth: Numeric | Numeric[];
}>;
export default _default;
