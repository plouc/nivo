/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Container, SvgWrapper } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import enhance from './enhance'
import setDisplayName from 'recompose/setDisplayName'
import { ChordPropTypes } from './props'
import ChordRibbons from './ChordRibbons'
import ChordArcs from './ChordArcs'
import ChordLabels from './ChordLabels'

const Chord = ({
    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    // arcs
    arcBorderWidth,
    getArcBorderColor,

    // ribbons
    ribbonBorderWidth,
    getRibbonBorderColor,

    // labels
    enableLabel,
    getLabel, // computed
    labelOffset,
    labelRotation,
    getLabelTextColor,

    arcGenerator, // computed
    ribbonGenerator, // computed

    // theming
    theme,

    // interactivity
    isInteractive,
    tooltipFormat,
    onClick,

    // motion
    animate,
    motionDamping,
    motionStiffness,

    ribbons, // computed
    arcs, // computed
    radius, // computed
    setCurrentArc,
    setCurrentRibbon,
    getArcOpacity,
    getRibbonOpacity,

    legends,
}) => {
    const centerX = width / 2
    const centerY = height / 2

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    const legendData = arcs.map(arc => ({
        label: arc.id,
        fill: arc.color,
    }))

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => {
                return (
                    <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                        <g transform={`translate(${centerX}, ${centerY})`}>
                            <ChordRibbons
                                ribbons={ribbons}
                                shapeGenerator={ribbonGenerator}
                                borderWidth={ribbonBorderWidth}
                                getBorderColor={getRibbonBorderColor}
                                getOpacity={getRibbonOpacity}
                                setCurrent={setCurrentRibbon}
                                theme={theme}
                                tooltipFormat={tooltipFormat}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                onClick={onClick}
                                {...motionProps}
                            />
                            <ChordArcs
                                arcs={arcs}
                                shapeGenerator={arcGenerator}
                                borderWidth={arcBorderWidth}
                                getBorderColor={getArcBorderColor}
                                getOpacity={getArcOpacity}
                                setCurrent={setCurrentArc}
                                theme={theme}
                                tooltipFormat={tooltipFormat}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                onClick={onClick}
                                {...motionProps}
                            />
                            {enableLabel && (
                                <ChordLabels
                                    arcs={arcs}
                                    radius={radius + labelOffset}
                                    rotation={labelRotation}
                                    getLabel={getLabel}
                                    getColor={getLabelTextColor}
                                    theme={theme}
                                    onClick={onClick}
                                    {...motionProps}
                                />
                            )}
                        </g>
                        {legends.map((legend, i) => (
                            <BoxLegendSvg
                                key={i}
                                {...legend}
                                containerWidth={width}
                                containerHeight={height}
                                data={legendData}
                            />
                        ))}
                    </SvgWrapper>
                )
            }}
        </Container>
    )
}

Chord.propTypes = ChordPropTypes

export default setDisplayName('Chord')(enhance(Chord))
