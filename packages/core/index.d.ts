import { CSSProperties } from 'react'

declare module '@nivo/core' {
    export type GetColor<T> = (datum: T) => string
    export type Colors = string[] | string
    export interface ColorProps<T> {
        colors?: Colors
        colorBy?: string | GetColor<T>
    }

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
        lineStyle?: Partial<CSSProperties>
        textStyle?: Partial<CSSProperties>
    }

    export function radiansToDegrees(rad: number): number
}
