import {
    SvgWrapper,
    Container,
    useDimensions,
    // @ts-ignore
    bindDefs,
} from '@nivo/core'
import { useTreeMap } from './hooks'
import { TreeMapNodes } from './TreeMapNodes'
import { DefaultTreeMapDatum, NodeComponent, TreeMapCommonProps, TreeMapSvgProps } from './types'
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
            <TreeMapNodes<Datum>
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
