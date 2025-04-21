import { ArcTransitionMode } from '@nivo/arcs'
import { PolarBarTooltip } from './PolarBarTooltip'
import { PolarBarCommonProps } from './types'

export const defaultProps: Omit<
    PolarBarCommonProps<any>,
    | 'margin'
    | 'theme'
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'forwardLegendData'
    | 'renderWrapper'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> = {
    indexBy: 'id',
    keys: ['value'],

    startAngle: 0,
    endAngle: 360,
    innerRadius: 0,
    cornerRadius: 0,

    layers: ['grid', 'arcs', 'axes', 'labels', 'legends'],

    colors: { scheme: 'nivo' },
    // defs: [],
    // fill: [],
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    enableRadialGrid: true,
    enableCircularGrid: true,
    radialAxisStart: {},
    radialAxisEnd: null,
    circularAxisInner: null,
    circularAxisOuter: {},

    legends: [],

    isInteractive: true,
    tooltip: PolarBarTooltip,

    role: 'img',
}

export const svgDefaultProps = {
    ...defaultProps,
    animate: true,
    motionConfig: 'gentle',
    transitionMode: 'innerRadius' as ArcTransitionMode,
}
