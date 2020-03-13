/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motionPropTypes, SmartMotion, getRelativeCursor } from '@nivo/core'
import { BasicTooltip, TableTooltip, Chip } from '@nivo/tooltip'

const StreamLayers = ({
    data,
    slices,
    layers,
    width,
    height,
    margin,

    fillOpacity,
    borderWidth,
    getBorderColor,
    theme,

    showTooltip,
    hideTooltip,
    getTooltipTitle,
    getTooltipLabel,
    getTooltipValue,
    onClick,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,

    animate,
    motionStiffness,
    motionDamping,

    enableStackTooltip,
}) => {
    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }
    const [pipeX, setPipeX] = useState(-1)

    return (
        <g style={theme.layers && theme.layers.style}>
            {layers.map((layer, i) => {
                const { path, color } = layer

                const handleHover = e => {
                    const [x, y] = getRelativeCursor(e.target, e)
                    const sep = slices.length > 1 ? width / (slices.length - 1) : 0
                    if (enableStackTooltip && sep && (x % sep <= 20 || sep - (x % sep) <= 20)) {
                        const iSlice = ((x / sep) | 0) + (sep / 2 > x % sep ? 0 : 1)
                        const rowStyles = new Array(layers.length)
                        if (theme.tooltip.hover) {
                            const lIdx = slices[iSlice].stack.findIndex(s => layer.id === s.id)
                            if (lIdx !== -1) rowStyles.splice(lIdx, 0, theme.tooltip.hover)
                        }
                        setPipeX(sep * iSlice)
                        showTooltip(
                            <TableTooltip
                                theme={theme}
                                title={getTooltipTitle(data[iSlice])}
                                rows={slices[iSlice].stack.map(p => [
                                    <Chip key={p.id} color={p.color} />,
                                    getTooltipLabel(p),
                                    getTooltipValue(p),
                                ])}
                                rowStyles={rowStyles}
                            />,
                            e
                        )
                    } else {
                        setPipeX(-1)
                        showTooltip(
                            <BasicTooltip
                                id={getTooltipLabel(layer)}
                                enableChip={true}
                                color={color}
                                theme={theme}
                            />,
                            e
                        )
                    }
                    onMouseMove && onMouseMove(layer, e)
                }
                const handleEnter = e => {
                    handleHover(e)
                    onMouseEnter && onMouseEnter(layer, e)
                }

                const handleLeave = e => {
                    setPipeX(-1)
                    hideTooltip(e)
                    onMouseLeave && onMouseLeave(layer, e)
                }

                return animate === true ? (
                    <SmartMotion
                        key={i}
                        style={spring => ({
                            d: spring(path, springConfig),
                            fill: spring(color, springConfig),
                            fillOpacity: spring(fillOpacity, springConfig),
                        })}
                    >
                        {style => (
                            <path
                                onMouseMove={handleHover}
                                onMouseEnter={handleEnter}
                                onMouseLeave={handleLeave}
                                onClick={e => onClick(layer, e)}
                                {...style}
                                fill={layer.fill ? layer.fill : style.fill}
                                stroke={getBorderColor(layer)}
                                strokeWidth={borderWidth}
                            />
                        )}
                    </SmartMotion>
                ) : (
                    <path
                        key={i}
                        onMouseMove={handleHover}
                        onMouseEnter={handleHover}
                        onMouseLeave={handleLeave}
                        onClick={e => onClick(layer, e)}
                        d={path}
                        fill={layer.fill ? layer.fill : layer.color}
                        fillOpacity={fillOpacity}
                        stroke={getBorderColor(layer)}
                        strokeWidth={borderWidth}
                    />
                )
            })}
            {pipeX >= 0 && (
                <line
                    x1={pipeX}
                    x2={pipeX}
                    y1={0}
                    y2={height}
                    stroke="#000"
                    strokeOpacity={0.35}
                    strokeWidth={1}
                    style={{ pointerEvents: 'none' }}
                />
            )}
        </g>
    )
}

StreamLayers.propTypes = {
    data: PropTypes.array.isRequired,
    slices: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            x: PropTypes.number.isRequired,
            stack: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    color: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    getTooltipTitle: PropTypes.func.isRequired,
    getTooltipLabel: PropTypes.func.isRequired,
    getTooltipValue: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    enableStackTooltip: PropTypes.bool.isRequired,
    ...motionPropTypes,
}

export default StreamLayers
