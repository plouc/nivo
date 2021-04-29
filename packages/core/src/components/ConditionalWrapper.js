import { cloneElement } from 'react'
import PropTypes from 'prop-types'

// type ConditionalWrapperProps = {
//     children: JSX.Element
//     condition: boolean
//     wrapper: (children: JSX.Element) => JSX.Element
//   }

export const ConditionalWrapper = ({ children, condition, wrapper }) => {
    if (!condition) return children

    return cloneElement(wrapper, {}, children)
}

ConditionalWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    condition: PropTypes.bool.isRequired,
    wrapper: PropTypes.element.isRequired,
}
