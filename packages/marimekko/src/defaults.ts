import { MarimekkoCommonProps, MarimekkoSvgPropsWithDefaults } from './types'
import { BarTooltip } from './BarTooltip'

export const commonDefaultProps: Omit<MarimekkoCommonProps<any>, 'margin' | 'theme'> = {
    layout: 'vertical',
    offset: 'none',
    outerPadding: 0,
    innerPadding: 3,
    enableGridX: false,
    enableGridY: true,
    axisTop: null,
    axisRight: null,
    axisBottom: null,
    axisLeft: null,
    colors: { scheme: 'nivo' },
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },
    isInteractive: true,
    tooltip: BarTooltip,
    legends: [],
}

export const svgDefaultProps: Omit<
    MarimekkoSvgPropsWithDefaults<any>,
    'data' | 'id' | 'value' | 'dimensions' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    layers: ['grid', 'axes', 'bars', 'legends'],
    animate: true,
    motionConfig: 'gentle',
    defs: [],
    fill: [],
}
