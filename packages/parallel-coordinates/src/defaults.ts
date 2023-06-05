import { CommonProps, BaseDatum, LayerId } from './types'
import { ParallelCoordinatesLineTooltip } from './ParallelCoordinatesLineTooltip'

export const commonDefaultProps: Omit<
    CommonProps<BaseDatum>,
    | 'groupBy'
    | 'groups'
    | 'margin'
    | 'theme'
    | 'forwardLegendData'
    | 'renderWrapper'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> = {
    layout: 'horizontal',
    curve: 'linear',

    role: 'img',

    colors: { scheme: 'category10' },
    lineWidth: 2,
    lineOpacity: 0.5,

    axesTicksPosition: 'after',

    isInteractive: true,
    tooltip: ParallelCoordinatesLineTooltip,

    legends: [],

    animate: true,
    motionConfig: 'gentle',
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    layers: ['lines', 'axes', 'legends'] as LayerId[],
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    layers: ['lines', 'axes', 'legends'] as LayerId[],
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
