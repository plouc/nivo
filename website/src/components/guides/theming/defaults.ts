import {
    // @ts-ignore
    defaultTheme as baseDefaultTheme,
    // @ts-ignore
    extendDefaultTheme,
    CompleteTheme,
} from '@nivo/core'

const extendedTheme: CompleteTheme = extendDefaultTheme(baseDefaultTheme)

const axisDefaults: CompleteTheme['axis'] = {
    domain: {
        line: {
            stroke: '#777777', // defaultTheme.axis.domain.line.stroke,
            strokeWidth: extendedTheme.axis.domain.line.strokeWidth,
        },
    },
    legend: {
        text: {
            fontSize: extendedTheme.axis.legend.text.fontSize,
            fill: extendedTheme.axis.legend.text.fill,
        },
    },
    ticks: {
        line: {
            stroke: extendedTheme.axis.ticks.line.stroke,
            strokeWidth: extendedTheme.axis.ticks.line.strokeWidth,
        },
        text: {
            fontSize: extendedTheme.axis.ticks.text.fontSize,
            fill: extendedTheme.axis.ticks.text.fill,
        },
    },
}

const gridDefaults: CompleteTheme['grid'] = {
    line: {
        stroke: extendedTheme.grid.line.stroke,
        strokeWidth: extendedTheme.grid.line.strokeWidth,
    },
}

const legendsDefaults: CompleteTheme['legends'] = {
    title: {
        text: {
            fontSize: extendedTheme.legends.title.text.fontSize,
            fill: extendedTheme.legends.title.text.fill,
        },
    },
    text: {
        fontSize: extendedTheme.legends.text.fontSize,
        fill: extendedTheme.legends.text.fill,
    },
    ticks: {
        line: {},
        text: {
            fontSize: extendedTheme.legends.ticks.text.fontSize,
            fill: extendedTheme.legends.ticks.text.fill,
        },
    },
}

const annotationsDefaults: CompleteTheme['annotations'] = {
    text: {
        fontSize: extendedTheme.annotations.text.fontSize,
        fill: extendedTheme.annotations.text.fill,
        outlineWidth: extendedTheme.annotations.text.outlineWidth,
        outlineColor: extendedTheme.annotations.text.outlineColor,
        outlineOpacity: extendedTheme.annotations.text.outlineOpacity,
    },
    link: {
        stroke: extendedTheme.annotations.link.stroke,
        strokeWidth: extendedTheme.annotations.link.strokeWidth,
        outlineWidth: extendedTheme.annotations.link.outlineWidth,
        outlineColor: extendedTheme.annotations.link.outlineColor,
        outlineOpacity: extendedTheme.annotations.link.outlineOpacity,
    },
    outline: {
        stroke: extendedTheme.annotations.outline.stroke,
        strokeWidth: extendedTheme.annotations.outline.strokeWidth,
        outlineWidth: extendedTheme.annotations.outline.outlineWidth,
        outlineColor: extendedTheme.annotations.outline.outlineColor,
        outlineOpacity: extendedTheme.annotations.outline.outlineOpacity,
    },
    symbol: {
        fill: extendedTheme.annotations.symbol.fill,
        outlineWidth: extendedTheme.annotations.symbol.outlineWidth,
        outlineColor: extendedTheme.annotations.symbol.outlineColor,
        outlineOpacity: extendedTheme.annotations.symbol.outlineOpacity,
    },
}

const tooltipDefaults: CompleteTheme['tooltip'] = {
    container: {
        background: '#ffffff',
        color: extendedTheme.textColor,
        fontSize: 12,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
}

export const defaultTheme: CompleteTheme = {
    background: '#ffffff', // defaultTheme.background,
    textColor: extendedTheme.textColor,
    fontSize: extendedTheme.fontSize,
    axis: axisDefaults,
    grid: gridDefaults,
    legends: legendsDefaults,
    annotations: annotationsDefaults,
    tooltip: tooltipDefaults,
}
