import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Scales = ({ scales, children }) => {
    const computedScales = {}
    React.Children.forEach(scales, scale => {
        const { id, data, ...scaleProps } = scale.props

        computedScales[id] = scale.type.compute(id, data, scaleProps)
    })

    return <Fragment>{children(computedScales)}</Fragment>
}

Scales.propTypes = {
    children: PropTypes.func.isRequired,
}

export default Scales
