import {CommonProps, BaseDatum, LayerId} from './types'

export const commonDefaultProps: Omit<
    CommonProps<BaseDatum>,
    | 'margin'
    | 'theme'
    // | 'onMouseEnter'
    // | 'onMouseMove'
    // | 'onMouseLeave'
    // | 'onClick'
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

    legends: [],

    animate: true,
    motionConfig: 'gentle',

    isInteractive: true,
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    layers: ['axes', 'lines', 'legends'] as LayerId[],
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    layers: ['axes', 'lines', 'legends'] as LayerId[],
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
