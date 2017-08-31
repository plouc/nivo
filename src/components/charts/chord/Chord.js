/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { getColorRange } from '../../../lib/colors'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import enhance from './enhance'
import { ChordPropTypes } from './props'
import ChordRibbons from './ChordRibbons'
import ChordArcs from './ChordArcs'

const Chord = ({
    matrix,
    keys,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    ribbonOpacity,
    ribbonBorderWidth,
    arcOpacity,
    arcBorderWidth,

    chord, // computed
    arcGenerator, // computed
    ribbonGenerator, // computed

    // theming
    theme,
    colors,

    // interactivity
    isInteractive,
    arcHoverOpacity,
    arcHoverOthersOpacity,
    ribbonHoverOpacity,
    ribbonHoverOthersOpacity,

    // motion
    animate,
    motionDamping,
    motionStiffness,

    currentArc,
    setCurrentArc,
    currentRibbon,
    setCurrentRibbon,
}) => {
    const centerX = width / 2
    const centerY = height / 2

    const color = getColorRange(colors)

    const colorById = keys.reduce((acc, key) => {
        acc[key] = color(key)
        return acc
    }, {})

    const ribbons = chord(matrix)
    ribbons.forEach(ribbon => {
        ribbon.source.id = keys[ribbon.source.index]
        ribbon.source.color = colorById[ribbon.source.id]
        ribbon.target.id = keys[ribbon.target.index]
        ribbon.target.color = colorById[ribbon.target.id]
        const ribbonKeys = [ribbon.source.id, ribbon.target.id]
        ribbonKeys.sort()
        ribbon.key = ribbonKeys.sort().join('.')
    })

    const arcs = ribbons.groups.map(arc => {
        arc.key = arc.id = keys[arc.index]
        arc.color = colorById[arc.id]
        return arc
    })

    let getArcOpacity = () => arcOpacity
    let getRibbonOpacity = () => ribbonOpacity
    if (isInteractive) {
        if (currentArc) {
            getArcOpacity = arc => {
                if (arc.id === currentArc.id) return arcHoverOpacity
                return arcHoverOthersOpacity
            }
            getRibbonOpacity = ribbon => {
                if (ribbon.source.id === currentArc.id) return ribbonHoverOpacity
                return ribbonHoverOthersOpacity
            }
        } else if (currentRibbon) {
            getArcOpacity = arc => {
                if (arc.id === currentRibbon.source.id || arc.id === currentRibbon.target.id)
                    return arcHoverOpacity
                return arcHoverOthersOpacity
            }
            getRibbonOpacity = ribbon => {
                if (
                    ribbon.source.id === currentRibbon.source.id &&
                    ribbon.target.id === currentRibbon.target.id
                )
                    return ribbonHoverOpacity
                return ribbonHoverOthersOpacity
            }
        }
    }

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

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
                                getOpacity={getRibbonOpacity}
                                setCurrent={setCurrentRibbon}
                                theme={theme}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                {...motionProps}
                            />
                            <ChordArcs
                                arcs={arcs}
                                shapeGenerator={arcGenerator}
                                borderWidth={arcBorderWidth}
                                getOpacity={getArcOpacity}
                                setCurrent={setCurrentArc}
                                theme={theme}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                {...motionProps}
                            />
                        </g>
                    </SvgWrapper>
                )
            }}
        </Container>
    )
}

Chord.propTypes = ChordPropTypes

export default enhance(Chord)
