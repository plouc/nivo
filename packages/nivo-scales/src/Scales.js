/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import setDisplayName from 'recompose/setDisplayName'
import PropTypes from 'prop-types'

const Scales = ({ computedScales, children }) => <Fragment>{children(computedScales)}</Fragment>

Scales.propTypes = {
    children: PropTypes.func.isRequired,
    computedScales: PropTypes.object.isRequired,
}

const enhance = compose(
    withPropsOnChange(['scales'], ({ scales }) => {
        const computedScales = {}
        React.Children.forEach(scales, scale => {
            const { id, data, ...scaleProps } = scale.props

            computedScales[id] = scale.type.compute(id, data, scaleProps)
        })

        return { computedScales }
    })
)

export default setDisplayName('Scales')(enhance(Scales))
