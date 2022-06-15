import { AriaAttributes, FunctionComponent, MouseEvent, MouseEventHandler } from 'react'
import { SpringValues } from '@react-spring/web'
import {
    Box,
    Dimensions,
    Theme,
    ValueFormat,
    PropertyAccessor,
    ModernMotionProps,
    SvgDefsAndFill,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig, DatumIdentityAccessor } from '@nivo/colors'
import { TileType } from './tiling'

export interface DefaultTreeMapDatum {
    id: string
    value?: number
    children?: DefaultTreeMapDatum[]
}

export type ComputedNode<Datum extends object> = {
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

export type ComputedNodeWithoutStyles<Datum extends object> = Omit<
    ComputedNode<Datum>,
    'color' | 'opacity' | 'borderColor' | 'labelTextColor' | 'parentLabelTextColor'
>

export interface ComputedNodeWithHandlers<Datum extends object> extends ComputedNode<Datum> {
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

export interface NodeProps<Datum extends object> {
    node: ComputedNodeWithHandlers<Datum>
    animatedProps: SpringValues<NodeAnimatedProps>
    borderWidth: TreeMapCommonProps<Datum>['borderWidth']
    enableLabel: TreeMapCommonProps<Datum>['enableLabel']
    labelSkipSize: TreeMapCommonProps<Datum>['labelSkipSize']
    enableParentLabel: TreeMapCommonProps<Datum>['enableParentLabel']
}
export type NodeComponent<Datum extends object> = FunctionComponent<NodeProps<Datum>>

export interface TooltipProps<Datum extends object> {
    node: ComputedNode<Datum>
}
export type TooltipComponent<Datum extends object> = FunctionComponent<TooltipProps<Datum>>

export type LayerId = 'nodes'

export interface CustomLayerProps<Datum extends object> {
    nodes: ComputedNode<Datum>[]
}
export type CustomSvgLayer<Datum extends object> = FunctionComponent<CustomLayerProps<Datum>>
export type CustomHtmlLayer<Datum extends object> = FunctionComponent<CustomLayerProps<Datum>>
export type CustomCanvasLayer<Datum extends object> = (
    ctx: CanvasRenderingContext2D,
    props: CustomLayerProps<Datum>
) => void

export type NodeMouseEventHandler<Datum extends object> = (
    node: ComputedNode<Datum>,
    event: MouseEvent
) => void

export interface TreeMapDataProps<Datum extends object> {
    data: Datum
}

export type TreeMapCommonProps<Datum extends object> = {
    margin: Box

    identity: PropertyAccessor<Datum, string>
    value: PropertyAccessor<Datum, number>
    valueFormat: ValueFormat<number>

    tile: TileType
    leavesOnly: boolean
    innerPadding: number
    outerPadding: number

    enableLabel: boolean
    label: PropertyAccessor<Omit<ComputedNodeWithoutStyles<Datum>, 'label' | 'parentLabel'>, string>
    labelFormat: ValueFormat<number>
    labelSkipSize: number
    labelTextColor: InheritedColorConfig<
        ComputedNodeWithoutStyles<Datum> & {
            color: ComputedNode<Datum>['color']
        }
    >
    orientLabel: boolean

    enableParentLabel: boolean
    parentLabel: PropertyAccessor<Omit<ComputedNodeWithoutStyles<Datum>, 'parentLabel'>, string>
    parentLabelSize: number
    parentLabelPosition: 'top' | 'right' | 'bottom' | 'left'
    parentLabelPadding: number
    parentLabelTextColor: InheritedColorConfig<
        ComputedNodeWithoutStyles<Datum> & {
            color: ComputedNode<Datum>['color']
        }
    >

    theme: Theme
    colors: OrdinalColorScaleConfig<ComputedNodeWithoutStyles<Datum>>
    colorBy: string | DatumIdentityAccessor<ComputedNodeWithoutStyles<Datum>>
    nodeOpacity: number
    borderWidth: number
    borderColor: InheritedColorConfig<
        ComputedNodeWithoutStyles<Datum> & {
            color: ComputedNode<Datum>['color']
        }
    >

    isInteractive: boolean
    onMouseEnter: NodeMouseEventHandler<Datum>
    onMouseMove: NodeMouseEventHandler<Datum>
    onMouseLeave: NodeMouseEventHandler<Datum>
    onClick: NodeMouseEventHandler<Datum>
    tooltip: TooltipComponent<Datum>

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
} & ModernMotionProps

export type TreeMapSvgProps<Datum extends object> = Partial<TreeMapCommonProps<Datum>> &
    TreeMapDataProps<Datum> &
    Dimensions &
    SvgDefsAndFill<ComputedNode<Datum>> & {
        nodeComponent?: NodeComponent<Datum>
        layers?: (LayerId | CustomSvgLayer<Datum>)[]
    }

export type TreeMapHtmlProps<Datum extends object> = Partial<TreeMapCommonProps<Datum>> &
    TreeMapDataProps<Datum> &
    Dimensions & {
        nodeComponent?: NodeComponent<Datum>
        layers?: (LayerId | CustomHtmlLayer<Datum>)[]
    }

export type TreeMapCanvasProps<Datum extends object> = Partial<
    Omit<
        TreeMapCommonProps<Datum>,
        | 'enableParentLabel'
        | 'parentLabel'
        | 'parentLabelSize'
        | 'parentLabelPosition'
        | 'parentLabelPadding'
        | 'parentLabelTextColor'
        | 'onMouseEnter'
        | 'onMouseLeave'
    >
> &
    TreeMapDataProps<Datum> &
    Dimensions & {
        layers?: (LayerId | CustomCanvasLayer<Datum>)[]
        pixelRatio?: number
    }
