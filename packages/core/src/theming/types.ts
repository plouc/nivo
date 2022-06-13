import { CSSProperties } from 'react'

export type CompleteTheme = {
    crosshair: {
        line: {
            stroke: string
            strokeWidth: number
            strokeOpacity: number
            strokeDasharray: string
        }
    }
    background: string
    fontFamily: string
    fontSize: number
    textColor: string
    axis: {
        domain: {
            line: Partial<CSSProperties>
        }
        ticks: {
            line: Partial<CSSProperties>
            text: Partial<CSSProperties>
        }
        legend: {
            text: Partial<CSSProperties>
        }
    }
    grid: {
        line: Partial<CSSProperties>
    }
    legends: {
        hidden: {
            symbol: Partial<{
                fill: string
                opacity: number
            }>
            text: Partial<CSSProperties>
        }
        title: {
            text: Partial<CSSProperties>
        }
        text: Partial<CSSProperties>
        ticks: {
            line: Partial<CSSProperties>
            text: Partial<CSSProperties>
        }
    }
    labels: {
        text: Partial<CSSProperties>
    }
    markers: {
        lineColor: string
        lineStrokeWidth: number
        textColor: string
        fontSize: string | 0
        text: Partial<CSSProperties>
    }
    dots: {
        text: Partial<CSSProperties>
    }
    tooltip: {
        container: Partial<CSSProperties>
        basic: Partial<CSSProperties>
        chip: Partial<CSSProperties>
        table: Partial<CSSProperties>
        tableCell: Partial<CSSProperties>
        tableCellValue: Partial<CSSProperties>
    }
    annotations: {
        text: {
            fill: string
            outlineWidth: number
            outlineColor: string
            outlineOpacity: number
        } & Partial<Omit<CSSProperties, 'fill'>>
        link: {
            stroke: string
            strokeWidth: number
            outlineWidth: number
            outlineColor: string
            outlineOpacity: number
        } & Partial<Omit<CSSProperties, 'stroke' | 'strokeWidth'>>
        outline: {
            stroke: string
            strokeWidth: number
            outlineWidth: number
            outlineColor: string
            outlineOpacity: number
        } & Partial<Omit<CSSProperties, 'stroke' | 'strokeWidth'>>
        symbol: {
            fill: string
            outlineWidth: number
            outlineColor: string
            outlineOpacity: number
        } & Partial<Omit<CSSProperties, 'fill'>>
    }
}

export type Theme = Partial<
    Pick<CompleteTheme, 'background' | 'fontFamily' | 'fontSize' | 'textColor'> & {
        crosshair: Partial<{
            line: Partial<CompleteTheme['crosshair']['line']>
        }>
        axis: Partial<{
            domain: Partial<{
                line: Partial<CompleteTheme['axis']['domain']['line']>
            }>
            ticks: Partial<{
                line: Partial<CompleteTheme['axis']['ticks']['line']>
                text: Partial<CompleteTheme['axis']['ticks']['text']>
            }>
            legend: Partial<{
                text: Partial<CompleteTheme['axis']['legend']['text']>
            }>
        }>
        grid: Partial<{
            line: Partial<CompleteTheme['grid']['line']>
        }>
        legends: Partial<{
            hidden: Partial<{
                symbol: CompleteTheme['legends']['hidden']['symbol']
                text: CompleteTheme['legends']['hidden']['text']
            }>
            title: Partial<{
                text: Partial<CompleteTheme['legends']['title']['text']>
            }>
            text: Partial<CompleteTheme['legends']['text']>
            ticks: Partial<{
                line: Partial<CompleteTheme['legends']['ticks']['line']>
                text: Partial<CompleteTheme['legends']['ticks']['text']>
            }>
        }>
        labels: Partial<{
            text: Partial<CompleteTheme['labels']['text']>
        }>
        markers: Partial<CompleteTheme['markers']>
        dots: Partial<{
            text: Partial<CompleteTheme['dots']['text']>
        }>
        tooltip: Partial<CompleteTheme['tooltip']>
        annotations: Partial<{
            text: Partial<CompleteTheme['annotations']['text']>
            link: Partial<CompleteTheme['annotations']['link']>
            outline: Partial<CompleteTheme['annotations']['outline']>
            symbol: Partial<CompleteTheme['annotations']['symbol']>
        }>
    }
>
