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
import { useSpring, animated } from 'react-spring'
import { useMotionConfig, blendModePropType } from '@nivo/core'
import { useSerieHandlers } from './hooks'

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

    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        path: areaGenerator(serie.areaPoints),
        color: serie.color,
        fillOpacity: serie.style.fillOpacity,
        stroke: serie.style.borderColor,
        strokeOpacity: serie.style.borderOpacity,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            d={animatedProps.path}
            fill={serie.fill ? serie.fill : animatedProps.color}
            fillOpacity={animatedProps.fillOpacity}
            stroke={animatedProps.stroke}
            strokeWidth={serie.style.borderWidth}
            strokeOpacity={animatedProps.strokeOpacity}
            style={{ mixBlendMode: blendMode }}
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
        fill: PropTypes.string,
        areaPoints: PropTypes.array.isRequired,
        style: PropTypes.shape({
            fillOpacity: PropTypes.number.isRequired,
            borderWidth: PropTypes.number.isRequired,
            borderColor: PropTypes.string.isRequired,
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
