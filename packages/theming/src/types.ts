import { CSSProperties } from 'react'

export type TextStyle = {
    fontFamily: Exclude<CSSProperties['fontFamily'], undefined>
    fontSize: Exclude<CSSProperties['fontSize'], undefined>
    fill: string
    outlineWidth: number
    outlineColor: string
    outlineOpacity: number
} & Partial<CSSProperties>

export type Theme = {
    background: string
    text: TextStyle
    axis: {
        domain: {
            line: Partial<CSSProperties>
        }
        ticks: {
            line: Partial<CSSProperties>
            text: TextStyle
        }
        legend: {
            text: TextStyle
        }
    }
    grid: {
        line: Partial<CSSProperties>
    }
    crosshair: {
        line: {
            stroke: string
            strokeWidth: number
            strokeOpacity: number
            strokeDasharray: string
        }
    }
    legends: {
        hidden: {
            symbol: Partial<{
                fill: string
                opacity: number
            }>
            text: TextStyle
        }
        text: TextStyle
        title: {
            text: TextStyle
        }
        ticks: {
            line: Partial<CSSProperties>
            text: TextStyle
        }
    }
    labels: {
        text: TextStyle
    }
    markers: {
        lineColor: string
        lineStrokeWidth: number
        text: TextStyle
    }
    dots: {
        text: TextStyle
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
        text: TextStyle
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

/**
 * Theme which can be passed to chart components.
 *
 * Internal component will often rely on `Theme` to avoid
 * having to recompute the inherited properties each time we need the theme.
 */
export type PartialTheme = Partial<{
    background: Theme['background']
    text: Partial<Theme['text']>
    axis: Partial<{
        domain: Partial<{
            line: Partial<Theme['axis']['domain']['line']>
        }>
        ticks: Partial<{
            line: Partial<Theme['axis']['ticks']['line']>
            text: Partial<Theme['axis']['ticks']['text']>
        }>
        legend: Partial<{
            text: Partial<Theme['axis']['legend']['text']>
        }>
    }>
    grid: Partial<{
        line: Partial<Theme['grid']['line']>
    }>
    crosshair: Partial<{
        line: Partial<Theme['crosshair']['line']>
    }>
    legends: Partial<{
        hidden: Partial<{
            symbol: Theme['legends']['hidden']['symbol']
            text: Theme['legends']['hidden']['text']
        }>
        title: Partial<{
            text: Partial<Theme['legends']['title']['text']>
        }>
        text: Partial<Theme['legends']['text']>
        ticks: Partial<{
            line: Partial<Theme['legends']['ticks']['line']>
            text: Partial<Theme['legends']['ticks']['text']>
        }>
    }>
    labels: Partial<{
        text: Partial<Theme['labels']['text']>
    }>
    markers: Partial<Theme['markers']>
    dots: Partial<{
        text: Partial<Theme['dots']['text']>
    }>
    tooltip: Partial<Theme['tooltip']>
    annotations: Partial<{
        text: Partial<Theme['annotations']['text']>
        link: Partial<Theme['annotations']['link']>
        outline: Partial<Theme['annotations']['outline']>
        symbol: Partial<Theme['annotations']['symbol']>
    }>
}>

/**
 * Required properties without inheritance.
 *
 * The theme supports defining styles at the top level
 * (for text for example), which are then used to populate
 * similar nested properties.
 *
 * For example `text` will be merged with `axis.ticks.text`,
 * we use this approach so that it's simpler to define global styles.
 */
export type ThemeWithoutInheritance = {
    background: Theme['background']
    text: Theme['text']
    axis: {
        domain: {
            line: Theme['axis']['domain']['line']
        }
        ticks: {
            line: Theme['axis']['ticks']['line']
            text: Partial<Theme['axis']['ticks']['text']>
        }
        legend: {
            text: Partial<Theme['axis']['legend']['text']>
        }
    }
    grid: {
        line: Theme['grid']['line']
    }
    crosshair: {
        line: Theme['crosshair']['line']
    }
    legends: {
        hidden: {
            symbol: Theme['legends']['hidden']['symbol']
            text: Partial<Theme['legends']['hidden']['text']>
        }
        title: {
            text: Partial<Theme['legends']['title']['text']>
        }
        text: Partial<Theme['legends']['text']>
        ticks: {
            line: Theme['legends']['ticks']['line']
            text: Partial<Theme['legends']['ticks']['text']>
        }
    }
    labels: {
        text: Partial<Theme['labels']['text']>
    }
    markers: {
        lineColor: Theme['markers']['lineColor']
        lineStrokeWidth: Theme['markers']['lineStrokeWidth']
        text: Partial<Theme['markers']['text']>
    }
    dots: {
        text: Partial<Theme['dots']['text']>
    }
    tooltip: Theme['tooltip']
    annotations: {
        text: Partial<Theme['annotations']['text']>
        link: Theme['annotations']['link']
        outline: Theme['annotations']['outline']
        symbol: Theme['annotations']['symbol']
    }
}
