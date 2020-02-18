/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { positionFromAngle, useTheme } from '@nivo/core'

const RadarInnerGridItem = memo(({ radius, startAngle, endAngle, arcGenerator }) => {
    const theme = useTheme()
    const { tipX, tipY } = useMemo(() => {
        const position = positionFromAngle(
            startAngle + (endAngle - startAngle) * 0.5 - Math.PI / 2,
            radius
        )

        return {
            tipX: position.x,
            tipY: position.y,
        }
    }, [startAngle, endAngle, radius, arcGenerator])

    return (
        <>
            <line x1={0} y1={0} x2={tipX} y2={tipY} style={theme.crosshair.staticLine} />
        </>
    )
})

RadarInnerGridItem.displayName = 'RadarInnerGridItem'
RadarInnerGridItem.propTypes = {
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,

    arcGenerator: PropTypes.func.isRequired,
}

export default RadarInnerGridItem
