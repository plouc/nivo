/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as PropTypes from 'prop-types'
import { noop, defsPropTypes, MotionProps, Theme, PartialTheme } from '@nivo/core'
import { axisPropType, AxisConfig } from '@nivo/axes'
import { LegendPropShape, LegendConfig } from '@nivo/legends'
import BarItem from './BarItem'

/*
declare module '@nivo/bar' {
    export interface Data {
        data: object[]
    }

    export interface BarDatum {
        [key: string]: string | number
    }

    export type BarDatumWithColor = BarDatum & {
        color: string
    }

    export interface BarExtendedDatum {
        id: string | number
        value: number
        index: number
        indexValue: string | number
        color: string
        data: BarDatum
    }

    export type AccessorFunc = (datum: BarDatum) => string

    export type IndexByFunc = (datum: BarDatum) => string | number

    export type LabelFormatter = (label: string | number) => string | number

    export type ValueFormatter = (value: number) => string | number

    export type BarClickHandler = (
        datum: BarExtendedDatum,
        event: React.MouseEvent<HTMLCanvasElement>
    ) => void

    export type TooltipProp = React.StatelessComponent<BarExtendedDatum>

    export interface BarItemProps {
        data: {
            id: string | number
            value: number
            indexValue: string | number
        }
        x: number
        y: number
        width: number
        height: number
        color: string
        borderRadius: number
        borderWidth: number
        borderColor: string
        label: string
        shouldRenderLabel: boolean
        labelColor: string
        onClick: BarClickHandler
        tooltipFormat: string | ValueFormatter
        tooltip: TooltipProp
        showTooltip: (tooltip: React.ReactNode, event: React.MouseEvent<HTMLCanvasElement>) => void
        hideTooltip: () => void
        theme: Theme
    }

    export type BarProps = ColorProps<BarDatum> &
        Partial<{
            indexBy: string | IndexByFunc
            keys: string[]

            groupMode: 'stacked' | 'grouped'
            layout: 'horizontal' | 'vertical'
            reverse: boolean

            innerPadding: number
            minValue: number | 'auto'
            margin: Box
            maxValue: number | 'auto'
            padding: number

            axisBottom: Axis
            axisLeft: Axis
            axisRight: Axis
            axisTop: Axis

            enableGridX: boolean
            enableGridY: boolean

            barComponent: React.StatelessComponent<BarItemProps>

            enableLabel: boolean
            label: string | AccessorFunc
            labelFormat: string | LabelFormatter
            labelLinkColor: string | GetColor<BarDatumWithColor>
            labelSkipWidth: number
            labelSkipHeight: number
            labelTextColor: string | GetColor<BarDatumWithColor>

            borderRadius: number
            borderWidth: number
            theme: Theme

            isInteractive: boolean
            tooltipFormat: string | ValueFormatter
            tooltip: TooltipProp

            legends: Array<{ dataFrom: 'indexes' | 'keys' } & LegendProps>

            markers: CartesianMarkerProps[]
        }>

    export type Axis = Partial<{
        format: string | LabelFormatter
        legend: string
        legendOffset: number
        legendPosition: 'start' | 'center' | 'end'
        orient: 'top' | 'right' | 'bottom' | 'left'
        tickPadding: number
        tickRotation: number
        tickSize: number
        tickValues: number | string[] | number[]
    }>

    export enum BarLayerType {
        Grid = 'grid',
        Axes = 'axes',
        Bars = 'bars',
        Markers = 'markers',
        Legends = 'legends',
    }
    export type BarCustomLayer = (props: any) => React.ReactNode
    export type Layer = BarLayerType | BarCustomLayer

    export type BarSvgProps = Data &
        BarProps &
        MotionProps &
        SvgDefsAndFill<BarDatum> &
        Partial<{
            layers: Layer[]
            onClick: (datum: BarExtendedDatum, event: React.MouseEvent<SVGRectElement>) => void
        }>

    export class Bar extends React.Component<BarSvgProps & Dimensions> {}
    export class ResponsiveBar extends React.Component<BarSvgProps> {}

    export type BarCanvasProps = Data &
        BarProps &
        Partial<{
            onClick: BarClickHandler
            pixelRatio: number
        }>

    export class BarCanvas extends React.Component<BarCanvasProps & Dimensions> {}
    export class ResponsiveBarCanvas extends React.Component<BarCanvasProps> {}
}
*/

export enum BarLayerId {
    Grid = 'grid',
    Axes = 'axes',
    Bars = 'bars',
    Markers = 'markers',
    Legends = 'legends',
}

export type BarLayer = (props: any) => React.ReactNode

type indexByFn<Datum> = (d: Datum) => string | number

export interface BarLegendConfig extends LegendConfig {
    dataFrom: 'indexes' | 'keys'
}

export interface BarOuterProps<Datum> extends Partial<MotionProps> {
    width: number
    height: number
    margin?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    }
    data: Datum[]
    indexBy?: string | indexByFn<Datum>
    keys?: Array<string | number>
    layers?: Array<BarLayerId | BarLayer>
    barComponent?: any
    groupMode?: 'stacked' | 'grouped'
    layout?: 'horizontal' | 'vertical'
    reverse?: boolean
    minValue?: number | 'auto'
    maxValue?: number | 'auto'
    padding?: number
    innerPadding?: number
    axisTop?: AxisConfig
    axisRight?: AxisConfig
    axisBottom?: AxisConfig
    axisLeft?: AxisConfig
    enableGridX?: boolean
    gridXValues?: Array<number | string | Date>
    enableGridY?: boolean
    gridYValues?: Array<number | string | Date>
    enableLabel?: boolean
    label?: any
    labelFormat?: any
    labelSkipWidth?: number
    labelSkipHeight?: number
    labelTextColor?: any
    labelLinkColor?: any
    markers?: any[]
    defs?: any[]
    fill?: any[]
    borderRadius?: number
    borderWidth?: number
    borderColor?: any
    isInteractive?: boolean
    tooltipLabel?: any
    tooltipFormat?: any
    tooltip?: any
    onClick?: any
    onMouseEnter?: any
    onMouseLeave?: any
    legends?: BarLegendConfig[]
    theme?: PartialTheme
}

export interface BarInnerProps<Datum> {
    margin: {
        top: number
        right: number
        bottom: number
        left: number
    }
    outerWidth: number
    outerHeight: number
    getIndex: indexByFn<Datum>
    keys: Array<string | number>
    layers: Array<BarLayerId | BarLayer>
    barComponent: any
    groupMode: 'stacked' | 'grouped'
    layout: 'horizontal' | 'vertical'
    reverse: boolean
    padding: number
    innerPadding: number
    enableGridX: boolean
    enableGridY: boolean
    enableLabel: boolean
    getLabel: any
    labelSkipWidth: number
    labelSkipHeight: number
    getLabelTextColor: (...args: any[]) => string
    getColor: (...args: any[]) => string
    defs: any[]
    fill: any[]
    borderRadius: number
    borderWidth: number
    getBorderColor: (...args: any[]) => string
    isInteractive: boolean
    getTooltipLabel: any
    legends: any[]
    theme: Theme
}

type ExtendableOuterProps<Datum> = Pick<
    BarOuterProps<Datum>,
    Exclude<
        keyof BarOuterProps<Datum>,
        | 'margin'
        | 'theme'
        | 'keys'
        | 'layers'
        | 'groupMode'
        | 'layout'
        | 'reverse'
        | 'padding'
        | 'innerPadding'
        | 'enableGridX'
        | 'enableGridY'
        | 'barComponent'
        | 'enableLabel'
        | 'labelSkipWidth'
        | 'labelSkipHeight'
        | 'defs'
        | 'fill'
        | 'borderRadius'
        | 'borderWidth'
        | 'borderColor'
        | 'isInteractive'
        | 'legends'
    >
>

export interface BarProps<Datum> extends ExtendableOuterProps<Datum>, BarInnerProps<Datum> {}

export const BarPropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['grid', 'axes', 'bars', 'markers', 'legends']),
            PropTypes.func,
        ])
    ).isRequired,
    groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    reverse: PropTypes.bool.isRequired,
    minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
    padding: PropTypes.number.isRequired,
    innerPadding: PropTypes.number.isRequired,
    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,
    enableGridX: PropTypes.bool.isRequired,
    gridXValues: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
    ),
    enableGridY: PropTypes.bool.isRequired,
    gridYValues: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
    ),
    barComponent: PropTypes.func.isRequired,
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getLabel: PropTypes.func.isRequired, // computed
    labelSkipWidth: PropTypes.number.isRequired,
    labelSkipHeight: PropTypes.number.isRequired,
    labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelTextColor: PropTypes.func.isRequired, // computed
    borderRadius: PropTypes.number.isRequired,
    getColor: PropTypes.func.isRequired, // computed
    ...defsPropTypes,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    tooltipLabel: PropTypes.func,
    getTooltipLabel: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,
    legends: PropTypes.arrayOf(
        PropTypes.shape({
            dataFrom: PropTypes.oneOf(['indexes', 'keys']).isRequired,
            ...LegendPropShape,
        })
    ).isRequired,
    pixelRatio: PropTypes.number.isRequired,
}

export const BarDefaultProps = {
    indexBy: 'id',
    keys: ['value'],
    layers: ['grid', 'axes', 'bars', 'markers', 'legends'],
    groupMode: 'stacked',
    layout: 'vertical',
    reverse: false,
    minValue: 'auto',
    maxValue: 'auto',
    padding: 0.1,
    innerPadding: 0,
    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,
    barComponent: BarItem,
    enableLabel: true,
    label: 'value',
    labelSkipWidth: 0,
    labelSkipHeight: 0,
    labelTextColor: 'theme',
    defs: [],
    fill: [],
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'inherit',
    isInteractive: true,
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
    legends: [],
    // pixelRatio:
    //    global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
