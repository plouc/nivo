import { ModernMotionProps } from '@nivo/core'
import { LineTooltip } from './LineTooltip'
import { Point } from './Point'
import { BumpCommonProps, BumpPointComponent } from './types'

const commonDefaultProps: Omit<
    BumpCommonProps<any, any>,
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'margin'
    | 'theme'
    | 'axisRight'
    | 'renderWrapper'
> = {
    layers: ['grid', 'axes', 'labels', 'lines', 'points'],

    interpolation: 'smooth',
    xPadding: 0.6,
    xOuterPadding: 0.5,
    yOuterPadding: 0.5,

    colors: { scheme: 'nivo' },
    lineWidth: 2,
    activeLineWidth: 4,
    inactiveLineWidth: 1,
    opacity: 1,
    activeOpacity: 1,
    inactiveOpacity: 0.3,

    startLabel: false,
    startLabelPadding: 16,
    startLabelTextColor: { from: 'color' },
    endLabel: true,
    endLabelPadding: 16,
    endLabelTextColor: { from: 'color' },

    pointSize: 6,
    activePointSize: 8,
    inactivePointSize: 4,
    pointColor: { from: 'serie.color' },
    pointBorderWidth: 0,
    activePointBorderWidth: 0,
    inactivePointBorderWidth: 0,
    pointBorderColor: { from: 'serie.color', modifiers: [['darker', 1.4]] },

    enableGridX: true,
    enableGridY: true,
    axisTop: {},
    axisBottom: {},
    axisLeft: {},

    isInteractive: true,
    defaultActiveSerieIds: [],
    tooltip: LineTooltip,

    role: 'img',
}

export const bumpSvgDefaultProps: typeof commonDefaultProps & {
    pointComponent: BumpPointComponent<any, any>
    animate: boolean
    motionConfig: ModernMotionProps['motionConfig']
} = {
    ...commonDefaultProps,
    pointComponent: Point,
    animate: true,
    motionConfig: 'gentle',
}
