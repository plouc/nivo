/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { getLabelGenerator, DotsItem, useTheme } from '@nivo/core'

const Points = ({ points, symbol, size, borderWidth, enableLabel, label, labelYOffset, width, height }) => {
    const theme = useTheme()
    const getLabel = getLabelGenerator(label)

    const mappedPoints = points.map(point => {
        const mappedPoint = {
            id: point.id,
            x: point.x,
            y: point.y,
            datum: point.data,
            fill: point.color,
            stroke: point.borderColor,
            label: enableLabel ? getLabel(point.data) : null,
        }

        return mappedPoint
    })

    const pointsArray = mappedPoints.map(point => (
        <DotsItem
            key={point.id}
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
    ));

    if ((width !== undefined && height !== undefined)) {
        return <svg x="0" y="0" width={width} height = {height} overflow="hidden"><g>{pointsArray}</g></svg>
    } else {
        return <g>{pointsArray}</g>;
    }
}

Points.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object),
    symbol: PropTypes.func,
    size: PropTypes.number.isRequired,
    color: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.func.isRequired,
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelYOffset: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
}

export default memo(Points)
