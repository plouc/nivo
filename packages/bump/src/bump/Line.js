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
import { useMotionConfig } from '@nivo/core'
import { useSerieHandlers } from './hooks'
import AnimatedLine from './AnimatedLine'
import StaticLine from './StaticLine'

const Line = ({
    serie,
    lineGenerator,
    yStep,
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
    const LineComponent = animate ? AnimatedLine : StaticLine

    return React.createElement(LineComponent, {
        serie,
        lineGenerator,
        yStep,
        isInteractive,
        onMouseEnter: handlers.onMouseEnter,
        onMouseMove: handlers.onMouseMove,
        onMouseLeave: handlers.onMouseLeave,
        onClick: handlers.onClick,
    })
}

Line.propTypes = {
    serie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        style: PropTypes.shape({
            lineWidth: PropTypes.number.isRequired,
            opacity: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    lineGenerator: PropTypes.func.isRequired,
    yStep: PropTypes.number.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    setCurrentSerie: PropTypes.func.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
}

export default memo(Line)
