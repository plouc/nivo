import theme from '../../styles/nivoTheme'

export const waffle = {
    total: 100,

    rows: 18,
    columns: 14,
    fillDirection: 'bottom',
    padding: 1,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 120,
    },

    // cellComponent: 'default',
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: 'nivo',
    colorBy: 'id',
    borderWidth: 0,
    // borderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.3,
    // },

    animate: true,
    motionStiffness: 90,
    motionDamping: 11,

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -100,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            itemTextColor: '#777',
            symbolSize: 20,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                        itemBackground: '#f7fafb',
                    },
                },
            ],
        },
    ],

    theme,
}

export const waffleHtml = {
    total: 100,

    rows: 18,
    columns: 14,
    fillDirection: 'bottom',
    padding: 1,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    theme,
    // cellComponent: 'default',
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: 'set2',
    colorBy: 'id',
    borderWidth: 0,
    // borderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.3,
    // },

    // motion
    animate: true,
    motionStiffness: 90,
    motionDamping: 11,

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,
}

export const waffleCanvas = {
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    total: 140,

    rows: 40,
    columns: 40,
    fillDirection: 'bottom',
    padding: 0.5,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 120,
    },

    theme,
    emptyColor: '#cccccc',
    emptyOpacity: 1,
    colors: 'category10',
    colorBy: 'id',
    borderWidth: 0,
    // borderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.3,
    // },

    isInteractive: true,
    'custom tooltip example': false,
    tooltip: null,

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: -100,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            itemTextColor: '#777',
            symbolSize: 20,
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000',
                        itemBackground: '#f7fafb',
                    },
                },
            ],
        },
    ],
}
