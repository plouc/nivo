import { cloneElement } from 'react'
import PropTypes from 'prop-types'

// type ConditionalWrapperProps = {
//     children: JSX.Element
//     condition: boolean
//     wrapper: (children: JSX.Element) => JSX.Element
//   }

const ConditionalWrapper = ({ children, condition, wrapper }) =>
    condition ? cloneElement(wrapper(children)) : children

ConditionalWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    condition: PropTypes.bool.isRequired,
    wrapper: PropTypes.func.isRequired,
}

export default ConditionalWrapper
