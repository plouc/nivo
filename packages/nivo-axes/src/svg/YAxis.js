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
import Axis from './Axis'

export default class YAxis extends PureComponent {
    static propTypes = {
        // generic
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        position: PropTypes.oneOf(['left', 'right']).isRequired,
        scale: PropTypes.func.isRequired,

        // ticks
        tickValues: PropTypes.array,
        tickCount: PropTypes.number,
        tickSize: PropTypes.number,
        tickPadding: PropTypes.number,
        tickRotation: PropTypes.number,
        format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

        theme: PropTypes.object.isRequired,
    }

    render() {
        const { width, height, scale, position, theme, ...extraProps } = this.props

        return (
            <Axis
                width={width}
                height={height}
                position={position}
                theme={theme}
                {...extraProps}
                scale={scale}
            />
        )
    }
}
