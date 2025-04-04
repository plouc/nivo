// @ts-ignore
import { motionDefaultProps } from '@nivo/core'
import { FunnelLayerId } from './types'

export const svgDefaultProps = {
    layers: ['separators', 'parts', 'labels', 'annotations'] as FunnelLayerId[],

    direction: 'vertical' as const,
    interpolation: 'smooth' as const,
    fixedShape: false,
    neckHeightRatio: 0.33,
    neckWidthRatio: 0.33,
    spacing: 0,
    shapeBlending: 0.66,

    colors: { scheme: 'nivo' as const },
    fillOpacity: 1,

    borderWidth: 6,
    borderColor: { from: 'color' },
    borderOpacity: 0.66,

    enableLabel: true,
    labelColor: { theme: 'background' },

    enableBeforeSeparators: true,
    beforeSeparatorLength: 0,
    beforeSeparatorOffset: 0,
    enableAfterSeparators: true,
    afterSeparatorLength: 0,
    afterSeparatorOffset: 0,

    annotations: [],

    isInteractive: true,
    currentPartSizeExtension: 0,

    role: 'img',

    animate: motionDefaultProps.animate,
    motionConfig: motionDefaultProps.config,
}
