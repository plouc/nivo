/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback, useMemo } from 'react'
import { useTooltip } from '@nivo/tooltip'
import LineTooltip from './LineTooltip'

const Line = ({ serie, lineGenerator, yScale, getStyle, setCurrentSerie }) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const onMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(<LineTooltip serie={serie} />, event)
            setCurrentSerie(serie.id)
        },
        [serie, showTooltipFromEvent, setCurrentSerie]
    )
    const onMouseMove = useCallback(
        event => {
            showTooltipFromEvent(<LineTooltip serie={serie} />, event)
        },
        [serie, showTooltipFromEvent]
    )
    const onMouseLeave = useCallback(() => {
        hideTooltip()
        setCurrentSerie(null)
    }, [hideTooltip, setCurrentSerie])
    const path = useMemo(() => lineGenerator(serie.linePoints), [serie.linePoints])

    const { lineWidth, opacity } = getStyle(serie)

    if (lineWidth <= 0) return null

    return (
        <>
            <path
                fill="none"
                stroke={serie.color}
                strokeWidth={lineWidth}
                d={path}
                strokeLinecap="round"
                strokeOpacity={opacity}
                style={{
                    pointerEvents: 'none'
                }}
            />
            <path
                fill="none"
                stroke="red"
                strokeOpacity={0}
                strokeWidth={yScale.step()}
                d={path}
                strokeLinecap="butt"
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            />
        </>
    )
}

export default memo(Line)
