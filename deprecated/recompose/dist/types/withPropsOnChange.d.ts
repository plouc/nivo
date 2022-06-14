import { InferableComponentEnhancerWithProps, Mapper, PredicateDiff } from './types';
export declare const withPropsOnChange: <TInner, TOuter extends Record<string, unknown>>(shouldMapOrKeys: string[] | PredicateDiff<TOuter>, propsMapper: Mapper<TOuter, TInner>) => InferableComponentEnhancerWithProps<TInner & TOuter, TOuter>;
//# sourceMappingURL=withPropsOnChange.d.ts.map