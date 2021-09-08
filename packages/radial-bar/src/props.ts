import { RadialBarLayerId } from './types'
import { RadialBarTooltip } from './RadialBarTooltip'

export const svgDefaultProps = {
    layers: ['grid', 'bars', 'legends'] as RadialBarLayerId[],

    startAngle: 0,
    endAngle: 270,

    colors: { scheme: 'nivo' as const },
    cornerRadius: 0,

    isInteractive: true,
    tooltip: RadialBarTooltip,

    animate: true,
    motionConfig: 'gentle' as const,
    transitionMode: 'startAngle' as const,

    renderWrapper: true,
}
