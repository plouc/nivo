import theme from '../../styles/nivoTheme'

export const radar = {
    indexBy: 'taste',

    maxValue: 'auto',

    margin: {
        top: 70,
        right: 80,
        bottom: 40,
        left: 80,
    },

    curve: 'catmullRomClosed',

    borderWidth: 2,
    // borderColor: { type: 'inherit' },

    gridLevels: 5,
    gridShape: 'circular',
    gridLabelOffset: 36,

    enableDots: true,
    dotSize: 8,
    // dotColor: { type: 'inherit' },
    dotBorderWidth: 0,
    // dotBorderColor: { type: 'custom', color: '#ffffff' },
    enableDotLabel: true,
    dotLabel: 'value',
    dotLabelYOffset: -12,

    colors: 'nivo',
    colorBy: 'key',
    fillOpacity: 0.1,

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: d => {
                alert(JSON.stringify(d, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                    },
                },
            ],
        },
    ],

    theme,
}