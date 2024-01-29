import { patternDotsDef, patternSquaresDef } from '@nivo/core'
import { defaultProps, svgDefaultProps } from '@nivo/stream'

export default {
    label: defaultProps.label,
    valueFormat: { format: '', enabled: false },

    margin: {
        top: 50,
        right: 110,
        bottom: 50,
        left: 60,
    },

    axisTop: {
        enable: false,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
        truncateTickAt: 0,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
        truncateTickAt: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
        truncateTickAt: 0,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: -40,
        truncateTickAt: 0,
    },
    enableGridX: true,
    enableGridY: false,

    curve: 'catmullRom',
    offsetType: 'silhouette',
    order: 'none',

    colors: { scheme: 'nivo' },
    fillOpacity: 0.85,
    borderWidth: 0,
    borderColor: {
        theme: 'background',
    },

    defs: [
        patternDotsDef('dots', {
            background: 'inherit',
            color: '#2c998f',
            size: 4,
            padding: 2,
            stagger: true,
        }),
        patternSquaresDef('squares', {
            background: 'inherit',
            color: '#e4c912',
            size: 6,
            padding: 2,
            stagger: true,
        }),
    ],
    fill: [
        { match: { id: 'Paul' }, id: 'dots' },
        { match: { id: 'Marcel' }, id: 'squares' },
    ],

    enableDots: defaultProps.enableDots,
    dotSize: 8,
    dotColor: { from: 'color' },
    dotBorderWidth: 2,
    dotBorderColor: { from: 'color', modifiers: [['darker', 0.7]] },

    animate: svgDefaultProps.animate,
    motionConfig: svgDefaultProps.motionConfig,

    isInteractive: defaultProps.isInteractive,
    enableStackTooltip: true,
}
