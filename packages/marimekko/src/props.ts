import { LayerId, Layout, OffsetId } from './types'

export const defaultProps = {
    layout: 'vertical' as Layout,
    offset: 'none' as OffsetId,

    layers: ['grid', 'axes', 'bars', 'legends'] as LayerId[],

    //axisTop: any,
    //axisRight: any,
    //axisBottom: any,
    //axisLeft: any,
    enableGridX: false,
    enableGridY: true,

    colors: { scheme: 'nivo' },
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    isInteractive: true,

    animate: true,
    motionConfig: 'gentle',
}
