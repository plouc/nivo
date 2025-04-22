import { cloneElement } from 'react'

// type ConditionalWrapperProps = {
//     children: ReactNode
//     condition: boolean
//     wrapper: ReactElement
// }

export const ConditionalWrapper = ({ children, condition, wrapper }) => {
    if (!condition) return children

    return cloneElement(wrapper, {}, children)
}
