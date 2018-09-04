/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import {
    motionPropTypes,
    getInheritedColorGenerator,
    dotsThemePropType,
    positionFromAngle,
    getLabelGenerator,
    DotsItem,
} from '@nivo/core'

export default class RadarDots extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        getIndex: PropTypes.func.isRequired,

        colorByKey: PropTypes.object.isRequired,

        radiusScale: PropTypes.func.isRequired,
        angleStep: PropTypes.number.isRequired,

        symbol: PropTypes.func,
        size: PropTypes.number.isRequired,
        color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

        enableLabel: PropTypes.bool.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        labelFormat: PropTypes.string,
        labelYOffset: PropTypes.number,

        theme: PropTypes.shape({
            dots: dotsThemePropType.isRequired,
        }).isRequired,

        ...motionPropTypes,
    }

    static defaultProps = {
        size: 6,
        color: 'inherit',
        borderWidth: 0,
        borderColor: 'inherit',
        enableLabel: false,
        label: 'value',
    }

    render() {
        const {
            data,
            keys,
            getIndex,

            colorByKey,

            radiusScale,
            angleStep,

            symbol,
            size,
            color,
            borderWidth,
            borderColor,

            enableLabel,
            label,
            labelFormat,
            labelYOffset,

            theme,

            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const fillColor = getInheritedColorGenerator(color)
        const strokeColor = getInheritedColorGenerator(borderColor)
        const getLabel = getLabelGenerator(label, labelFormat)

        const points = data.reduce((acc, datum, i) => {
            const index = getIndex(datum)
            keys.forEach(key => {
                const pointData = {
                    index,
                    key,
                    value: datum[key],
                    color: colorByKey[key],
                }
                acc.push({
                    key: `${key}.${index}`,
                    label: enableLabel ? getLabel(pointData) : null,
                    style: {
                        fill: fillColor(pointData),
                        stroke: strokeColor(pointData),
                        ...positionFromAngle(angleStep * i - Math.PI / 2, radiusScale(datum[key])),
                    },
                    data: pointData,
                })
            })

            return acc
        }, [])

        if (animate !== true) {
            return (
                <g>
                    {points.map(point => (
                        <DotsItem
                            key={point.key}
                            x={point.style.x}
                            y={point.style.y}
                            symbol={symbol}
                            size={size}
                            color={point.style.fill}
                            borderWidth={borderWidth}
                            borderColor={point.style.stroke}
                            label={point.label}
                            labelYOffset={labelYOffset}
                            theme={theme}
                        />
                    ))}
                </g>
            )
        }

        const springConfig = {
            motionDamping,
            motionStiffness,
        }

        return (
            <TransitionMotion
                styles={points.map(point => ({
                    key: point.key,
                    data: point,
                    style: {
                        x: spring(point.style.x, springConfig),
                        y: spring(point.style.y, springConfig),
                        size: spring(size, springConfig),
                    },
                }))}
            >
                {interpolatedStyles => (
                    <g>
                        {interpolatedStyles.map(({ key, style, data: point }) => (
                            <DotsItem
                                key={key}
                                {...style}
                                symbol={symbol}
                                color={point.style.fill}
                                borderWidth={borderWidth}
                                borderColor={point.style.stroke}
                                label={point.label}
                                labelYOffset={labelYOffset}
                                theme={theme}
                            />
                        ))}
                    </g>
                )}
            </TransitionMotion>
        )
    }
}
