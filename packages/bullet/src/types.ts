import { AriaAttributes, FunctionComponent, MouseEvent } from 'react'
import {
    Box,
    Dimensions,
    MotionProps,
    ValueFormat,
    BoxAnchor,
    EventMap,
    InteractionHandlers,
} from '@nivo/core'
import { Rect, RectNodeComponent } from '@nivo/rects'
import { PartialTheme, TextAlign, TextBaseline, BorderRadius } from '@nivo/theming'
import { AxisProps } from '@nivo/axes'
import {
    OrdinalColorScaleConfig,
    ContinuousColorScaleConfig,
    InheritedColorConfig,
} from '@nivo/colors'
import { ScaleLinear, ScaleLinearSpec, ScaleSymlog, ScaleSymlogSpec } from '@nivo/scales'

export type BulletScaleSpec = ScaleLinearSpec | ScaleSymlogSpec
export type BulletScale = ScaleLinear<number> | ScaleSymlog

export type Point = {
    x: number
    y: number
}

export interface BulletRangeDatum {
    id: string
    value: number
}

export interface BulletDatum {
    id: string
    value: number
    baseline?: number
    target: number
    range: BulletRangeDatum[]
}

export interface BulletNodeBase<D = BulletDatum> {
    id: string
    value: number
    formattedValue: string
    rect: Rect
    color: string
    datum: D
}

export interface BulletNodeValue extends BulletNodeBase {
    v0: number
    v1: number
}

export interface BulletNodeTarget extends BulletNodeBase {
    p0: Point
    p1: Point
}

export interface BulletNodeRangeItem extends BulletNodeBase<BulletRangeDatum> {
    index: number
    isFirst: boolean
    isLast: boolean
    v0: number
    v1: number
}

export interface BulletNode {
    id: string
    datum: BulletDatum
    index: number
    scale: BulletScale
    rect: Rect
    // value.color
    color: string
    value: BulletNodeValue
    target: BulletNodeTarget
    range: BulletNodeRangeItem[]
}

export type MouseEventHandler<N> = (node: N, event: MouseEvent) => void

export type BulletLayerId =
    | 'axes'
    | 'ranges'
    | 'values'
    | 'targets'
    | 'titles'
    | 'valueLabels'
    | 'interactions'
export type BulletValueComponent = RectNodeComponent<BulletNodeValue>
export type BulletRangeComponent = RectNodeComponent<BulletNodeRangeItem>

export interface BulletTooltipProps {
    node: BulletNode
}
export type BulletTooltipComponent = FunctionComponent<BulletTooltipProps>

export interface BulletCommonOverrides {
    valueColor?: OrdinalColorScaleConfig<BulletDatum>
    targetColor?: OrdinalColorScaleConfig<BulletDatum>
    rangeColors?: OrdinalColorScaleConfig<BulletRangeDatum> | ContinuousColorScaleConfig
}

export type BulletPropsOverrides<P> = Record<string, Partial<P>> | ((d: BulletDatum) => Partial<P>)

export type BulletCommonProps = {
    margin: Box
    layout: 'horizontal' | 'vertical'
    scale: BulletScaleSpec
    baseline: number
    valueFormat?: ValueFormat<number>
    spacing: number
    valueSize: number
    valuePadding: number
    valueColor: OrdinalColorScaleConfig<BulletDatum>
    valueBorderRadius: BorderRadius
    valueBorderWidth: number
    valueBorderColor: InheritedColorConfig<BulletNodeValue>
    targetSize: number
    targetThickness: number
    targetColor: OrdinalColorScaleConfig<BulletDatum>
    targetBorderRadius: BorderRadius
    rangeSize: number
    rangeColors: OrdinalColorScaleConfig<BulletDatum['range']> | ContinuousColorScaleConfig
    rangeBorderRadius: BorderRadius
    rangeBorderColor: InheritedColorConfig<BulletNodeRangeItem>
    rangeBorderWidth: number
    enableTitles: boolean
    titleAnchor: BoxAnchor
    titleAlign: TextAlign | 'auto'
    titleBaseline: TextBaseline | 'auto'
    titlePaddingX: number
    titlePaddingY: number
    titleOffsetX: number
    titleOffsetY: number
    titleRotation: number
    enableValueLabels: boolean
    valueLabelAnchor: BoxAnchor
    valueLabelIsOutside: boolean
    valueLabelAlign: TextAlign | 'auto'
    valueLabelBaseline: TextBaseline | 'auto'
    valueLabelPaddingX: number
    valueLabelPaddingY: number
    valueLabelOffsetX: number
    valueLabelOffsetY: number
    valueLabelRotation: number
    titleColor: InheritedColorConfig<Omit<BulletNode, 'rect'>>
    overrides?: BulletPropsOverrides<BulletCommonOverrides>
    theme: PartialTheme
    isInteractive: boolean
    enableValueTooltip: boolean
    tooltip: BulletTooltipComponent
    role?: string
    ariaLabel?: AriaAttributes['aria-label']
    ariaLabelledBy?: AriaAttributes['aria-labelledby']
    ariaDescribedBy?: AriaAttributes['aria-describedby']
}

type BulletEventMap = Pick<
    EventMap,
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'onDoubleClick'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
    | 'onWheel'
    | 'onContextMenu'
>
export type BulletInteractionHandlers = InteractionHandlers<BulletNode, BulletEventMap>

export type BulletSvgOverrides = BulletCommonOverrides &
    Pick<BulletSvgExtraProps, 'axisBefore' | 'axisAfter'>

export interface BulletSvgExtraProps {
    layers: readonly BulletLayerId[]
    axisBefore: AxisProps | null
    axisAfter: AxisProps | null
    valueComponent: BulletValueComponent
    rangeComponent: BulletRangeComponent
    overrides?: BulletPropsOverrides<BulletSvgOverrides>
    isFocusable: boolean
    valueBarRole?: string | ((data: BulletDatum) => string)
    valueBarAriaLabel?: (data: BulletDatum) => AriaAttributes['aria-label']
    valueBarAriaLabelledBy?: (data: BulletDatum) => AriaAttributes['aria-labelledby']
    valueBarAriaDescribedBy?: (data: BulletDatum) => AriaAttributes['aria-describedby']
    valueBarAriaHidden?: (data: BulletDatum) => AriaAttributes['aria-hidden']
    valueBarAriaDisabled?: (data: BulletDatum) => AriaAttributes['aria-disabled']
}

export interface BulletDataProps {
    data: readonly BulletDatum[]
}

export type BulletSvgProps = BulletDataProps &
    Partial<BulletCommonProps> &
    Partial<BulletSvgExtraProps> &
    Dimensions &
    BulletInteractionHandlers &
    MotionProps

export type BulletSvgPropsWithDefaults = BulletDataProps &
    BulletCommonProps &
    BulletSvgExtraProps &
    Dimensions &
    BulletInteractionHandlers &
    MotionProps
