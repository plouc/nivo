import { createFactory } from 'react'
import { setDisplayName } from './setDisplayName'
import { DefaultingInferableComponentEnhancer } from './types'
import { wrapDisplayName } from './wrapDisplayName'

// eslint-disable-next-line @typescript-eslint/ban-types
export const defaultProps =
    <T = {}>(props: T): DefaultingInferableComponentEnhancer<T> =>
    (BaseComponent: any): any => {
        const factory = createFactory(BaseComponent)
        const DefaultProps = (ownerProps: any) => factory(ownerProps)
        DefaultProps.defaultProps = props
        if (process.env.NODE_ENV !== 'production') {
            return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(DefaultProps)
        }
        return DefaultProps
    }
