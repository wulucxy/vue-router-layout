import { Component } from 'vue';
declare type Layout = {
    name: string;
    props: Record<string, unknown>;
};
declare type Optional<Object, Key extends keyof Object> = Omit<Object, Key> & Partial<Pick<Object, Key>>;
declare function install(): void;
export declare function createRouterLayout(resolve: (layoutName: string) => Promise<Component | {
    default: Component;
}>): import("vue").DefineComponent<{}, {}, {
    layout: Layout;
    layouts: import("vue").ShallowReactive<Record<string, Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>>;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
declare const _default: {
    install: typeof install;
};
export default _default;
declare module '@vue/runtime-core' {
    interface ComponentCustomOptions {
        layout?: string | Optional<Layout, 'props'>;
    }
}
