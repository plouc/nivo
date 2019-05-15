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
import { useMotionConfig, blendModePropType } from '@nivo/core'
import { useSerieHandlers } from './hooks'
import AnimatedArea from './AnimatedArea'
import StaticArea from './StaticArea'

const Area = ({
    serie,
    areaGenerator,
    blendMode,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setCurrentSerie,
    tooltip,
}) => {
    const handlers = useSerieHandlers({
        serie,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        setCurrent: setCurrentSerie,
        tooltip,
    })

    const { animate } = useMotionConfig()
    if (animate === true) {
        return (
            <AnimatedArea
                serie={serie}
                areaGenerator={areaGenerator}
                blendMode={blendMode}
                onMouseEnter={handlers.onMouseEnter}
                onMouseMove={handlers.onMouseMove}
                onMouseLeave={handlers.onMouseLeave}
                onClick={handlers.onClick}
            />
        )
    }

    return (
        <StaticArea
            serie={serie}
            areaGenerator={areaGenerator}
            blendMode={blendMode}
            onMouseEnter={handlers.onMouseEnter}
            onMouseMove={handlers.onMouseMove}
            onMouseLeave={handlers.onMouseLeave}
            onClick={handlers.onClick}
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
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    setCurrentSerie: PropTypes.func.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
}

export default memo(Area)
