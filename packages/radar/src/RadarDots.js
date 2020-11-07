/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTheme, positionFromAngle, getLabelGenerator, DotsItem } from '@nivo/core'
import { getInheritedColorGenerator, inheritedColorPropType } from '@nivo/colors'

const RadarDots = ({
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
}) => {
    const theme = useTheme()
    const fillColor = getInheritedColorGenerator(color, theme)
    const strokeColor = getInheritedColorGenerator(borderColor, theme)
    const getLabel = getLabelGenerator(label, labelFormat)

    const points = useMemo(
        () =>
            data.reduce((acc, datum, i) => {
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
                            ...positionFromAngle(
                                angleStep * i - Math.PI / 2,
                                radiusScale(datum[key])
                            ),
                        },
                        data: pointData,
                    })
                })

                return acc
            }, []),
        [
            data,
            getIndex,
            colorByKey,
            enableLabel,
            getLabel,
            fillColor,
            strokeColor,
            angleStep,
            radiusScale,
        ]
    )

    return points.map(point => (
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
            datum={point.data}
        />
    ))
}

RadarDots.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    getIndex: PropTypes.func.isRequired,
    colorByKey: PropTypes.object.isRequired,
    radiusScale: PropTypes.func.isRequired,
    angleStep: PropTypes.number.isRequired,
    symbol: PropTypes.func,
    size: PropTypes.number.isRequired,
    color: inheritedColorPropType.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.string,
    labelYOffset: PropTypes.number,
}
RadarDots.defaultProps = {
    size: 6,
    color: { from: 'color' },
    borderWidth: 0,
    borderColor: { from: 'color' },
    enableLabel: false,
    label: 'value',
}

export default RadarDots
