import { createElement, Fragment, ReactNode } from 'react'
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import { svgDefaultProps } from './defaults'
import { useChord, useChordSelection, useCustomLayerProps } from './hooks'
import { ChordRibbons } from './ChordRibbons'
import { ChordArcs } from './ChordArcs'
import { ChordLabels } from './ChordLabels'
import { ChordSvgProps, LayerId } from './types'

type InnerChordProps = Omit<ChordSvgProps, 'animate' | 'motionConfig' | 'renderWrapper' | 'theme'>

const InnerChord = ({
    data,
    keys,
    label,
    valueFormat,

    margin: partialMargin,
    width,
    height,

    innerRadiusRatio = svgDefaultProps.innerRadiusRatio,
    innerRadiusOffset = svgDefaultProps.innerRadiusOffset,
    padAngle = svgDefaultProps.padAngle,

    layers = svgDefaultProps.layers,

    colors = svgDefaultProps.colors,

    arcBorderWidth = svgDefaultProps.arcBorderWidth,
    arcBorderColor = svgDefaultProps.arcBorderColor,
    arcOpacity = svgDefaultProps.arcOpacity,
    activeArcOpacity = svgDefaultProps.activeArcOpacity,
    inactiveArcOpacity = svgDefaultProps.inactiveArcOpacity,
    arcTooltip = svgDefaultProps.arcTooltip,

    ribbonBorderWidth = svgDefaultProps.ribbonBorderWidth,
    ribbonBorderColor = svgDefaultProps.ribbonBorderColor,
    ribbonBlendMode = svgDefaultProps.ribbonBlendMode,
    ribbonOpacity = svgDefaultProps.ribbonOpacity,
    activeRibbonOpacity = svgDefaultProps.activeRibbonOpacity,
    inactiveRibbonOpacity = svgDefaultProps.inactiveRibbonOpacity,
    ribbonTooltip = svgDefaultProps.ribbonTooltip,

    enableLabel = svgDefaultProps.enableLabel,
    labelOffset = svgDefaultProps.labelOffset,
    labelRotation = svgDefaultProps.labelRotation,
    labelTextColor = svgDefaultProps.labelTextColor,

    isInteractive = svgDefaultProps.isInteractive,
    onArcMouseEnter,
    onArcMouseMove,
    onArcMouseLeave,
    onArcClick,
    onRibbonMouseEnter,
    onRibbonMouseMove,
    onRibbonMouseLeave,
    onRibbonClick,

    legends = svgDefaultProps.legends,

    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerChordProps) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { center, radius, arcGenerator, ribbonGenerator, arcs, ribbons } = useChord({
        data,
        keys,
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
        activeArcOpacity,
        inactiveArcOpacity,
        ribbons,
        ribbonOpacity,
        activeRibbonOpacity,
        inactiveRibbonOpacity,
    })

    const customLayerProps = useCustomLayerProps({
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

    const layerById: Record<LayerId, ReactNode> = {
        ribbons: null,
        arcs: null,
        labels: null,
        legends: null,
    }

    if (layers.includes('ribbons')) {
        layerById.ribbons = (
            <g key="ribbons" transform={`translate(${center[0]}, ${center[1]})`}>
                <ChordRibbons
                    ribbons={ribbons}
                    ribbonGenerator={ribbonGenerator}
                    borderWidth={ribbonBorderWidth}
                    borderColor={ribbonBorderColor}
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
        )
    }

    if (layers.includes('arcs')) {
        layerById.arcs = (
            <g key="arcs" transform={`translate(${center[0]}, ${center[1]})`}>
                <ChordArcs
                    arcs={arcs}
                    arcGenerator={arcGenerator}
                    borderWidth={arcBorderWidth}
                    borderColor={arcBorderColor}
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
        )
    }

    if (layers.includes('labels') && enableLabel) {
        layerById.labels = (
            <g key="labels" transform={`translate(${center[0]}, ${center[1]})`}>
                <ChordLabels
                    arcs={arcs}
                    radius={radius + labelOffset}
                    rotation={labelRotation}
                    color={labelTextColor}
                />
            </g>
        )
    }

    if (layers.includes('legends') && legends.length > 0) {
        layerById.legends = (
            <Fragment key="legends">
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={innerWidth}
                        containerHeight={innerHeight}
                        data={legendData}
                    />
                ))}
            </Fragment>
        )
    }

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy}
            ariaDescribedBy={ariaDescribedBy}
        >
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, customLayerProps)}</Fragment>
                }

                return layerById?.[layer] ?? null
            })}
        </SvgWrapper>
    )
}

export const Chord = ({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: ChordSvgProps) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerChord isInteractive={isInteractive} {...otherProps} />
    </Container>
)
