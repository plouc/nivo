import React, { createElement, Fragment, ReactNode } from 'react'
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { SvgProps, LayerId, DimensionDatum } from './types'
import { defaultProps } from './props'
import { useMarimekko } from './hooks'
import { Bars } from './Bars'

const InnerMarimekko = <RawDatum,>({
    data,
    id,
    value,
    dimensions,
    width,
    height,
    margin: partialMargin,
    layout = defaultProps.layout,
    layers = defaultProps.layers,
    colors = defaultProps.colors as OrdinalColorScaleConfig<
        Omit<DimensionDatum<RawDatum>, 'color'>
    >,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor as InheritedColorConfig<DimensionDatum<RawDatum>>,
    role,
}: SvgProps<RawDatum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { computedData } = useMarimekko<RawDatum>({
        data,
        id,
        value,
        colors,
        dimensions,
        layout,
        width: innerWidth,
        height: innerHeight,
    })

    const layerById: Record<LayerId, ReactNode> = {
        grid: null,
        axes: null,
        bars: null,
        legends: null,
    }

    layerById.bars = (
        <Bars<RawDatum>
            key="bars"
            data={computedData}
            borderWidth={borderWidth}
            borderColor={borderColor}
        />
    )

    const layerContext: any = {}

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            // defs={boundDefs}
            role={role}
        >
            {layers.map((layer, i) => {
                if (layerById[layer as LayerId] !== undefined) {
                    return layerById[layer as LayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export const Marimekko = <RawDatum,>(props: SvgProps<RawDatum>) => (
    <Container theme={props.theme} isInteractive={props.isInteractive} animate={props.animate}>
        <InnerMarimekko<RawDatum> {...props} />
    </Container>
)
