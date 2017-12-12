/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
