/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { positionFromAngle, useTheme, useValueFormatter } from '@nivo/core'
import { TableTooltip, Chip, useTooltip } from '@nivo/tooltip'

const RadarTooltipItem = memo(
    ({
        datum,
        keys,
        index,
        colorByKey,
        radius,
        startAngle,
        endAngle,
        arcGenerator,
        tooltipFormat,
    }) => {
        const [isHover, setIsHover] = useState(false)
        const theme = useTheme()
        const { showTooltipFromEvent, hideTooltip } = useTooltip()

        const tooltipFormatter = useValueFormatter(tooltipFormat)
        const tooltip = useMemo(() => {
            const rows = keys.map(key => [
                <Chip key={key} color={colorByKey[key]} />,
                key,
                tooltipFormatter(datum[key], key),
            ])
            rows.sort((a, b) => a[2] - b[2])
            rows.reverse()

            return <TableTooltip title={<strong>{index}</strong>} rows={rows} theme={theme} />
        }, [datum, keys, index, colorByKey, theme, tooltipFormatter])
        const showItemTooltip = useCallback(
            event => {
                setIsHover(true)
                showTooltipFromEvent(tooltip, event)
            },
            [showTooltipFromEvent, tooltip]
        )
        const hideItemTooltip = useCallback(() => {
            setIsHover(false)
            hideTooltip()
        }, [hideTooltip, setIsHover])

        const { path, tipX, tipY } = useMemo(() => {
            const position = positionFromAngle(
                startAngle + (endAngle - startAngle) * 0.5 - Math.PI / 2,
                radius
            )

            return {
                path: arcGenerator({ startAngle, endAngle }),
                tipX: position.x,
                tipY: position.y,
            }
        }, [startAngle, endAngle, radius, arcGenerator])

        return (
            <>
                {isHover && <line x1={0} y1={0} x2={tipX} y2={tipY} style={theme.crosshair.line} />}
                <path
                    d={path}
                    fill="#F00"
                    fillOpacity={0}
                    onMouseEnter={showItemTooltip}
                    onMouseMove={showItemTooltip}
                    onMouseLeave={hideItemTooltip}
                />
            </>
        )
    }
)

RadarTooltipItem.displayName = 'RadarTooltipItem'
RadarTooltipItem.propTypes = {
    datum: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    colorByKey: PropTypes.object.isRequired,

    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,

    arcGenerator: PropTypes.func.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default RadarTooltipItem
