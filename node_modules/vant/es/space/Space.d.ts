import { ExtractPropTypes, PropType } from 'vue';
export declare type SpaceSize = number | string;
export declare type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';
declare const spaceProps: {
    align: PropType<SpaceAlign>;
    direction: {
        type: PropType<"vertical" | "horizontal">;
        default: string;
    };
    size: {
        type: PropType<string | number | [SpaceSize, SpaceSize]>;
        default: number;
    };
    wrap: BooleanConstructor;
    fill: BooleanConstructor;
};
export declare type SpaceProps = ExtractPropTypes<typeof spaceProps>;
declare const _default: import("vue").DefineComponent<{
    align: PropType<SpaceAlign>;
    direction: {
        type: PropType<"vertical" | "horizontal">;
        default: string;
    };
    size: {
        type: PropType<string | number | [SpaceSize, SpaceSize]>;
        default: number;
    };
    wrap: BooleanConstructor;
    fill: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    align: PropType<SpaceAlign>;
    direction: {
        type: PropType<"vertical" | "horizontal">;
        default: string;
    };
    size: {
        type: PropType<string | number | [SpaceSize, SpaceSize]>;
        default: number;
    };
    wrap: BooleanConstructor;
    fill: BooleanConstructor;
}>>, {
    fill: boolean;
    size: string | number | [SpaceSize, SpaceSize];
    wrap: boolean;
    direction: "vertical" | "horizontal";
}>;
export default _default;
