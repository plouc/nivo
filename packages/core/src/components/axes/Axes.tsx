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
import { isEqual } from 'lodash'
import { shouldUpdate } from 'recompose'
import { motionPropTypes } from '../../props'
import { axisThemePropType, AxisTheme } from '../../theming'
import Axis, { axisPropType } from './Axis'

const horizontalPositions = ['top', 'bottom']
const verticalPositions = ['left', 'right']
const positions = [...horizontalPositions, ...verticalPositions]

export interface AxesProps {
    xScale: any
    yScale: any
    width: number
    height: number
    top?: any
    right?: any
    bottom?: any
    left?: any
    theme: {
        axis?: AxisTheme
    }
    animate: boolean
    motionStiffness: number
    motionDamping: number
}

const Axes: React.SFC<AxesProps> = ({
    xScale,
    yScale,
    width,
    height,
    top,
    right,
    bottom,
    left,
    theme,
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const axes = { top, right, bottom, left }

    return (
        <g>
            {positions.map(position => {
                const axis = axes[position]

                if (!axis) return null

                const scale = horizontalPositions.includes(position) ? xScale : yScale

                return (
                    <Axis
                        theme={theme}
                        {...axis}
                        key={position}
                        width={width}
                        height={height}
                        position={position}
                        scale={scale}
                        animate={animate}
                        motionDamping={motionDamping}
                        motionStiffness={motionStiffness}
                    />
                )
            })}
        </g>
    )
}

Axes.propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    top: axisPropType,
    right: axisPropType,
    bottom: axisPropType,
    left: axisPropType,
    theme: PropTypes.shape({
        axis: axisThemePropType.isRequired,
    }).isRequired,
    ...motionPropTypes,
}

export default shouldUpdate(
    (props: AxesProps, nextProps: AxesProps) =>
        props.xScale !== nextProps.xScale ||
        props.yScale !== nextProps.yScale ||
        props.width !== nextProps.width ||
        props.height !== nextProps.height ||
        props.theme !== nextProps.theme ||
        props.animate !== nextProps.animate ||
        props.motionDamping !== nextProps.motionDamping ||
        props.motionStiffness !== nextProps.motionStiffness ||
        !isEqual(props.top, nextProps.top) ||
        !isEqual(props.right, nextProps.right) ||
        !isEqual(props.bottom, nextProps.bottom) ||
        !isEqual(props.left, nextProps.left)
)(Axes)
