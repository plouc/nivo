import { defaultAxisProps } from '@nivo/axes'
import { LineTooltip } from './LineTooltip'
import { Point } from './Point'
import { BumpCommonProps, DefaultBumpDatum, BumpSvgPropsWithDefaults } from './types'
import PointTooltip from './PointTooltip'

const commonDefaultProps: BumpCommonProps<DefaultBumpDatum, Record<string, unknown>> = {
    layers: ['grid', 'axes', 'labels', 'lines', 'points', 'mesh'],
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
    axisTop: defaultAxisProps,
    axisRight: null,
    axisBottom: defaultAxisProps,
    axisLeft: defaultAxisProps,
    isInteractive: true,
    defaultActiveSerieIds: [],
    lineTooltip: LineTooltip,
    pointTooltip: PointTooltip,
    useMesh: false,
    debugMesh: false,
    role: 'img',
    renderWrapper: true,
}

export const bumpSvgDefaultProps: Omit<
    BumpSvgPropsWithDefaults<DefaultBumpDatum, Record<string, unknown>>,
    'width' | 'height' | 'data'
> = {
    ...commonDefaultProps,
    pointComponent: Point,
    animate: true,
    motionConfig: 'gentle',
}
