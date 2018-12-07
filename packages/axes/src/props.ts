/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'

export enum AxisLegendPosition {
    Start = 'start',
    Middle = 'middle',
    End = 'end',
}

export interface AxisConfig {
    tickValues?: number | number[] | string[] | Date[]
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: any // PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    renderTick?: (props: any) => React.ReactNode
    legend?: React.ReactNode
    legendPosition?: AxisLegendPosition
    legendOffset?: number
}

export interface AxisProps {
    tickValues?: number | number[] | string[] | Date[]
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: any // PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    renderTick?: (data: any) => React.ReactNode
    legend?: React.ReactNode
    legendPosition?: 'start' | 'middle' | 'end'
    legendOffset?: number
}

export const axisPropTypes = {
    ticksPosition: PropTypes.oneOf(['before', 'after']),
    tickValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
    ]),
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    tickRotation: PropTypes.number,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    renderTick: PropTypes.func,
    legend: PropTypes.node,
    legendPosition: PropTypes.oneOf(['start', 'middle', 'end']),
    legendOffset: PropTypes.number,
}

export const axisPropType = PropTypes.shape(axisPropTypes)
