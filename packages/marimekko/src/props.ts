import { LayerId, Layout } from './types'

export const defaultProps = {
    layout: 'vertical' as Layout,

    layers: ['grid', 'axes', 'bars', 'legends'] as LayerId[],

    colors: { scheme: 'nivo' },
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    isInteractive: true,

    animate: true,
}
