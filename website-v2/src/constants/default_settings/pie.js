import theme from '../../styles/nivoTheme'

export const pie = {
    margin: {
        top: 40,
        right: 80,
        bottom: 80,
        left: 80,
    },

    startAngle: 0,
    endAngle: 360,
    sortByValue: false,
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    fit: true,

    colors: 'nivo',
    colorBy: 'id',

    borderWidth: 1,
    //borderColor: { type: 'inherit:darker', gamma: 0.2 },

    enableRadialLabels: true,
    radialLabel: 'id',
    radialLabelsSkipAngle: 10,
    radialLabelsTextXOffset: 6,
    //radialLabelsTextColor: { type: 'custom', color: '#333333' },
    radialLabelsLinkOffset: 0,
    radialLabelsLinkDiagonalLength: 16,
    radialLabelsLinkHorizontalLength: 24,
    radialLabelsLinkStrokeWidth: 1,
    //radialLabelsLinkColor: { type: 'inherit' },

    enableSlicesLabels: true,
    sliceLabel: 'value',
    slicesLabelsSkipAngle: 10,
    //slicesLabelsTextColor: { type: 'custom', color: '#333333' },

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,

    'custom tooltip example': false,
    tooltip: null,
    theme,
    'showcase pattern usage': true,
    defs: [],
    fill: [],
    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
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
}

export const pieCanvas = {
    margin: {
        top: 40,
        right: 200,
        bottom: 40,
        left: 80,
    },

    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,

    startAngle: 0,
    endAngle: 360,
    sortByValue: false,
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    fit: true,

    colors: 'paired',
    colorBy: 'id',

    borderWidth: 0,
    //borderColor: { type: 'inherit:darker', gamma: 0.6 },

    enableRadialLabels: true,
    radialLabel: 'id',
    radialLabelsSkipAngle: 10,
    radialLabelsTextXOffset: 6,
    //radialLabelsTextColor: { type: 'custom', color: '#333333' },
    radialLabelsLinkOffset: 0,
    radialLabelsLinkDiagonalLength: 16,
    radialLabelsLinkHorizontalLength: 24,
    radialLabelsLinkStrokeWidth: 1,
    //radialLabelsLinkColor: { type: 'inherit' },

    enableSlicesLabels: true,
    sliceLabel: 'value',
    slicesLabelsSkipAngle: 10,
    //slicesLabelsTextColor: { type: 'custom', color: '#333333' },

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,

    'custom tooltip example': false,
    tooltip: null,
    theme,
    'showcase pattern usage': true,
    defs: [],
    fill: [],
    legends: [
        {
            anchor: 'right',
            direction: 'column',
            translateX: 140,
            itemWidth: 60,
            itemHeight: 14,
            itemsSpacing: 2,
            symbolSize: 14,
            symbolShape: 'circle',
        },
    ],
}
