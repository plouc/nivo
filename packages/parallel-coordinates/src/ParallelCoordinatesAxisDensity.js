/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { motionPropTypes } from '@nivo/core'
import ParallelCoordinatesAxisDensityCircles from './ParallelCoordinatesAxisDensityCircles'
import ParallelCoordinatesAxisDensityPoly from './ParallelCoordinatesAxisDensityPoly'

export default class ParallelCoordinatesAxisDensity extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(['circles', 'poly']).isRequired,
        axis: PropTypes.oneOf(['x', 'y']).isRequired,
        variable: PropTypes.shape({
            key: PropTypes.string.isRequired,
            densityBins: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                    size: PropTypes.number.isRequired,
                })
            ).isRequired,
        }).isRequired,
        variablesScale: PropTypes.func.isRequired,
        ...motionPropTypes,
    }

    static defaultProps = {
        type: 'circles',
    }

    render() {
        const { type, ...forwardProps } = this.props

        if (type === 'poly') {
            return <ParallelCoordinatesAxisDensityPoly {...forwardProps} />
        }

        return <ParallelCoordinatesAxisDensityCircles {...forwardProps} />
    }
}
