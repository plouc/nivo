import { AriaAttributes, FunctionComponent, MouseEvent, MouseEventHandler } from 'react'
import {
    Box,
    Dimensions,
    Theme,
    ValueFormat,
    PropertyAccessor,
    ModernMotionProps,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { SpringValues } from '@react-spring/web'

export interface TreeMapDatum {
    children: TreeMapDatum[]
}

export interface DefaultTreeMapDatum {
    id: string
    value: string
    children: DefaultTreeMapDatum[]
}

export interface ComputedNode<Datum extends TreeMapDatum> {
    id: string
    path: string
    pathComponents: string[]
    data: Omit<Datum, 'children'>
    x: number
    y: number
    width: number
    height: number
    value: number
    formattedValue: number | string
    treeDepth: number
    treeHeight: number
    isParent: boolean
    isLeaf: boolean
    label: string | number
    parentLabel: string | number
    color: string
    fill?: string
    opacity: number
    borderColor: string
    labelTextColor: string
    labelRotation: number
    parentLabelTextColor: string
    parentLabelX: number
    parentLabelY: number
    parentLabelRotation: number
}

export type ComputedNodeWithoutStyles<Datum extends TreeMapDatum> = Omit<
    ComputedNode<Datum>,
    'color' | 'opacity' | 'borderColor' | 'labelTextColor' | 'parentLabelTextColor'
>

export interface ComputedNodeWithHandlers<Datum extends TreeMapDatum> extends ComputedNode<Datum> {
    onMouseEnter?: MouseEventHandler
    onMouseMove?: MouseEventHandler
    onMouseLeave?: MouseEventHandler
    onClick?: MouseEventHandler
}

export type NodeAnimatedProps = {
    x: number
    y: number
    width: number
    height: number
    color: string
    labelX: number
    labelY: number
    labelRotation: number
    labelOpacity: number
    parentLabelX: number
    parentLabelY: number
    parentLabelRotation: number
    parentLabelOpacity: number
}

export interface NodeProps<Datum extends TreeMapDatum> {
    node: ComputedNodeWithHandlers<Datum>
    animatedProps: SpringValues<NodeAnimatedProps>
    borderWidth: TreeMapCommonProps<Datum>['borderWidth']
    enableLabel: TreeMapCommonProps<Datum>['enableLabel']
    labelSkipSize: TreeMapCommonProps<Datum>['labelSkipSize']
    enableParentLabel: TreeMapCommonProps<Datum>['enableParentLabel']
}
export type NodeComponent<Datum extends TreeMapDatum> = FunctionComponent<NodeProps<Datum>>

export type TreeMapTile = 'binary' | 'squarify' | 'slice' | 'dice' | 'sliceDice' | 'resquarify'

export interface TooltipProps<Datum extends TreeMapDatum> {
    node: ComputedNode<Datum>
}
export type TooltipComponent<Datum extends TreeMapDatum> = FunctionComponent<TooltipProps<Datum>>

export type LayerId = 'nodes'

export interface CustomLayerProps<Datum extends TreeMapDatum> {
    nodes: ComputedNode<Datum>[]
}
export type CustomSvgLayer<Datum extends TreeMapDatum> = FunctionComponent<CustomLayerProps<Datum>>
export type CustomHtmlLayer<Datum extends TreeMapDatum> = FunctionComponent<CustomLayerProps<Datum>>
export type CustomCanvasLayer<Datum extends TreeMapDatum> = (
    ctx: CanvasRenderingContext2D,
    props: CustomLayerProps<Datum>
) => void

export type NodeMouseEventHandler<Datum extends TreeMapDatum> = (
    node: ComputedNode<Datum>,
    event: MouseEvent
) => void

export interface TreeMapDataProps<Datum extends TreeMapDatum> {
    data: Datum
}

export type TreeMapCommonProps<Datum extends TreeMapDatum> = {
    margin: Box

    identity: PropertyAccessor<Datum, string>
    value: PropertyAccessor<Datum, number>
    valueFormat: ValueFormat<number>

    tile: TreeMapTile
    leavesOnly: boolean
    innerPadding: number
    outerPadding: number

    enableLabel: boolean
    label: PropertyAccessor<Omit<ComputedNodeWithoutStyles<Datum>, 'label' | 'parentLabel'>, string>
    labelFormat: ValueFormat<number>
    labelSkipSize: number
    labelTextColor: InheritedColorConfig<any>
    orientLabel: boolean

    enableParentLabel: boolean
    parentLabel: PropertyAccessor<Omit<ComputedNodeWithoutStyles<Datum>, 'parentLabel'>, string>
    parentLabelSize: number
    parentLabelPosition: 'top' | 'right' | 'bottom' | 'left'
    parentLabelPadding: number
    parentLabelTextColor: InheritedColorConfig<any>

    theme: Theme
    colors: OrdinalColorScaleConfig<ComputedNodeWithoutStyles<Datum>>
    colorBy: any //colorPropertyAccessorPropType.isRequired,
    nodeOpacity: number
    borderWidth: number
    borderColor: InheritedColorConfig<
        ComputedNodeWithoutStyles<Datum> & {
            color: ComputedNode<Datum>['color']
        }
    >

    isInteractive: boolean
    tooltip: TooltipComponent<Datum>

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
} & ModernMotionProps

export type TreeMapSvgProps<Datum extends TreeMapDatum> = Partial<TreeMapCommonProps<Datum>> &
    TreeMapDataProps<Datum> &
    Dimensions & {
        nodeComponent?: NodeComponent<Datum>
        layers?: (LayerId | CustomSvgLayer<Datum>)[]
        defs?: any[]
        fill?: any[]
        onMouseEnter?: NodeMouseEventHandler<Datum>
        onMouseMove?: NodeMouseEventHandler<Datum>
        onMouseLeave?: NodeMouseEventHandler<Datum>
        onClick?: NodeMouseEventHandler<Datum>
    }

export type TreeMapHtmlProps<Datum extends TreeMapDatum> = Partial<TreeMapCommonProps<Datum>> &
    TreeMapDataProps<Datum> &
    Dimensions & {
        nodeComponent?: NodeComponent<Datum>
        layers?: (LayerId | CustomHtmlLayer<Datum>)[]
        pixelRatio?: number
        onMouseEnter?: NodeMouseEventHandler<Datum>
        onMouseMove?: NodeMouseEventHandler<Datum>
        onMouseLeave?: NodeMouseEventHandler<Datum>
        onClick?: NodeMouseEventHandler<Datum>
    }

export type TreeMapCanvasProps<Datum extends TreeMapDatum> = Partial<TreeMapCommonProps<Datum>> &
    TreeMapDataProps<Datum> &
    Dimensions & {
        layers?: (LayerId | CustomCanvasLayer<Datum>)[]
        pixelRatio?: number
        onMouseMove?: NodeMouseEventHandler<Datum>
        onClick?: NodeMouseEventHandler<Datum>
    }
