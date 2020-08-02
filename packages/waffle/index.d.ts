import * as React from 'react'
import { Box, Theme, Dimensions, MotionProps, ColorProps, SvgDefsAndFill } from '@nivo/core'
import { InheritedColorProp } from '@nivo/colors'

declare module '@nivo/waffle' {
    export type WaffleFillDirection = 'top' | 'right' | 'bottom' | 'left'

    export interface WaffleDatum {
        id: string | number
        value: number
        label: string | number
    }

    export type WaffleTooltipData = WaffleDatum & {
        color: string
        position: number
        row: number
        column: number
        groupIndex: number
        startAt: number
        endAt: number
    }

    export type ValueFormatter = (value: number) => string | number

    export interface WaffleBaseProps {
        total: number
        data: object[]
        rows: number
        columns: number
    }

    export type WaffleCommonProps = ColorProps<WaffleDatum> &
        Partial<{
            margin: Box
            fillDirection: WaffleFillDirection
            padding: number

            theme: Theme
            emptyColor: string
            emptyOpacity: number
            borderWidth: number
            borderColor: InheritedColorProp<WaffleDatum>

            enableLabels: boolean

            isInteractive: boolean
            onClick: (datum: WaffleDatum, event: React.MouseEvent<HTMLCanvasElement>) => void
            tooltipFormat: string | ValueFormatter
            tooltip: React.StatelessComponent<WaffleTooltipData>
        }>

    export type WaffleSvgProps = WaffleBaseProps &
        WaffleCommonProps &
        MotionProps &
        SvgDefsAndFill<WaffleDatum>

    export class Waffle extends React.Component<WaffleSvgProps & Dimensions> {}
    export class ResponsiveWaffle extends React.Component<WaffleSvgProps> {}

    export type WaffleHtmlProps = WaffleBaseProps & WaffleCommonProps & MotionProps

    export class WaffleHtml extends React.Component<WaffleHtmlProps & Dimensions> {}
    export class ResponsiveWaffleHtml extends React.Component<WaffleHtmlProps> {}

    export type WaffleCanvasProps = WaffleBaseProps &
        WaffleCommonProps &
        Partial<{
            pixelRatio: number
        }>

    export class WaffleCanvas extends React.Component<WaffleCanvasProps & Dimensions> {}
    export class ResponsiveWaffleCanvas extends React.Component<WaffleCanvasProps> {}
}
