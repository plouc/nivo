import { InferableComponentEnhancerWithProps, Mapper } from './types';
declare type StateProps<TState, TStateName extends string, TStateUpdaterName extends string> = {
    [stateName in TStateName]: TState;
} & {
    [stateUpdateName in TStateUpdaterName]: (state: TState) => TState;
};
export declare const withState: <TOuter, TState, TStateName extends string, TStateUpdaterName extends string>(stateName: TStateName, stateUpdaterName: TStateUpdaterName, initialState: TState | Mapper<TOuter, TState>) => InferableComponentEnhancerWithProps<StateProps<TState, TStateName, TStateUpdaterName>, TOuter>;
export {};
//# sourceMappingURL=withState.d.ts.map