import theme from '../../styles/nivoTheme'

export const treemap = {
    identity: 'name',
    value: 'loc',
    tile: 'squarify',
    leavesOnly: false,
    innerPadding: 3,
    outerPadding: 3,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    enableLabel: true,
    label: 'loc',
    labelFormat: '.0s',
    labelSkipSize: 12,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1.2,
    // },
    orientLabel: true,

    colors: 'nivo',
    colorBy: 'depth',
    borderWidth: 0,
    // borderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.3,
    // },

    animate: true,
    motionStiffness: 90,
    motionDamping: 11,

    isInteractive: true,

    theme,
}

export const treemapHtml = {
    identity: 'name',
    value: 'loc',
    tile: 'squarify',
    leavesOnly: false,
    innerPadding: 3,
    outerPadding: 3,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    enableLabel: true,
    label: 'loc',
    labelFormat: '.0s',
    labelSkipSize: 12,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1.2,
    // },
    orientLabel: true,

    colors: 'set2',
    colorBy: 'name',
    borderWidth: 0,
    // borderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.3,
    // },

    animate: true,
    motionStiffness: 90,
    motionDamping: 11,

    isInteractive: true,

    theme,
}

export const treemapCanvas = {
    tile: 'squarify',
    leavesOnly: true,
    innerPadding: 1,
    outerPadding: 0,

    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },

    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,

    enableLabel: true,
    labelFormat: '.0s',
    labelSkipSize: 18,
    // labelTextColor: {
    //     type: 'inherit:darker',
    //     gamma: 1.6,
    // },
    orientLabel: true,

    colors: 'paired',
    colorBy: 'id',
    borderWidth: 1,
    // borderColor: {
    //     type: 'inherit:darker',
    //     gamma: 0.8,
    // },

    isInteractive: true,

    theme,
}
