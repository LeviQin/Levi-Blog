export declare const ConfigProvider: import("../utils").WithInstall<import("vue").DefineComponent<{
    tag: {
        type: import("vue").PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    zIndex: NumberConstructor;
    themeVars: import("vue").PropType<Record<string, import("../utils").Numeric>>;
    iconPrefix: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tag: {
        type: import("vue").PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    zIndex: NumberConstructor;
    themeVars: import("vue").PropType<Record<string, import("../utils").Numeric>>;
    iconPrefix: StringConstructor;
}>>, {
    tag: keyof HTMLElementTagNameMap;
}>>;
export default ConfigProvider;
export type { ConfigProviderProps } from './ConfigProvider';
declare module 'vue' {
    interface GlobalComponents {
        VanConfigProvider: typeof ConfigProvider;
    }
}
