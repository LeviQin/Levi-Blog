import { type PropType, type InjectionKey, type ExtractPropTypes } from 'vue';
import { type Numeric } from '../utils';
export declare type ConfigProviderProvide = {
    iconPrefix?: string;
};
export declare const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderProvide>;
declare const configProviderProps: {
    tag: {
        type: PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    zIndex: NumberConstructor;
    themeVars: PropType<Record<string, Numeric>>;
    iconPrefix: StringConstructor;
};
export declare type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;
declare const _default: import("vue").DefineComponent<{
    tag: {
        type: PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    zIndex: NumberConstructor;
    themeVars: PropType<Record<string, Numeric>>;
    iconPrefix: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    tag: {
        type: PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    zIndex: NumberConstructor;
    themeVars: PropType<Record<string, Numeric>>;
    iconPrefix: StringConstructor;
}>>, {
    tag: keyof HTMLElementTagNameMap;
}>;
export default _default;
