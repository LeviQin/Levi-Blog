export declare const Skeleton: import("../utils").WithInstall<import("vue").DefineComponent<{
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
        type: import("vue").PropType<import("./Skeleton").SkeletonAvatarShape>;
        default: import("./Skeleton").SkeletonAvatarShape;
    };
    rowWidth: {
        type: import("vue").PropType<import("../utils").Numeric | import("../utils").Numeric[]>;
        default: string;
    };
}, () => JSX.Element | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
        type: import("vue").PropType<import("./Skeleton").SkeletonAvatarShape>;
        default: import("./Skeleton").SkeletonAvatarShape;
    };
    rowWidth: {
        type: import("vue").PropType<import("../utils").Numeric | import("../utils").Numeric[]>;
        default: string;
    };
}>>, {
    title: boolean;
    animate: boolean;
    round: boolean;
    loading: boolean;
    row: string | number;
    avatar: boolean;
    avatarShape: import("./Skeleton").SkeletonAvatarShape;
    rowWidth: import("../utils").Numeric | import("../utils").Numeric[];
}>>;
export default Skeleton;
export type { SkeletonProps, SkeletonAvatarShape } from './Skeleton';
declare module 'vue' {
    interface GlobalComponents {
        VanSkeleton: typeof Skeleton;
    }
}
