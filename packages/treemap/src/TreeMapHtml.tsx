import { createElement, Fragment, ReactNode } from 'react'
import { Container, useDimensions } from '@bitbloom/nivo-core'
import { useCustomLayerProps, useTreeMap } from './hooks'
import { TreeMapNodes } from './TreeMapNodes'
import { DefaultTreeMapDatum, TreeMapCommonProps, TreeMapHtmlProps, LayerId } from './types'
import { htmlDefaultProps, svgDefaultProps } from './defaults'

type InnerTreeMapHtmlProps<Datum extends object> = Omit<
    TreeMapHtmlProps<Datum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerTreeMapHtml = <Datum extends object>({
    data,
    identity = htmlDefaultProps.identity as TreeMapCommonProps<Datum>['identity'],
    value = htmlDefaultProps.value as TreeMapCommonProps<Datum>['value'],
    tile = htmlDefaultProps.tile,
    nodeComponent = htmlDefaultProps.nodeComponent,
    valueFormat,
    innerPadding = htmlDefaultProps.innerPadding,
    outerPadding = htmlDefaultProps.outerPadding,
    leavesOnly = htmlDefaultProps.leavesOnly,
    width,
    height,
    margin: partialMargin,
    layers = svgDefaultProps.layers as NonNullable<TreeMapHtmlProps<Datum>['layers']>,
    colors = htmlDefaultProps.colors as TreeMapCommonProps<Datum>['colors'],
    colorBy = htmlDefaultProps.colorBy as TreeMapCommonProps<Datum>['colorBy'],
    nodeOpacity = htmlDefaultProps.nodeOpacity,
    borderWidth = htmlDefaultProps.borderWidth,
    borderColor = htmlDefaultProps.borderColor as TreeMapCommonProps<Datum>['borderColor'],
    enableLabel = htmlDefaultProps.enableLabel,
    label = htmlDefaultProps.label as TreeMapCommonProps<Datum>['label'],
    labelTextColor = htmlDefaultProps.labelTextColor as TreeMapCommonProps<Datum>['labelTextColor'],
    orientLabel = htmlDefaultProps.orientLabel,
    labelSkipSize = htmlDefaultProps.labelSkipSize,
    enableParentLabel = htmlDefaultProps.enableParentLabel,
    parentLabel = htmlDefaultProps.parentLabel as TreeMapCommonProps<Datum>['parentLabel'],
    parentLabelSize = htmlDefaultProps.parentLabelSize,
    parentLabelPosition = htmlDefaultProps.parentLabelPosition,
    parentLabelPadding = htmlDefaultProps.parentLabelPadding,
    parentLabelTextColor = htmlDefaultProps.parentLabelTextColor as TreeMapCommonProps<Datum>['parentLabelTextColor'],
    isInteractive = htmlDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = htmlDefaultProps.tooltip as TreeMapCommonProps<Datum>['tooltip'],
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerTreeMapHtmlProps<Datum>) => {
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

    return (
        <div
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            style={{
                position: 'relative',
                width: outerWidth,
                height: outerHeight,
            }}
        >
            <div style={{ position: 'absolute', top: margin.top, left: margin.left }}>
                {layers.map((layer, i) => {
                    if (typeof layer === 'function') {
                        return <Fragment key={i}>{createElement(layer, customLayerProps)}</Fragment>
                    }

                    return layerById?.[layer] ?? null
                })}
            </div>
        </div>
    )
}

export const TreeMapHtml = <Datum extends object = DefaultTreeMapDatum>({
    isInteractive = htmlDefaultProps.isInteractive,
    animate = htmlDefaultProps.animate,
    motionConfig = htmlDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: TreeMapHtmlProps<Datum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerTreeMapHtml<Datum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
