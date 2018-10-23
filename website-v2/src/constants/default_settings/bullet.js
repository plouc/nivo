import { BulletDefaultProps } from '@nivo/bullet'
import theme from '../../styles/nivoTheme'

export default {
    margin: {
        top: 50,
        right: 90,
        bottom: 50,
        left: 90,
    },
    layout: BulletDefaultProps.layout,
    reverse: BulletDefaultProps.reverse,
    spacing: 46,
    titlePosition: BulletDefaultProps.titlePosition,
    titleAlign: 'start',
    titleOffsetX: -70,
    titleOffsetY: BulletDefaultProps.titleOffsetY,
    titleRotation: BulletDefaultProps.titleRotation,
    measureSize: 0.2,
    markerSize: 0.6,
    axisPosition: BulletDefaultProps.axisPosition,
    rangeColors: BulletDefaultProps.rangeColors,
    measureColors: BulletDefaultProps.measureColors,
    markerColors: BulletDefaultProps.markerColors,
    animate: true,
    motionStiffness: 90,
    motionDamping: 12,
    theme,
}
