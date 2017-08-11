/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { range, max, maxBy, sumBy, uniq } from 'lodash'
import React from 'react'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import PropTypes from 'prop-types'
import { merge } from 'lodash'
import { Motion } from 'react-motion'
import { motionPropTypes } from '../../../props'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import SmartMotion from '../../SmartMotion'
import { lineRadial } from 'd3-shape'

const RadarShapes = ({
    data,
    lineGenerator,

    // border
    borderWidth,
    borderColor,

    // theming
    fillOpacity,

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    if (animate !== true) {
        return (
            <g>
                {data.map(serie => {
                    const { id, color, data: serieData } = serie

                    return (
                        <g key={id}>
                            <path
                                d={lineGenerator(serieData)}
                                fill={color}
                                fillOpacity={fillOpacity}
                                stroke={borderColor(serie)}
                                strokeWidth={borderWidth}
                            />
                        </g>
                    )
                })}
            </g>
        )
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <g>
            {data.map(serie => {
                const { id, color, data: serieData } = serie

                return (
                    <SmartMotion
                        key={id}
                        style={spring => ({
                            d: spring(lineGenerator(serieData), springConfig),
                            fill: spring(color, springConfig),
                            stroke: spring(borderColor(serie), springConfig),
                        })}
                    >
                        {style =>
                            <path fillOpacity={fillOpacity} strokeWidth={borderWidth} {...style} />}
                    </SmartMotion>
                )
            })}
        </g>
    )
}

RadarShapes.propTypes = {
    // data
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(PropTypes.number).isRequired,
        })
    ).isRequired,

    radiusScale: PropTypes.func.isRequired,
    angleStep: PropTypes.number.isRequired,

    curveInterpolator: PropTypes.func.isRequired,
    lineGenerator: PropTypes.func.isRequired,

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.func.isRequired,

    // theming
    fillOpacity: PropTypes.number.isRequired,

    // motion
    ...motionPropTypes,
}

const enhance = compose(
    withPropsOnChange(['borderColor'], props => ({
        borderColor: getInheritedColorGenerator(props.borderColor),
    })),
    withPropsOnChange(
        ['radiusScale', 'angleStep', 'curveInterpolator'],
        ({ radiusScale, angleStep, curveInterpolator }) => ({
            lineGenerator: lineRadial()
                .radius(d => radiusScale(d))
                .angle((d, i) => i * angleStep)
                .curve(curveInterpolator),
        })
    ),
    pure
)

export default enhance(RadarShapes)
