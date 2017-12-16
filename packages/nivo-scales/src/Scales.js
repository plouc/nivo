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
import pure from 'recompose/pure'
import PropTypes from 'prop-types'
import { LinearScalePropType, PointScalePropType, TimeScalePropType } from './propsTypes'
import { scalesFromConfig } from './scaleByType'

const Scales = ({ computedScales, children }) => <Fragment>{children(computedScales)}</Fragment>

Scales.propTypes = {
    children: PropTypes.func.isRequired,
    computedScales: PropTypes.object.isRequired,
    scales: PropTypes.arrayOf(
        PropTypes.oneOfType([LinearScalePropType, PointScalePropType, TimeScalePropType])
    ).isRequired,
}

const enhance = compose(
    setDisplayName('Scales'),
    withPropsOnChange(['scales'], ({ scales }) => ({
        computedScales: scalesFromConfig(scales),
    })),
    pure
)

export default enhance(Scales)
