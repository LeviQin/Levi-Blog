export declare const Empty: import("../utils").WithInstall<import("vue").DefineComponent<{
    image: {
        type: import("vue").PropType<string>;
        default: string;
    };
    imageSize: import("vue").PropType<import("../utils").Numeric | [import("../utils").Numeric, import("../utils").Numeric]>;
    description: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    image: {
        type: import("vue").PropType<string>;
        default: string;
    };
    imageSize: import("vue").PropType<import("../utils").Numeric | [import("../utils").Numeric, import("../utils").Numeric]>;
    description: StringConstructor;
}>>, {
    image: string;
}>>;
export default Empty;
export type { EmptyProps } from './Empty';
declare module 'vue' {
    interface GlobalComponents {
        VanEmpty: typeof Empty;
    }
}
