import { Component, createFactory } from 'react'
import { polyfill } from 'react-lifecycles-compat'
import { setDisplayName } from './setDisplayName'
import { shallowEqual } from './shallowEqual'
import { InferableComponentEnhancerWithProps, Mapper, PredicateDiff } from './types'
import { pick } from './utils'
import { wrapDisplayName } from './wrapDisplayName'

export const withPropsOnChange = <TInner, TOuter extends Record<string, unknown>>(
    shouldMapOrKeys: string[] | PredicateDiff<TOuter>,
    propsMapper: Mapper<TOuter, TInner>
): InferableComponentEnhancerWithProps<TInner & TOuter, TOuter> => (BaseComponent: any): any => {
    const factory = createFactory(BaseComponent)
    const shouldMap =
        typeof shouldMapOrKeys === 'function'
            ? shouldMapOrKeys
            : (props: TOuter, nextProps: TOuter) =>
                  !shallowEqual(pick(props, shouldMapOrKeys), pick(nextProps, shouldMapOrKeys))

    class WithPropsOnChange extends Component<TOuter> {
        state = {
            computedProps: propsMapper(this.props),
            prevProps: this.props,
        }

        static getDerivedStateFromProps(nextProps: TOuter, prevState: WithPropsOnChange['state']) {
            if (shouldMap(prevState.prevProps, nextProps)) {
                return {
                    computedProps: propsMapper(nextProps),
                    prevProps: nextProps,
                }
            }

            return {
                prevProps: nextProps,
            }
        }

        render() {
            // @ts-expect-error due to how factory is typed
            return factory({
                ...this.props,
                ...this.state.computedProps,
            })
        }
    }

    polyfill(WithPropsOnChange)

    if (process.env.NODE_ENV !== 'production') {
        return setDisplayName(wrapDisplayName(BaseComponent, 'withPropsOnChange'))(
            WithPropsOnChange
        )
    }

    return WithPropsOnChange
}
