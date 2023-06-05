import { LayerId, ChordSvgProps, ChordCommonProps } from './types'
import { ChordArcTooltip } from './ChordArcTooltip'
import { ChordRibbonTooltip } from './ChordRibbonTooltip'

export const commonDefaultProps: Omit<
    ChordCommonProps,
    | 'valueFormat'
    | 'margin'
    | 'theme'
    | 'onArcMouseEnter'
    | 'onArcMouseMove'
    | 'onArcMouseLeave'
    | 'onArcClick'
    | 'onRibbonMouseEnter'
    | 'onRibbonMouseMove'
    | 'onRibbonMouseLeave'
    | 'onRibbonClick'
    | 'renderWrapper'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> & {
    layers: LayerId[]
} = {
    layers: ['ribbons', 'arcs', 'labels', 'legends'],

    padAngle: 0,
    innerRadiusRatio: 0.9,
    innerRadiusOffset: 0,

    colors: { scheme: 'nivo' },

    arcOpacity: 1,
    activeArcOpacity: 1,
    inactiveArcOpacity: 0.15,
    arcBorderWidth: 1,
    arcBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },
    arcTooltip: ChordArcTooltip,

    ribbonOpacity: 0.5,
    activeRibbonOpacity: 0.85,
    inactiveRibbonOpacity: 0.15,
    ribbonBorderWidth: 1,
    ribbonBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },
    ribbonBlendMode: 'normal',

    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: 0,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    isInteractive: true,

    legends: [],

    animate: true,
    motionConfig: 'gentle',

    role: 'img',
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    ribbonBlendMode: 'normal' as NonNullable<ChordSvgProps['ribbonBlendMode']>,
    ribbonTooltip: ChordRibbonTooltip,
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
