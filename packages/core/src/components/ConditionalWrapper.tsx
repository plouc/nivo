import { cloneElement } from 'react'
import { ConditionalWrapperProps } from './types'

export const ConditionalWrapper = ({ children, condition, wrapper }: ConditionalWrapperProps) => {
    if (!condition) return <>{children}</>
    return cloneElement(wrapper, {}, children)
}
