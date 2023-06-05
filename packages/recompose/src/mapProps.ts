import { createElement } from 'react'
import { setDisplayName } from './setDisplayName'
import { InferableComponentEnhancerWithProps, Mapper } from './types'
import { wrapDisplayName } from './wrapDisplayName'

export const mapProps =
    <TInner, TOuter>(
        propsMapper: Mapper<TOuter, TInner>
    ): InferableComponentEnhancerWithProps<TInner, TOuter> =>
    (BaseComponent: any): any => {
        const factory = (props: any) => createElement(BaseComponent, props)
        const MapProps = (props: any) => factory(propsMapper(props))
        if (process.env.NODE_ENV !== 'production') {
            return setDisplayName(wrapDisplayName(BaseComponent, 'mapProps'))(MapProps)
        }
        return MapProps
    }
