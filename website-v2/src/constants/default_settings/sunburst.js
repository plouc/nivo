import theme from '../../styles/nivoTheme'

export const sunburst = {
    margin: {
        top: 40,
        right: 20,
        bottom: 20,
        left: 20,
    },

    identity: 'name',
    value: 'loc',

    cornerRadius: 2,

    borderWidth: 1,
    borderColor: 'white',

    colors: 'nivo',
    colorBy: 'id',
    // childColor: {
    //     type: 'inherit',
    // },

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    isInteractive: true,

    theme,
}
