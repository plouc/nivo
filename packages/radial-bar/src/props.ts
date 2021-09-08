import { RadialBarLayerId } from './types'

export const svgDefaultProps = {
    layers: ['bars'] as RadialBarLayerId[],

    startAngle: 0,
    endAngle: 270,

    colors: { scheme: 'nivo' as const },
    cornerRadius: 0,

    isInteractive: true,

    animate: true,
    motionConfig: 'gentle' as const,

    renderWrapper: true,
}
