/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import setDisplayName from 'recompose/setDisplayName'
import { area } from 'd3-shape'
import {
    SmartMotion,
    motionPropTypes,
    defaultAnimate,
    defaultMotionDamping,
    defaultMotionStiffness,
    curvePropType,
    curveFromProp,
} from '@nivo/core'

const LineAreaSvg = ({
    data,
    generator,
    xScale,
    yScale,
    animate,
    motionDamping,
    motionStiffness,
    ...props
}) => {
    const pathDef = generator(
        data.map(d => ({
            x: d.x !== null ? xScale(d.x) : null,
            y: d.y !== null ? yScale(d.y) : null,
        }))
    )

    if (animate !== true) {
        return <path d={pathDef} fill="rgba(0, 0, 0, 0.2)" {...props} />
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <SmartMotion
            style={spring => ({
                d: spring(pathDef, springConfig),
            })}
        >
            {style => <path d={style.d} fill="rgba(0, 0, 0, 0.2)" {...props} />}
        </SmartMotion>
    )
}

LineAreaSvg.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        })
    ),
    generator: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,

    curve: curvePropType.isRequired,

    // motion
    ...motionPropTypes,
}

const enhance = compose(
    defaultProps({
        curve: 'linear',

        // motion
        animate: defaultAnimate,
        motionDamping: defaultMotionDamping,
        motionStiffness: defaultMotionStiffness,
    }),
    withPropsOnChange(['curve', 'height'], ({ curve, height }) => ({
        generator: area()
            .defined(d => d && d.x !== null && d.y !== null)
            .x(d => d.x)
            .y0(height)
            .y1(d => d.y)
            .curve(curveFromProp(curve)),
    })),
    pure
)

export default setDisplayName('LineAreaSvg')(enhance(LineAreaSvg))
