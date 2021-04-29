import { LayerId, Layout, OffsetId } from './types'

export const defaultProps = {
    layout: 'vertical' as Layout,
    offset: 'none' as OffsetId,
    outerPadding: 0,
    innerPadding: 3,

    layers: ['grid', 'axes', 'bars', 'legends'] as LayerId[],

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
