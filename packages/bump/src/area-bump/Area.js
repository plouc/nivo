/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import { useTooltip } from '@nivo/tooltip'
import AreaTooltip from './AreaTooltip'

const Area = ({
    serie,
    areaGenerator,
    blendMode,
    setCurrentSerie
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const onMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(<AreaTooltip serie={serie}/>, event)
            setCurrentSerie(serie.id)
        },
        [serie, showTooltipFromEvent, setCurrentSerie]
    )
    const onMouseMove = useCallback(
        event => {
            showTooltipFromEvent(<AreaTooltip serie={serie}/>, event)
        },
        [serie, showTooltipFromEvent]
    )
    const onMouseLeave = useCallback(() => {
        hideTooltip()
        setCurrentSerie(null)
    }, [hideTooltip, setCurrentSerie])

    return (
        <>
            <path
                d={areaGenerator(serie.areaPoints)}
                fill={serie.color}
                fillOpacity={serie.style.fillOpacity}
                stroke={serie.color}
                strokeWidth={serie.style.borderWidth}
                strokeOpacity={serie.style.strokeOpacity}
                style={{ mixBlendMode: blendMode }}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            />
        </>
    )
}

Area.propTypes = {

}

export default memo(Area)
