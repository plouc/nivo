import * as React from 'react'

declare module '@nivo/core' {
    export type GetColor<T> = (datum: T) => string
    export type Colors = string[] | string
    export interface ColorProps<T> {
        colors?: Colors
        colorBy?: string | GetColor<T>
    }

    export type Theme = Partial<{
        background: string
        axis: Partial<{
            domain: Partial<{
                line: Partial<React.CSSProperties>
            }>
            ticks: Partial<{
                line: Partial<React.CSSProperties>
                text: Partial<React.CSSProperties>
            }>
            legend: Partial<{
                text: Partial<React.CSSProperties>
            }>
        }>
        grid: Partial<{
            line: Partial<React.CSSProperties>
        }>
        legends: Partial<{
            text: Partial<React.CSSProperties>
        }>
        labels: Partial<{
            text: Partial<React.CSSProperties>
        }>
        markers: Partial<{
            lineColor: string
            lineStrokeWidth: number
            textColor: string
            fontSize: string | 0
        }>
        dots: Partial<{
            text: Partial<React.CSSProperties>
        }>
        tooltip: Partial<{
            container: Partial<React.CSSProperties>
            basic: Partial<React.CSSProperties>
            table: Partial<React.CSSProperties>
            tableCell: Partial<React.CSSProperties>
        }>
    }>

    export interface Dimensions {
        height: number
        width: number
    }

    export type Box = Partial<{
        bottom: number
        left: number
        right: number
        top: number
    }>

    export type MotionProps = Partial<{
        animate: boolean
        motionDamping: number
        motionStiffness: number
    }>

    export type SvgFillMatcher<T> = (datum: T) => boolean
    export interface SvgDefsAndFill<T> {
        defs?: Array<{
            id: string
            [key: string]: any
        }>
        fill?: Array<{ id: string; match: object | SvgFillMatcher<T> | '*' }>
    }

    export interface CartesianMarkerProps {
        axis: 'x' | 'y'
        value: string | number | Date
        legend?: string
        lineStyle?: Partial<React.CSSProperties>
        textStyle?: Partial<React.CSSProperties>
    }

    export interface BasicTooltipProps {
        id: React.ReactNode
        value?: string | number
        enableChip?: boolean
        color: string
        format?: (value: number | string) => number | string
        renderContent?: () => React.ReactNode
        theme: Pick<Theme, 'tooltip'>
    }

    export class BasicTooltip extends React.Component<BasicTooltipProps> {}

    export interface TableTooltipProps {
        title?: React.ReactNode
        rows: React.ReactNode[][]
        theme: Pick<Theme, 'tooltip'>
        renderContent?: () => React.ReactNode
    }

    export class TableTooltip extends React.Component<TableTooltipProps> {}
}
