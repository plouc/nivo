import { patternDotsDef, patternLinesDef } from '@nivo/core'
import theme from '../../styles/nivoTheme'

export const bar = {
    indexBy: 'country',

    margin: {
        top: 50,
        right: 130,
        bottom: 50,
        left: 60,
    },

    padding: 0.3,
    innerPadding: 0,
    minValue: 'auto',
    maxValue: 'auto',

    groupMode: 'stacked',
    layout: 'vertical',
    reverse: false,

    colors: 'nivo',
    colorBy: 'id',
    defs: [
        patternDotsDef('dots', {
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
        }),
        patternLinesDef('lines', {
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
        }),
    ],
    fill: [
        { match: { id: 'fries' }, id: 'dots' },
        { match: { id: 'sandwich' }, id: 'lines' },
    ],
    borderRadius: 0,
    borderWidth: 0,
    // borderColor: {
    //     type: 'inherit:darker',
    //     gamma: 1.6,
    // },

    axisTop: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableGridX: false,
    enableGridY: true,

    enableLabel: true,
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1.6,
    // },

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],

    theme,
}

export const barCanvas =  {
    indexBy: 'country',

    margin: {
        top: 50,
        right: 60,
        bottom: 50,
        left: 60,
    },

    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    padding: 0.15,
    innerPadding: 0,
    minValue: 'auto',
    maxValue: 'auto',

    groupMode: 'stacked',
    layout: 'horizontal',
    reverse: false,

    colors: 'paired',
    colorBy: 'id',
    borderWidth: 0,
    // borderColor: {
    //     type: 'inherit:darker',
    //     gamma: 1.6,
    // },

    axisTop: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisLeft: {
        enable: true,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableGridX: false,
    enableGridY: true,

    enableLabel: true,
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1.6,
    // },

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    theme,
}