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
import { line } from 'd3-shape'
import {
    SmartMotion,
    motionPropTypes,
    defaultAnimate,
    defaultMotionDamping,
    defaultMotionStiffness,
    curvePropType,
    curveFromProp,
} from '@nivo/core'

const LineSvg = ({
    data,
    generator,
    xScale,
    yScale,
    size,
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
        return <path d={pathDef} fill="none" strokeWidth={size} {...props} />
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
            {style => <path d={style.d} fill="none" strokeWidth={size} {...props} />}
        </SmartMotion>
    )
}

LineSvg.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        })
    ),
    generator: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    curve: curvePropType.isRequired,

    // style
    size: PropTypes.number.isRequired,

    // motion
    ...motionPropTypes,
}

const enhance = compose(
    defaultProps({
        curve: 'linear',

        // style
        size: 2,

        // motion
        animate: defaultAnimate,
        motionDamping: defaultMotionDamping,
        motionStiffness: defaultMotionStiffness,
    }),
    withPropsOnChange(['curve'], ({ curve }) => ({
        generator: line()
            .defined(d => d && d.x !== null && d.y !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve)),
    })),
    pure
)

export default setDisplayName('LineSvg')(enhance(LineSvg))
