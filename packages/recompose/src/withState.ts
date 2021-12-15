import { createFactory, Component } from 'react'
import { setDisplayName } from './setDisplayName'
import { InferableComponentEnhancerWithProps, Mapper } from './types'
import { wrapDisplayName } from './wrapDisplayName'

type StateProps<TState, TStateName extends string, TStateUpdaterName extends string> = {
    [stateName in TStateName]: TState
} &
    { [stateUpdateName in TStateUpdaterName]: (state: TState) => TState }

export const withState =
    <TOuter, TState, TStateName extends string, TStateUpdaterName extends string>(
        stateName: TStateName,
        stateUpdaterName: TStateUpdaterName,
        initialState: TState | Mapper<TOuter, TState>
    ): InferableComponentEnhancerWithProps<
        StateProps<TState, TStateName, TStateUpdaterName>,
        TOuter
    > =>
    (BaseComponent: any): any => {
        const factory = createFactory(BaseComponent)
        class WithState extends Component {
            state = {
                stateValue:
                    typeof initialState === 'function'
                        ? // eslint-disable-next-line @typescript-eslint/ban-types
                          (initialState as Function)(this.props)
                        : initialState,
            }

            updateStateValue = (updateFn: any, callback: any) =>
                this.setState(
                    ({ stateValue }: any) => ({
                        stateValue:
                            typeof updateFn === 'function' ? updateFn(stateValue) : updateFn,
                    }),
                    callback
                )

            render() {
                // @ts-expect-error due to how factory is typed
                return factory({
                    ...this.props,
                    [stateName]: this.state.stateValue,
                    [stateUpdaterName]: this.updateStateValue,
                })
            }
        }

        if (process.env.NODE_ENV !== 'production') {
            return setDisplayName(wrapDisplayName(BaseComponent, 'withState'))(WithState)
        }
        return WithState
    }
