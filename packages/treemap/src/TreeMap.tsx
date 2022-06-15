import { createElement, Fragment, ReactNode } from 'react'
import { SvgWrapper, Container, useDimensions, bindDefs } from '@nivo/core'
import { useTreeMap, useCustomLayerProps } from './hooks'
import { TreeMapNodes } from './TreeMapNodes'
import {
    DefaultTreeMapDatum,
    NodeComponent,
    TreeMapCommonProps,
    TreeMapSvgProps,
    LayerId,
} from './types'
import { svgDefaultProps } from './defaults'

type InnerTreeMapProps<Datum extends object> = Omit<
    TreeMapSvgProps<Datum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerTreeMap = <Datum extends object>({
    data,
    identity = svgDefaultProps.identity as TreeMapCommonProps<Datum>['identity'],
    value = svgDefaultProps.value as TreeMapCommonProps<Datum>['value'],
    valueFormat,
    tile = svgDefaultProps.tile,
    nodeComponent = svgDefaultProps.nodeComponent as NodeComponent<Datum>,
    innerPadding = svgDefaultProps.innerPadding,
    outerPadding = svgDefaultProps.outerPadding,
    leavesOnly = svgDefaultProps.leavesOnly,
    width,
    height,
    margin: partialMargin,
    layers = svgDefaultProps.layers as NonNullable<TreeMapSvgProps<Datum>['layers']>,
    colors = svgDefaultProps.colors as TreeMapCommonProps<Datum>['colors'],
    colorBy = svgDefaultProps.colorBy as TreeMapCommonProps<Datum>['colorBy'],
    nodeOpacity = svgDefaultProps.nodeOpacity,
    borderWidth = svgDefaultProps.borderWidth,
    borderColor = svgDefaultProps.borderColor as TreeMapCommonProps<Datum>['borderColor'],
    defs = svgDefaultProps.defs,
    fill = svgDefaultProps.fill,
    enableLabel = svgDefaultProps.enableLabel,
    label = svgDefaultProps.label as TreeMapCommonProps<Datum>['label'],
    labelTextColor = svgDefaultProps.labelTextColor as TreeMapCommonProps<Datum>['labelTextColor'],
    orientLabel = svgDefaultProps.orientLabel,
    labelSkipSize = svgDefaultProps.labelSkipSize,
    enableParentLabel = svgDefaultProps.enableParentLabel,
    parentLabel = svgDefaultProps.parentLabel as TreeMapCommonProps<Datum>['parentLabel'],
    parentLabelSize = svgDefaultProps.parentLabelSize,
    parentLabelPosition = svgDefaultProps.parentLabelPosition,
    parentLabelPadding = svgDefaultProps.parentLabelPadding,
    parentLabelTextColor = svgDefaultProps.parentLabelTextColor as TreeMapCommonProps<Datum>['parentLabelTextColor'],
    isInteractive = svgDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = svgDefaultProps.tooltip as TreeMapCommonProps<Datum>['tooltip'],
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerTreeMapProps<Datum>) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes } = useTreeMap<Datum>({
        data,
        identity,
        value,
        valueFormat,
        leavesOnly,
        width: innerWidth,
        height: innerHeight,
        tile,
        innerPadding,
        outerPadding,
        colors,
        colorBy,
        nodeOpacity,
        borderColor,
        label,
        labelTextColor,
        orientLabel,
        enableParentLabel,
        parentLabel,
        parentLabelSize,
        parentLabelPosition,
        parentLabelPadding,
        parentLabelTextColor,
    })

    const layerById: Record<LayerId, ReactNode> = {
        nodes: null,
    }

    if (layers.includes('nodes')) {
        layerById.nodes = (
            <TreeMapNodes<Datum>
                key="nodes"
                nodes={nodes}
                nodeComponent={nodeComponent}
                borderWidth={borderWidth}
                enableLabel={enableLabel}
                labelSkipSize={labelSkipSize}
                enableParentLabel={enableParentLabel}
                isInteractive={isInteractive}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                tooltip={tooltip}
            />
        )
    }

    const customLayerProps = useCustomLayerProps<Datum>({ nodes })

    const boundDefs = bindDefs(defs, nodes, fill)

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            defs={boundDefs}
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

export const TreeMap = <Datum extends object = DefaultTreeMapDatum>({
    isInteractive = svgDefaultProps.isInteractive,
    animate = svgDefaultProps.animate,
    motionConfig = svgDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: TreeMapSvgProps<Datum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerTreeMap<Datum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
