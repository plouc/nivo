import theme from '../../styles/nivoTheme'

export const chord = {
    margin: {
        top: 60,
        right: 60,
        bottom: 90,
        left: 60,
    },

    padAngle: 0.02,
    innerRadiusRatio: 0.96,
    innerRadiusOffset: 0.02,

    arcOpacity: 1,
    arcBorderWidth: 1,
    //arcBorderColor: {
    //    type: 'inherit:darker',
    //    gamma: 0.4,
    //},

    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,
    //ribbonBorderColor: {
    //    type: 'inherit:darker',
    //    gamma: 0.4,
    //},

    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: -90,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1,
    // },

    colors: 'nivo',

    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.25,
    ribbonHoverOpacity: 0.75,
    ribbonHoverOthersOpacity: 0.25,

    animate: true,
    motionStiffness: 90,
    motionDamping: 7,

    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            translateY: 70,
            itemWidth: 80,
            itemHeight: 14,
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

export const chordCanvas = {
    margin: {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60,
    },

    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    padAngle: 0.006,
    innerRadiusRatio: 0.86,
    innerRadiusOffset: 0,

    arcOpacity: 1,
    arcBorderWidth: 1,
    // arcBorderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.4,
    // },

    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,
    // ribbonBorderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.4,
    // },

    enableLabel: true,
    label: 'id',
    labelOffset: 9,
    labelRotation: -90,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1,
    // },

    colors: 'paired',

    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.4,
    ribbonHoverOpacity: 0.75,
    ribbonHoverOthersOpacity: 0,

    animate: true,
    motionStiffness: 90,
    motionDamping: 7,

    theme,
}
