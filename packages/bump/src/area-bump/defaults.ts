import { MotionProps, SvgDefsAndFill } from '@bitbloom/nivo-core'
import { AreaBumpCommonProps, AreaBumpComputedSerie, DefaultAreaBumpDatum } from './types'
import { AreaTooltip } from './AreaTooltip'

const commonDefaultProps: Omit<
    AreaBumpCommonProps<DefaultAreaBumpDatum, Record<string, unknown>>,
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onClick'
    | 'margin'
    | 'theme'
    | 'renderWrapper'
> = {
    align: 'middle',

    layers: ['grid', 'axes', 'labels', 'areas'],

    interpolation: 'smooth',
    spacing: 0,
    xPadding: 0.6,

    colors: { scheme: 'nivo' },
    blendMode: 'normal',
    fillOpacity: 0.8,
    activeFillOpacity: 1,
    inactiveFillOpacity: 0.15,
    borderWidth: 1,
    activeBorderWidth: 1,
    inactiveBorderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 0.4]] },
    borderOpacity: 1,
    activeBorderOpacity: 1,
    inactiveBorderOpacity: 0,

    startLabel: false,
    startLabelPadding: 12,
    startLabelTextColor: { from: 'color', modifiers: [['darker', 1]] },
    endLabel: true,
    endLabelPadding: 12,
    endLabelTextColor: { from: 'color', modifiers: [['darker', 1]] },

    enableGridX: true,
    axisTop: {},
    axisBottom: {},

    isInteractive: true,
    defaultActiveSerieIds: [],
    tooltip: AreaTooltip,

    role: 'img',
}

export const areaBumpSvgDefaultProps: typeof commonDefaultProps &
    SvgDefsAndFill<AreaBumpComputedSerie<DefaultAreaBumpDatum, Record<string, unknown>>> & {
        animate: boolean
        motionConfig: MotionProps['motionConfig']
    } = {
    ...commonDefaultProps,
    defs: [],
    fill: [],
    animate: true,
    motionConfig: 'gentle',
}
