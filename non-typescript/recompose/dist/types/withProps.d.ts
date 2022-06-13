import { InferableComponentEnhancerWithProps, Mapper } from './types';
export declare const withProps: <TInner, TOuter>(createProps: TInner | Mapper<TOuter, TInner>) => InferableComponentEnhancerWithProps<TInner & TOuter, TOuter>;
//# sourceMappingURL=withProps.d.ts.map