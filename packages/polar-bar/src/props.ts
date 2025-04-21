import { OrdinalColorScaleConfig } from '@nivo/colors'
import { ArcTransitionMode } from '@nivo/arcs'
import { PolarBarTooltip } from './PolarBarTooltip'

export const defaultProps = {
    indexBy: 'id',
    keys: ['value'],

    startAngle: 0,
    endAngle: 360,
    innerRadius: 0,
    padAngle: 0,
    cornerRadius: 0,

    layers: ['grid', 'arcs', 'axes', 'labels', 'legends'],

    colors: { scheme: 'nivo' } as unknown as OrdinalColorScaleConfig,
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

    animate: true,
    motionConfig: 'gentle',
    transitionMode: 'innerRadius' as ArcTransitionMode,

    role: 'img',
}

export const svgDefaultProps = defaultProps
