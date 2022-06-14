import { ComponentClass, ComponentType } from 'react';
interface ComponentEnhancer<TInner, TOuter> {
    (component: ComponentType<TInner>): ComponentClass<TOuter>;
}
export declare const compose: <TInner, TOuter>(...funcs: Function[]) => ComponentEnhancer<TInner, TOuter>;
export {};
//# sourceMappingURL=compose.d.ts.map