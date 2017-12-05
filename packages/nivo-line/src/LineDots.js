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
import { motionPropTypes } from '@nivo/core'
import { getLabelGenerator } from '@nivo/core'
import { DotsItem } from '@nivo/core'

const LineDots = ({
    lines,

    symbol,
    size,
    color,
    borderWidth,
    borderColor,

    // labels
    enableLabel,
    label,
    labelFormat,
    labelYOffset,

    // theming
    theme,

    // motion
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const getLabel = getLabelGenerator(label, labelFormat)

    const points = lines.reduce((acc, line) => {
        const { id, points } = line

        return [
            ...acc,
            ...points.filter(point => point.value !== null).map(point => {
                const pointData = {
                    serie: { id },
                    x: point.key,
                    y: point.value,
                }

                return {
                    key: `${id}.${point.x}`,
                    x: point.x,
                    y: point.y,
                    fill: color(line),
                    stroke: borderColor(line),
                    label: enableLabel ? getLabel(pointData) : null,
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

    // labels
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.string,
    labelYOffset: PropTypes.number,

    // theming
    theme: PropTypes.shape({
        dots: PropTypes.shape({
            textColor: PropTypes.string.isRequired,
            fontSize: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,

    // motion
    ...motionPropTypes,
}

LineDots.defaultProps = {
    // labels
    enableLabel: false,
    label: 'y',
}

export default LineDots
