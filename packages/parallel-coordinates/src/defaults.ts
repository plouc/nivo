import { CommonProps, BaseDatum } from './types'

export const commonDefaultProps: Omit<
    CommonProps<BaseDatum>,
    | 'margin'
    | 'theme'
    // | 'onMouseEnter'
    // | 'onMouseMove'
    // | 'onMouseLeave'
    // | 'onClick'
    // | 'forwardLegendData'
    | 'renderWrapper'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> = {
    layout: 'horizontal',
    curve: 'linear',

    role: 'img',

    colors: { scheme: 'yellow_orange_red' },
    lineWidth: 2,
    lineOpacity: 0.35,

    layers: ['axes', 'lines'],

    axesTicksPosition: 'after',

    animate: true,
    motionConfig: 'gentle',

    isInteractive: true,
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    // layers: ['cells', 'areas', 'legends'] as WaffleSvgLayer<Datum>[],
    // legends: [],
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    // layers
    // legends: [],
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
