declare module '@nivo/core' {
    export type GetColor<T> = (datum: T) => string
    export type Colors =
        | string[]
        | 'nivo'
        | 'category10'
        | 'd320'
        | 'd320b'
        | 'd320c'
        | 'accent'
        | 'dark2'
        | 'paired'
        | 'pastel1'
        | 'set1'
        | 'set2'
        | 'set3'
    export interface ColorProps<T> {
        colors: Colors
        colorBy: string | GetColor<T>
    }

    export type Theme = Partial<{
        axis: Partial<{
            textColor: string
            fontSize: string | 0
            tickColor: string
            legendColor: string
            legendFontSize: string | 0
        }>,
        grid: Partial<{
            stroke: string
            strokeWidth: number
            strokeDasharray: string
        }>,
        markers: Partial<{
            lineColor: string
            lineStrokeWidth: number
            textColor: string
            fontSize: string | 0
        }>,
        dots: Partial<{
            textColor: string
            fontSize: string | 0
        }>,
        tooltip: Partial<{
            container: Partial<{
                background: string
                color: string
                fontSize: string | 0
                borderRadius: string | 0
                boxShadow: string
                padding: string | 0
            }>,
            basic: Partial<{
                whiteSpace: string
                display: string
                alignItems: string
            }>,
            table: any;
            tableCell: Partial<{
                padding: string | 0
            }>
        }>,
        labels: Partial<{
            textColor: string
        }>,
        sankey: Partial<{
            label: any
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
        defs: Array<{ id: string }>
        fill: Array<{ id: string, match: object | SvgFillMatcher<T> | '*' }>
    }
}
