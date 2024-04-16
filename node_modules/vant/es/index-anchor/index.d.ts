export declare const IndexAnchor: import("../utils").WithInstall<import("vue").DefineComponent<{
    index: (NumberConstructor | StringConstructor)[];
}, (() => JSX.Element) | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    index: (NumberConstructor | StringConstructor)[];
}>>, {}>>;
export default IndexAnchor;
export type { IndexAnchorProps } from './IndexAnchor';
declare module 'vue' {
    interface GlobalComponents {
        VanIndexAnchor: typeof IndexAnchor;
    }
}
