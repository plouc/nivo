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

const LinePoints = ({
    points,

    symbol,
    size,
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
    const getLabel = enableLabel ? getLabelGenerator(label, labelFormat) : () => null

    if (animate !== true) {
        return (
            <g>
                {points.map(point => (
                    <DotsItem
                        key={point.id}
                        x={point.position.x}
                        y={point.position.y}
                        symbol={symbol}
                        size={size}
                        color={point.color}
                        borderWidth={borderWidth}
                        borderColor={borderColor(point)}
                        label={getLabel(point.data)}
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
                    key: point.id,
                    data: point,
                    style: {
                        x: spring(point.position.x, springConfig),
                        y: spring(point.position.y, springConfig),
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
                            color={point.color}
                            borderWidth={borderWidth}
                            borderColor={borderColor(point)}
                            label={getLabel(point.data)}
                            labelYOffset={labelYOffset}
                            theme={theme}
                        />
                    ))}
                </g>
            )}
        </TransitionMotion>
    )
}

LinePoints.propTypes = {
    points: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            serieId: PropTypes.string.isRequired,
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
            }).isRequired,
            data: PropTypes.shape({
                x: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                    PropTypes.instanceOf(Date),
                ]).isRequired,
                y: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                    PropTypes.instanceOf(Date),
                ]).isRequired,
            }).isRequired,
            color: PropTypes.string.isRequired,
        })
    ).isRequired,

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

LinePoints.defaultProps = {
    enableLabel: false,
    label: 'y',
}

export default LinePoints
