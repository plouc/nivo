import { BulletMarkersItem } from './BulletMarkersItem'
import { BulletRectsItem } from './BulletRectsItem'
import { motionDefaultProps, defaultMargin } from '@nivo/core'
import { BulletTooltip } from './BulletTooltip'

export const defaultProps = {
    layout: 'horizontal',
    reverse: false,
    spacing: 30,
    minValue: 0,
    maxValue: 'auto',
    axisPosition: 'after',
    titlePosition: 'before',
    titleAlign: 'middle',
    titleRotation: 0,
    titleOffsetX: 0,
    titleOffsetY: 0,
    rangeComponent: BulletRectsItem,
    rangeColors: 'seq:cool',
    measureComponent: BulletRectsItem,
    measureColors: 'seq:red_purple',
    markers: [],
    markerComponent: BulletMarkersItem,
    markerColors: 'seq:red_purple',
    rangeBorderWidth: 0,
    rangeBorderColor: { from: 'color' },
    measureSize: 0.4,
    measureBorderWidth: 0,
    measureBorderColor: { from: 'color' },
    markerSize: 0.6,
    isInteractive: true,
    tooltip: BulletTooltip,
    animate: motionDefaultProps.animate,
    motionConfig: motionDefaultProps.config,
    margin: defaultMargin,
    role: 'img',
} as const
