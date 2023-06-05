import { Component, createElement } from 'react'
import { setDisplayName } from './setDisplayName'
import { InferableComponentEnhancer, PredicateDiff } from './types'
import { wrapDisplayName } from './wrapDisplayName'

export const shouldUpdate =
    <TProps extends Record<string, unknown>>(
        test: PredicateDiff<TProps>
        // eslint-disable-next-line @typescript-eslint/ban-types
    ): InferableComponentEnhancer<{}> =>
    (BaseComponent: any): any => {
        const factory = (props: any) => createElement(BaseComponent, props)
        class ShouldUpdate extends Component {
            shouldComponentUpdate(nextProps: any) {
                // @ts-expect-error not type-able
                return test(this.props, nextProps)
            }

            render() {
                return factory(this.props)
            }
        }

        if (process.env.NODE_ENV !== 'production') {
            return setDisplayName(wrapDisplayName(BaseComponent, 'shouldUpdate'))(ShouldUpdate)
        }
        return ShouldUpdate
    }
