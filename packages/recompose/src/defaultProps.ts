import { createElement } from 'react'
import { setDisplayName } from './setDisplayName'
import { DefaultingInferableComponentEnhancer } from './types'
import { wrapDisplayName } from './wrapDisplayName'

// eslint-disable-next-line @typescript-eslint/ban-types
export const defaultProps = <T = {}>(props: T): DefaultingInferableComponentEnhancer<T> => (
    BaseComponent: any
): any => {
    const factory = (props: any) => createElement(BaseComponent, props)
    const DefaultProps = (ownerProps: any) => factory(ownerProps)
    DefaultProps.defaultProps = props
    if (process.env.NODE_ENV !== 'production') {
        return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(DefaultProps)
    }
    return DefaultProps
}
