import { ComponentClass, ComponentType } from 'react';
export declare type Mapper<TInner, TOuter> = (input: TInner) => TOuter;
export declare type PredicateDiff<T> = (current: T, next: T) => boolean;
export interface InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> {
    <P extends TInjectedProps>(component: ComponentType<P>): ComponentClass<Omit<P, keyof TInjectedProps> & TNeedsProps>;
}
export declare type InferableComponentEnhancer<TInjectedProps> = InferableComponentEnhancerWithProps<TInjectedProps, {}>;
export declare type DefaultingInferableComponentEnhancer<TInjectedProps> = InferableComponentEnhancerWithProps<TInjectedProps, Partial<TInjectedProps>>;
//# sourceMappingURL=types.d.ts.map