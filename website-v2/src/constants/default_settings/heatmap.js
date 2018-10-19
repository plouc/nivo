import { patternLinesDef } from '@nivo/core'
import theme from '../../styles/nivoTheme'

export const heatmap = {
    indexBy: 'country',

    margin: {
        top: 100,
        right: 60,
        bottom: 60,
        left: 60,
    },

    minValue: 'auto',
    maxValue: 'auto',
    forceSquare: true,
    sizeVariation: 0,
    padding: 0,
    colors: 'nivo',

    axisTop: {
        enable: true,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 0,
    },
    axisBottom: {
        enable: false,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableGridX: false,
    enableGridY: false,

    cellShape: 'rect',
    cellOpacity: 1,
    cellBorderWidth: 0,
    // cellBorderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.4,
    // },

    enableLabels: true,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1.8,
    // },

    defs: [
        patternLinesDef('lines', {
            background: 'inherit',
            color: 'rgba(0, 0, 0, 0.1)',
            rotation: -45,
            lineWidth: 4,
            spacing: 7,
        }),
    ],
    fill: [{ match: d => false && d.value < 30, id: 'lines' }],

    // motion
    animate: true,
    motionStiffness: 80,
    motionDamping: 9,

    // interactivity
    isInteractive: true,
    hoverTarget: 'cell',
    cellHoverOpacity: 1,
    cellHoverOthersOpacity: 0.25,

    theme,
}

export const heatmapCanvas = {
    indexBy: 'country',

    margin: {
        top: 100,
        right: 60,
        bottom: 100,
        left: 60,
    },

    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    minValue: 'auto',
    maxValue: 'auto',
    forceSquare: false,
    sizeVariation: 0,
    padding: 0,
    colors: 'BrBG',

    axisTop: {
        enable: true,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: true,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableGridX: false,
    enableGridY: true,

    cellShape: 'rect',
    cellOpacity: 1,
    cellBorderWidth: 0,
    // cellBorderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.4,
    // },

    enableLabels: true,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1.4,
    // },

    animate: true,
    motionStiffness: 120,
    motionDamping: 9,

    isInteractive: true,
    hoverTarget: 'rowColumn',
    cellHoverOpacity: 1,
    cellHoverOthersOpacity: 0.5,

    theme,
}