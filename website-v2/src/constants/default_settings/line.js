import theme from '../../styles/nivoTheme'

export const line = {
    margin: {
        top: 50,
        right: 110,
        bottom: 50,
        left: 60,
    },

    xScale: {
        type: 'point',
    },
    yScale: {
        type: 'linear',
        stacked: true,
        min: 'auto',
        max: 'auto',
    },

    minY: 'auto',
    maxY: 'auto',

    stacked: true,
    curve: 'linear',

    axisTop: {
        enable: false,
        orient: 'top',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisRight: {
        enable: false,
        orient: 'right',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 0,
    },
    axisBottom: {
        enable: true,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendPosition: 'middle',
        legendOffset: 36,
    },
    axisLeft: {
        enable: true,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendPosition: 'middle',
        legendOffset: -40,
    },

    enableGridX: true,
    enableGridY: true,

    colors: 'nivo',
    colorBy: 'id',
    lineWidth: 2,

    enableDots: true,
    dotSize: 10,
    dotColor: { type: 'inherit:darker', gamma: 0.3 },
    dotBorderWidth: 2,
    dotBorderColor: { type: 'custom', color: '#ffffff' },
    enableDotLabel: true,
    dotLabel: 'y',
    dotLabelYOffset: -12,

    enableArea: false,
    areaBaselineValue: 0,
    areaOpacity: 0.2,

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,
    enableStackTooltip: true,

    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],

    theme,
}
