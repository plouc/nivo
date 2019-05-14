/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useMotionConfig, blendModePropType } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import AreaTooltip from './AreaTooltip'
import AnimatedArea from './AnimatedArea'
import StaticArea from './StaticArea'

const Area = ({ serie, areaGenerator, blendMode, isInteractive, setCurrentSerie }) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const onMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(<AreaTooltip serie={serie} />, event)
            setCurrentSerie(serie.id)
        },
        [serie, showTooltipFromEvent, setCurrentSerie]
    )
    const onMouseMove = useCallback(
        event => {
            showTooltipFromEvent(<AreaTooltip serie={serie} />, event)
        },
        [serie, showTooltipFromEvent]
    )
    const onMouseLeave = useCallback(() => {
        hideTooltip()
        setCurrentSerie(null)
    }, [hideTooltip, setCurrentSerie])

    const { animate } = useMotionConfig()
    if (animate === true) {
        return (
            <AnimatedArea
                serie={serie}
                areaGenerator={areaGenerator}
                blendMode={blendMode}
                onMouseEnter={isInteractive ? onMouseEnter : undefined}
                onMouseMove={isInteractive ? onMouseMove : undefined}
                onMouseLeave={isInteractive ? onMouseLeave : undefined}
            />
        )
    }

    return (
        <StaticArea
            serie={serie}
            areaGenerator={areaGenerator}
            blendMode={blendMode}
            onMouseEnter={isInteractive ? onMouseEnter : undefined}
            onMouseMove={isInteractive ? onMouseMove : undefined}
            onMouseLeave={isInteractive ? onMouseLeave : undefined}
        />
    )
}

Area.propTypes = {
    serie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        style: PropTypes.shape({
            fillOpacity: PropTypes.number.isRequired,
            borderWidth: PropTypes.number.isRequired,
            borderOpacity: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    areaGenerator: PropTypes.func.isRequired,
    blendMode: blendModePropType.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    setCurrentSerie: PropTypes.func.isRequired,
}

export default memo(Area)
