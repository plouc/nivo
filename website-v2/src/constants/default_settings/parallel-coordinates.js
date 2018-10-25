import merge from 'lodash/merge'
import { commonDefaultProps as defaultProps } from '@nivo/parallel-coordinates'
import theme from '../../styles/nivoTheme'

const variables = [
    {
        key: 'temp',
        type: 'linear',
        min: 'auto',
        max: 'auto',
        ticksPosition: 'before',
        legend: 'temperature',
        legendPosition: 'start',
        legendOffset: 20,
    },
    {
        key: 'cost',
        type: 'linear',
        min: 0,
        max: 'auto',
        ticksPosition: 'before',
        legend: 'cost',
        legendPosition: 'start',
        legendOffset: 20,
    },
    {
        key: 'color',
        type: 'point',
        padding: 1,
        values: ['red', 'yellow', 'green'],
        legend: 'color',
        legendPosition: 'start',
        legendOffset: -20,
    },
    {
        key: 'target',
        type: 'point',
        padding: 0,
        values: ['A', 'B', 'C', 'D', 'E'],
        legend: 'target',
        legendPosition: 'start',
        legendOffset: -20,
    },
    {
        key: 'volume',
        type: 'linear',
        min: 0,
        max: 'auto',
        legend: 'volume',
        legendPosition: 'start',
        legendOffset: -20,
    },
]

export const parallelCoordinates = {
    variables,
    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },
    layout: defaultProps.layout,
    curve: defaultProps.curve,
    colors: defaultProps.colors,
    colorBy: defaultProps.colorBy,
    strokeWidth: defaultProps.strokeWidth,
    lineOpacity: defaultProps.lineOpacity,
    axesPlan: defaultProps.axesPlan,
    axesTicksPosition: defaultProps.axesTicksPosition,
    animate: true,
    motionStiffness: 90,
    motionDamping: 12,
    theme: merge({}, theme, {
        axis: {
            ticks: {
                line: {
                    strokeWidth: 2,
                    strokeLinecap: 'square',
                },
            },
            domain: {
                line: {
                    strokeWidth: 2,
                    strokeLinecap: 'square',
                },
            },
        },
    }),
}

export const parallelCoordinatesCanvas = {
    variables,
    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },
    layout: defaultProps.layout,
    curve: defaultProps.curve,
    colors: defaultProps.colors,
    colorBy: defaultProps.colorBy,
    strokeWidth: 1,
    lineOpacity: 0.2,
    axesPlan: defaultProps.axesPlan,
    axesTicksPosition: defaultProps.axesTicksPosition,
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
    theme: merge({}, theme, {
        axis: {
            ticks: {
                line: {
                    strokeWidth: 2,
                    strokeLinecap: 'square',
                },
            },
            domain: {
                line: {
                    strokeWidth: 2,
                    strokeLinecap: 'square',
                },
            },
        },
    }),
}
