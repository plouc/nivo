import { RadialBarLayerId } from './types'
import { RadialBarTooltip } from './RadialBarTooltip'

export const svgDefaultProps = {
    layers: ['grid', 'bars', 'labels', 'legends'] as RadialBarLayerId[],

    startAngle: 0,
    endAngle: 270,

    colors: { scheme: 'nivo' as const },
    cornerRadius: 0,

    enableLabels: true,
    label: 'value',
    labelsSkipAngle: 10,
    labelsRadiusOffset: 0.5,
    labelsTextColor: { theme: 'labels.text.fill' },

    isInteractive: true,
    tooltip: RadialBarTooltip,

    animate: true,
    motionConfig: 'gentle' as const,
    transitionMode: 'startAngle' as const,

    renderWrapper: true,
}
