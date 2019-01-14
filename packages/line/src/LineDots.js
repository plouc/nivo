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
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes, getLabelGenerator, dotsThemePropType, DotsItem } from '@nivo/core'

const LineDots = ({
    lines,

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
}) => {
    const getLabel = getLabelGenerator(label, labelFormat)

    const points = lines.reduce((acc, line) => {
        const { id, data } = line

        return [
            ...acc,
            ...data
                .filter(datum => datum.position.x !== null && datum.position.y !== null)
                .map(datum => {
                    return {
                        key: `${id}.${datum.data.x}`,
                        x: datum.position.x,
                        y: datum.position.y,
                        datum: datum,
                        fill: color(line),
                        stroke: borderColor(line),
                        label: enableLabel ? getLabel(datum.data) : null,
                    }
                }),
        ]
    }, [])

    if (animate !== true) {
        return (
            <g>
                {points.map(point => (
                    <DotsItem
                        key={point.key}
                        x={point.x}
                        y={point.y}
                        datum={point.datum}
                        symbol={symbol}
                        size={size}
                        color={point.fill}
                        borderWidth={borderWidth}
                        borderColor={point.stroke}
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
            styles={points.map(point => {
                return {
                    key: point.key,
                    data: point,
                    style: {
                        x: spring(point.x, springConfig),
                        y: spring(point.y, springConfig),
                        size: spring(size, springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(({ key, style, data: point }) => (
                        <DotsItem
                            key={key}
                            {...style}
                            symbol={symbol}
                            datum={point.datum}
                            color={point.fill}
                            borderWidth={borderWidth}
                            borderColor={point.stroke}
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

LineDots.propTypes = {
    lines: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ),

    symbol: PropTypes.func,
    size: PropTypes.number.isRequired,
    color: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.func.isRequired,

    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    labelYOffset: PropTypes.number,

    theme: PropTypes.shape({
        dots: dotsThemePropType.isRequired,
    }).isRequired,

    ...motionPropTypes,
}

LineDots.defaultProps = {
    // labels
    enableLabel: false,
    label: 'y',
}

export default LineDots
