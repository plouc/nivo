/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { withContainer, SvgWrapper, useDimensions, useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { BoxLegendSvg } from '@nivo/legends'
import { ChordPropTypes, ChordDefaultProps } from './props'
import { useChord, useChordSelection, useChordLayerContext } from './hooks'
import ChordRibbons from './ChordRibbons'
import ChordArcs from './ChordArcs'
import ChordLabels from './ChordLabels'

const Chord = ({
    margin: partialMargin,
    width,
    height,

    keys,
    matrix,
    label,
    valueFormat,
    innerRadiusRatio,
    innerRadiusOffset,
    padAngle,

    layers,

    colors,

    arcBorderWidth,
    arcBorderColor,
    arcOpacity,
    arcHoverOpacity,
    arcHoverOthersOpacity,
    arcTooltip,

    ribbonBorderWidth,
    ribbonBorderColor,
    ribbonBlendMode,
    ribbonOpacity,
    ribbonHoverOpacity,
    ribbonHoverOthersOpacity,
    ribbonTooltip,

    enableLabel,
    labelOffset,
    labelRotation,
    labelTextColor,

    isInteractive,
    onArcMouseEnter,
    onArcMouseMove,
    onArcMouseLeave,
    onArcClick,
    onRibbonMouseEnter,
    onRibbonMouseMove,
    onRibbonMouseLeave,
    onRibbonClick,

    legends,
}) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { center, radius, arcGenerator, ribbonGenerator, arcs, ribbons } = useChord({
        keys,
        matrix,
        label,
        valueFormat,
        width: innerWidth,
        height: innerHeight,
        innerRadiusRatio,
        innerRadiusOffset,
        padAngle,
        colors,
    })

    const { setCurrentArc, setCurrentRibbon, getArcOpacity, getRibbonOpacity } = useChordSelection({
        arcs,
        arcOpacity,
        arcHoverOpacity,
        arcHoverOthersOpacity,
        ribbons,
        ribbonOpacity,
        ribbonHoverOpacity,
        ribbonHoverOthersOpacity,
    })

    const theme = useTheme()
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)
    const getArcBorderColor = useInheritedColor(arcBorderColor, theme)
    const getRibbonBorderColor = useInheritedColor(ribbonBorderColor, theme)

    const layerContext = useChordLayerContext({
        center,
        radius,
        arcs,
        arcGenerator,
        ribbons,
        ribbonGenerator,
    })

    if (radius <= 0) return null

    const legendData = arcs.map(arc => ({
        id: arc.id,
        label: arc.label,
        color: arc.color,
    }))

    const layerById = {
        ribbons: (
            <g key="ribbons" transform={`translate(${center[0]}, ${center[1]})`}>
                <ChordRibbons
                    ribbons={ribbons}
                    ribbonGenerator={ribbonGenerator}
                    borderWidth={ribbonBorderWidth}
                    getBorderColor={getRibbonBorderColor}
                    getOpacity={getRibbonOpacity}
                    blendMode={ribbonBlendMode}
                    setCurrent={setCurrentRibbon}
                    isInteractive={isInteractive}
                    onMouseEnter={onRibbonMouseEnter}
                    onMouseMove={onRibbonMouseMove}
                    onMouseLeave={onRibbonMouseLeave}
                    onClick={onRibbonClick}
                    tooltip={ribbonTooltip}
                />
            </g>
        ),
        arcs: (
            <g key="arcs" transform={`translate(${center[0]}, ${center[1]})`}>
                <ChordArcs
                    arcs={arcs}
                    arcGenerator={arcGenerator}
                    borderWidth={arcBorderWidth}
                    getBorderColor={getArcBorderColor}
                    getOpacity={getArcOpacity}
                    setCurrent={setCurrentArc}
                    isInteractive={isInteractive}
                    onMouseEnter={onArcMouseEnter}
                    onMouseMove={onArcMouseMove}
                    onMouseLeave={onArcMouseLeave}
                    onClick={onArcClick}
                    tooltip={arcTooltip}
                />
            </g>
        ),
        labels: null,
        legends: (
            <Fragment key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={innerWidth}
                        containerHeight={innerHeight}
                        data={legendData}
                        theme={theme}
                    />
                ))}
            </Fragment>
        ),
    }

    if (enableLabel === true) {
        layerById.labels = (
            <g key="labels" transform={`translate(${center[0]}, ${center[1]})`}>
                <ChordLabels
                    arcs={arcs}
                    radius={radius + labelOffset}
                    rotation={labelRotation}
                    getColor={getLabelTextColor}
                />
            </g>
        )
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
            {layers.map((layer, i) => {
                if (layerById[layer] !== undefined) {
                    return layerById[layer]
                }
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{layer(layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

Chord.propTypes = ChordPropTypes
Chord.defaultProps = ChordDefaultProps

export default withContainer(Chord)
