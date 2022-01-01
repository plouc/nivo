import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import {
    Box,
    Theme,
    Dimensions,
    ModernMotionProps,
    CssMixBlendMode,
    PropertyAccessor,
    ValueFormat,
} from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { LegendProps } from '@nivo/legends'

export type LayerId = 'ribbons' | 'arcs' | 'labels' | 'legends'
export interface CustomLayerProps {
    center: [number, number]
    radius: number
    arcs: ArcDatum[]
    arcGenerator: any
    ribbons: RibbonDatum[]
    ribbonGenerator: any
}
export type CustomLayer = FunctionComponent<CustomLayerProps>
export type CustomCanvasLayer = (ctx: CanvasRenderingContext2D, props: CustomLayerProps) => void

export interface ChordDataProps {
    data: number[][]
    keys: string[]
}

export interface ArcDatum {
    id: string
    index: number
    label: string
    value: number
    formattedValue: number | string
    startAngle: number
    endAngle: number
    color: string
}

export interface RibbonSubject extends ArcDatum {
    subindex: number
}

export interface RibbonDatum {
    id: string
    source: RibbonSubject
    target: RibbonSubject
}

export interface ArcTooltipComponentProps {
    arc: ArcDatum
}
export type ArcTooltipComponent = FunctionComponent<ArcTooltipComponentProps>

export interface RibbonTooltipComponentProps {
    ribbon: RibbonDatum
}
export type RibbonTooltipComponent = FunctionComponent<RibbonTooltipComponentProps>

export type ChordArcMouseHandler = (arc: any, event: MouseEvent) => void

export type ChordRibbonMouseHandler = (ribbon: any, event: MouseEvent) => void

export type ChordCommonProps = {
    margin: Box

    label: PropertyAccessor<ArcDatum, string>
    valueFormat: ValueFormat<number>

    padAngle: number
    innerRadiusRatio: number
    innerRadiusOffset: number

    theme: Theme
    colors: OrdinalColorScaleConfig

    arcOpacity: number
    arcHoverOpacity: number
    arcHoverOthersOpacity: number
    arcBorderWidth: number
    arcBorderColor: InheritedColorConfig<any>
    onArcMouseEnter: ChordArcMouseHandler
    onArcMouseMove: ChordArcMouseHandler
    onArcMouseLeave: ChordArcMouseHandler
    onArcClick: ChordArcMouseHandler
    arcTooltip: ArcTooltipComponent

    ribbonBlendMode: CssMixBlendMode
    ribbonOpacity: number
    ribbonHoverOpacity: number
    ribbonHoverOthersOpacity: number
    ribbonBorderWidth: number
    ribbonBorderColor: InheritedColorConfig<any>

    enableLabel: boolean
    labelOffset: number
    labelRotation: number
    labelTextColor: InheritedColorConfig<any>

    isInteractive: boolean
    defaultActiveNodeIds: string[]

    legends: LegendProps[]

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
} & Required<ModernMotionProps>

export type ChordSvgProps = Partial<ChordCommonProps> &
    ChordDataProps &
    Dimensions & {
        onRibbonMouseEnter?: ChordRibbonMouseHandler
        onRibbonMouseMove?: ChordRibbonMouseHandler
        onRibbonMouseLeave?: ChordRibbonMouseHandler
        onRibbonClick?: ChordRibbonMouseHandler
        ribbonTooltip?: RibbonTooltipComponent
        layers?: (LayerId | CustomLayer)[]
    }

export type ChordCanvasProps = Partial<ChordCommonProps> &
    ChordDataProps &
    Dimensions & {
        layers?: (LayerId | CustomCanvasLayer)[]
        pixelRatio?: number
    }
