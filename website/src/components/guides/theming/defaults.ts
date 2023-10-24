import { Theme, defaultTheme as baseDefaultTheme, extendDefaultTheme } from '@nivo/theming'

const extendedTheme: Theme = extendDefaultTheme(baseDefaultTheme)

const textDefaults: Theme['text'] = {
    fontSize: extendedTheme.text.fontSize,
    fill: extendedTheme.text.fill,
    outlineWidth: extendedTheme.text.outlineWidth,
    outlineColor: extendedTheme.text.outlineColor,
}

const axisDefaults: Theme['axis'] = {
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
            outlineWidth: extendedTheme.axis.legend.text.outlineWidth,
            outlineColor: extendedTheme.axis.legend.text.outlineColor,
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
            outlineWidth: extendedTheme.axis.ticks.text.outlineWidth,
            outlineColor: extendedTheme.axis.ticks.text.outlineColor,
        },
    },
}

const gridDefaults: Theme['grid'] = {
    line: {
        stroke: extendedTheme.grid.line.stroke,
        strokeWidth: extendedTheme.grid.line.strokeWidth,
    },
}

const legendsDefaults: Theme['legends'] = {
    title: {
        text: {
            fontSize: extendedTheme.legends.title.text.fontSize,
            fill: extendedTheme.legends.title.text.fill,
            outlineWidth: extendedTheme.legends.title.text.outlineWidth,
            outlineColor: extendedTheme.legends.title.text.outlineColor,
        },
    },
    text: {
        fontSize: extendedTheme.legends.text.fontSize,
        fill: extendedTheme.legends.text.fill,
        outlineWidth: extendedTheme.legends.text.outlineWidth,
        outlineColor: extendedTheme.legends.text.outlineColor,
    },
    ticks: {
        line: {},
        text: {
            fontSize: extendedTheme.legends.ticks.text.fontSize,
            fill: extendedTheme.legends.ticks.text.fill,
            outlineWidth: extendedTheme.legends.ticks.text.outlineWidth,
            outlineColor: extendedTheme.legends.ticks.text.outlineColor,
        },
    },
}

const annotationsDefaults: Theme['annotations'] = {
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

const tooltipDefaults: Theme['tooltip'] = {
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

export const defaultTheme: Theme = {
    background: '#ffffff',
    text: textDefaults,
    axis: axisDefaults,
    grid: gridDefaults,
    legends: legendsDefaults,
    annotations: annotationsDefaults,
    tooltip: tooltipDefaults,
}
