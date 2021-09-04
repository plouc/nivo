import { createElement, Fragment, ReactNode } from 'react'
import { SvgWrapper, Container, useDimensions } from '@nivo/core'
import { svgDefaultProps } from './props'
import { useFunnel } from './hooks'
import { Parts } from './Parts'
import { PartLabels } from './PartLabels'
import { Separators } from './Separators'
import { FunnelAnnotations } from './FunnelAnnotations'
import { FunnelDatum, FunnelLayerId, FunnelSvgProps } from './types'

type InnerFunnelProps<D extends FunnelDatum> = Omit<
    FunnelSvgProps<D>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerFunnel = <D extends FunnelDatum>({
    data,
    width,
    height,
    margin: partialMargin,
    direction = svgDefaultProps.direction,
    interpolation = svgDefaultProps.interpolation,
    spacing = svgDefaultProps.spacing,
    shapeBlending = svgDefaultProps.shapeBlending,
    valueFormat,
    colors = svgDefaultProps.colors,
    fillOpacity = svgDefaultProps.fillOpacity,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor,
    borderOpacity = svgDefaultProps.borderOpacity,
    enableLabel = svgDefaultProps.enableLabel,
    labelColor = svgDefaultProps.labelColor,
    enableBeforeSeparators = svgDefaultProps.enableBeforeSeparators,
    beforeSeparatorLength = svgDefaultProps.beforeSeparatorLength,
    beforeSeparatorOffset = svgDefaultProps.beforeSeparatorOffset,
    enableAfterSeparators = svgDefaultProps.enableAfterSeparators,
    afterSeparatorLength = svgDefaultProps.afterSeparatorLength,
    afterSeparatorOffset = svgDefaultProps.afterSeparatorOffset,
    layers = svgDefaultProps.layers,
    annotations = svgDefaultProps.annotations,
    isInteractive = svgDefaultProps.isInteractive,
    currentPartSizeExtension = svgDefaultProps.currentPartSizeExtension,
    currentBorderWidth,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerFunnelProps<D>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        areaGenerator,
        borderGenerator,
        parts,
        beforeSeparators,
        afterSeparators,
        customLayerProps,
    } = useFunnel<D>({
        data,
        width: innerWidth,
        height: innerHeight,
        direction,
        interpolation,
        spacing,
        shapeBlending,
        valueFormat,
        colors,
        fillOpacity,
        borderWidth,
        borderColor,
        borderOpacity,
        labelColor,
        enableBeforeSeparators,
        beforeSeparatorLength,
        beforeSeparatorOffset,
        enableAfterSeparators,
        afterSeparatorLength,
        afterSeparatorOffset,
        isInteractive,
        currentPartSizeExtension,
        currentBorderWidth,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    })

    const layerById: Record<FunnelLayerId, ReactNode> = {
        separators: null,
        parts: null,
        annotations: null,
        labels: null,
    }

    if (layers.includes('separators')) {
        layerById.separators = (
            <Separators
                key="separators"
                beforeSeparators={beforeSeparators}
                afterSeparators={afterSeparators}
            />
        )
    }

    if (layers.includes('parts')) {
        layerById.parts = (
            <Parts<D>
                key="parts"
                parts={parts}
                areaGenerator={areaGenerator}
                borderGenerator={borderGenerator}
            />
        )
    }

    if (layers?.includes('annotations')) {
        layerById.annotations = (
            <FunnelAnnotations<D> key="annotations" parts={parts} annotations={annotations} />
        )
    }

    if (layers.includes('labels') && enableLabel) {
        layerById.labels = <PartLabels<D> key="labels" parts={parts} />
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

export const Funnel = <D extends FunnelDatum = FunnelDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: FunnelSvgProps<D>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerFunnel<D> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
