/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import PropTypes from 'prop-types'
import { motionPropTypes } from '@nivo/core'
import { getInheritedColorGenerator } from '@nivo/core'
import { SmartMotion } from '@nivo/core'
import { lineRadial } from 'd3-shape'

const RadarShapes = ({
    data,
    keys,
    colorByKey,
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
                {keys.map(key => {
                    return (
                        <path
                            key={key}
                            d={lineGenerator(data.map(d => d[key]))}
                            fill={colorByKey[key]}
                            fillOpacity={fillOpacity}
                            stroke={borderColor({ key, color: colorByKey[key] })}
                            strokeWidth={borderWidth}
                        />
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
            {keys.map(key => {
                return (
                    <SmartMotion
                        key={key}
                        style={spring => ({
                            d: spring(lineGenerator(data.map(d => d[key])), springConfig),
                            fill: spring(colorByKey[key], springConfig),
                            stroke: spring(
                                borderColor({ key, color: colorByKey[key] }),
                                springConfig
                            ),
                        })}
                    >
                        {style => (
                            <path fillOpacity={fillOpacity} strokeWidth={borderWidth} {...style} />
                        )}
                    </SmartMotion>
                )
            })}
        </g>
    )
}

RadarShapes.propTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    colorByKey: PropTypes.object.isRequired,

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
