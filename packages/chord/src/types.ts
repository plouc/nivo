import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { RibbonGenerator as D3RibbonGenerator } from 'd3-chord'
import { Arc as D3Arc } from 'd3-shape'
import {
    Box,
    Theme,
    Dimensions,
    MotionProps,
    CssMixBlendMode,
    PropertyAccessor,
    ValueFormat,
} from '@bitbloom/nivo-core'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@bitbloom/nivo-colors'
import { LegendProps } from '@bitbloom/nivo-legends'

export type LayerId = 'ribbons' | 'arcs' | 'labels' | 'legends'
export interface CustomLayerProps {
    center: [number, number]
    radius: number
    arcs: ArcDatum[]
    arcGenerator: ArcGenerator
    ribbons: RibbonDatum[]
    ribbonGenerator: RibbonGenerator
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

export interface ArcAnimatedProps {
    startAngle: number
    endAngle: number
    color: string
    opacity: number
    borderColor: string
}

export interface RibbonDatum {
    id: string
    source: ArcDatum
    target: ArcDatum
}

export interface RibbonAnimatedProps {
    sourceStartAngle: number
    sourceEndAngle: number
    targetStartAngle: number
    targetEndAngle: number
    color: string
    opacity: number
    borderColor: string
}

export type RibbonGenerator = D3RibbonGenerator<
    any,
    | RibbonDatum
    | {
          source: {
              startAngle: number
              endAngle: number
          }
          target: {
              startAngle: number
              endAngle: number
          }
      },
    RibbonDatum
>

export type ArcGenerator = D3Arc<
    any,
    | ArcDatum
    | {
          startAngle: number
          endAngle: number
      }
>

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

    label: PropertyAccessor<Omit<ArcDatum, 'label' | 'color'>, string>
    valueFormat: ValueFormat<number>

    padAngle: number
    innerRadiusRatio: number
    innerRadiusOffset: number

    theme: Theme
    colors: OrdinalColorScaleConfig<Omit<ArcDatum, 'label' | 'color'>>

    arcOpacity: number
    activeArcOpacity: number
    inactiveArcOpacity: number
    arcBorderWidth: number
    arcBorderColor: InheritedColorConfig<ArcDatum>
    onArcMouseEnter: ChordArcMouseHandler
    onArcMouseMove: ChordArcMouseHandler
    onArcMouseLeave: ChordArcMouseHandler
    onArcClick: ChordArcMouseHandler
    arcTooltip: ArcTooltipComponent

    ribbonBlendMode: CssMixBlendMode
    ribbonOpacity: number
    activeRibbonOpacity: number
    inactiveRibbonOpacity: number
    ribbonBorderWidth: number
    ribbonBorderColor: InheritedColorConfig<ArcDatum>

    enableLabel: boolean
    labelOffset: number
    labelRotation: number
    labelTextColor: InheritedColorConfig<ArcDatum>

    isInteractive: boolean

    legends: LegendProps[]

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
} & Required<MotionProps>

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
