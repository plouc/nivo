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
import { useTransition, interpolate } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import ChordArc from './ChordArc'

const ChordArcs = ({
    arcs,
    borderWidth,
    getBorderColor,
    getOpacity,
    arcGenerator,
    setCurrent,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}) => {
    const { animate, config: springConfig } = useMotionConfig()
    const transitions = useTransition(arcs, arc => arc.id, {
        enter: arc => ({
            startAngle: arc.startAngle,
            endAngle: arc.endAngle,
            opacity: getOpacity(arc),
            color: arc.color,
        }),
        update: arc => ({
            startAngle: arc.startAngle,
            endAngle: arc.endAngle,
            opacity: getOpacity(arc),
            color: arc.color,
        }),
        unique: true,
        config: springConfig,
        immediate: !animate,
    })

    return transitions.map(({ key, item: arc, props }) => {
        const path = interpolate([props.startAngle, props.endAngle], (startAngle, endAngle) =>
            arcGenerator({ startAngle, endAngle })
        )

        return (
            <ChordArc
                key={key}
                arc={arc}
                color={arc.color}
                opacity={getOpacity(arc)}
                borderWidth={borderWidth}
                getBorderColor={getBorderColor}
                getOpacity={getOpacity}
                isInteractive={isInteractive}
                setCurrent={setCurrent}
                animatedProps={{
                    ...props,
                    path,
                }}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                tooltip={tooltip}
            />
        )
    })
}

ChordArcs.displayName = 'ChordArcs'
ChordArcs.propTypes = {
    arcs: PropTypes.array.isRequired,
    arcGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    getOpacity: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
}

export default memo(ChordArcs)
