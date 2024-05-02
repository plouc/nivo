import { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions, SvgWrapper } from '@nivo/core'
import { DefaultDatum, LayerId, DendogramSvgProps } from './types'
import { svgDefaultProps } from './defaults'
import { useDendogram } from './hooks'
import { Links } from './Links'
import { Nodes } from './Nodes'

type InnerDendogramProps<Datum extends object> = Omit<
    DendogramSvgProps<Datum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerDendogram = <Datum extends object>({
    width,
    height,
    margin: partialMargin,
    data,
    identity,
    nodeComponent = svgDefaultProps.nodeComponent,
    layout = svgDefaultProps.layout,
    layers = svgDefaultProps.layers as LayerId[],
    isInteractive = svgDefaultProps.isInteractive,
    onNodeMouseEnter,
    onNodeMouseMove,
    onNodeMouseLeave,
    onNodeClick,
    nodeTooltip,
    role = svgDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerDendogramProps<Datum>) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, links } = useDendogram<Datum>({
        data,
        identity,
        layout,
        width: innerWidth,
        height: innerHeight,
    })

    const layerById: Record<LayerId, ReactNode> = {
        links: null,
        nodes: null,
        labels: null,
    }

    if (layers.includes('links')) {
        layerById.links = <Links key="links" links={links} />
    }

    if (layers.includes('nodes')) {
        layerById.nodes = (
            <Nodes<Datum>
                key="nodes"
                nodes={nodes}
                nodeComponent={nodeComponent}
                isInteractive={isInteractive}
                onMouseEnter={onNodeMouseEnter}
                onMouseMove={onNodeMouseMove}
                onMouseLeave={onNodeMouseLeave}
                onClick={onNodeClick}
                tooltip={nodeTooltip}
            />
        )
    }

    const customLayerProps = {} /*useCustomLayerProps<D>({
        cells,
        computedData,
    })*/

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

export const Dendogram = <Datum extends object = DefaultDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: DendogramSvgProps<Datum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerDendogram<Datum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
