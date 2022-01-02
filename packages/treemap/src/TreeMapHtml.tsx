import { Container, useDimensions } from '@nivo/core'
import { useTreeMap } from './hooks'
import { TreeMapNodes } from './TreeMapNodes'
import { DefaultTreeMapDatum, TreeMapCommonProps, TreeMapDatum, TreeMapHtmlProps } from './types'
import { htmlDefaultProps } from './defaults'

type InnerTreeMapHtmlProps<Datum extends TreeMapDatum> = Omit<
    TreeMapHtmlProps<Datum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerTreeMapHtml = <Datum extends TreeMapDatum>({
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
    colors = htmlDefaultProps.colors as TreeMapCommonProps<Datum>['colors'],
    colorBy = htmlDefaultProps.colorBy,
    nodeOpacity = htmlDefaultProps.nodeOpacity,
    borderWidth = htmlDefaultProps.borderWidth,
    borderColor = htmlDefaultProps.borderColor as TreeMapCommonProps<Datum>['borderColor'],
    enableLabel = htmlDefaultProps.enableLabel,
    label = htmlDefaultProps.label as TreeMapCommonProps<Datum>['label'],
    labelTextColor = htmlDefaultProps.labelTextColor,
    orientLabel = htmlDefaultProps.orientLabel,
    labelSkipSize = htmlDefaultProps.labelSkipSize,
    enableParentLabel = htmlDefaultProps.enableParentLabel,
    parentLabel = htmlDefaultProps.parentLabel as TreeMapCommonProps<Datum>['parentLabel'],
    parentLabelSize = htmlDefaultProps.parentLabelSize,
    parentLabelPosition = htmlDefaultProps.parentLabelPosition,
    parentLabelPadding = htmlDefaultProps.parentLabelPadding,
    parentLabelTextColor = htmlDefaultProps.parentLabelTextColor,
    isInteractive = htmlDefaultProps.isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = htmlDefaultProps.tooltip as unknown as TreeMapCommonProps<Datum>['tooltip'],
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
            </div>
        </div>
    )
}

export const TreeMapHtml = <Datum extends TreeMapDatum = DefaultTreeMapDatum>({
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
