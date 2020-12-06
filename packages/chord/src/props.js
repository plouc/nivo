import PropTypes from 'prop-types'
import { blendModePropType, motionPropTypes } from '@nivo/core'
import { ordinalColorsPropType, inheritedColorPropType } from '@nivo/colors'
import { LegendPropShape } from '@nivo/legends'
import ChordArcTooltip from './ChordArcTooltip'
import ChordRibbonTooltip from './ChordRibbonTooltip'

const commonPropTypes = {
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    valueFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    padAngle: PropTypes.number.isRequired,
    innerRadiusRatio: PropTypes.number.isRequired,
    innerRadiusOffset: PropTypes.number.isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['ribbons', 'arcs', 'labels', 'legends']),
            PropTypes.func,
        ])
    ).isRequired,

    arcOpacity: PropTypes.number.isRequired,
    arcHoverOpacity: PropTypes.number.isRequired,
    arcHoverOthersOpacity: PropTypes.number.isRequired,
    arcBorderWidth: PropTypes.number.isRequired,
    arcBorderColor: inheritedColorPropType.isRequired,
    onArcMouseEnter: PropTypes.func,
    onArcMouseMove: PropTypes.func,
    onArcMouseLeave: PropTypes.func,
    onArcClick: PropTypes.func,
    arcTooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    ribbonOpacity: PropTypes.number.isRequired,
    ribbonHoverOpacity: PropTypes.number.isRequired,
    ribbonHoverOthersOpacity: PropTypes.number.isRequired,
    ribbonBorderWidth: PropTypes.number.isRequired,
    ribbonBorderColor: inheritedColorPropType.isRequired,
    ribbonBlendMode: blendModePropType.isRequired,
    onRibbonMouseEnter: PropTypes.func,
    onRibbonMouseMove: PropTypes.func,
    onRibbonMouseLeave: PropTypes.func,
    onRibbonClick: PropTypes.func,
    ribbonTooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelOffset: PropTypes.number.isRequired,
    labelRotation: PropTypes.number.isRequired,
    labelTextColor: inheritedColorPropType.isRequired,

    colors: ordinalColorsPropType.isRequired,

    isInteractive: PropTypes.bool.isRequired,

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

export const ChordPropTypes = {
    ...commonPropTypes,
    ...motionPropTypes,
    role: PropTypes.string.isRequired,
}

export const ChordCanvasPropTypes = {
    pixelRatio: PropTypes.number.isRequired,
    ...commonPropTypes,
}

const commonDefaultProps = {
    padAngle: 0,
    innerRadiusRatio: 0.9,
    innerRadiusOffset: 0,

    layers: ['ribbons', 'arcs', 'labels', 'legends'],

    arcOpacity: 1,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.15,
    arcBorderWidth: 1,
    arcBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },
    arcTooltip: ChordArcTooltip,

    ribbonOpacity: 0.5,
    ribbonHoverOpacity: 0.85,
    ribbonHoverOthersOpacity: 0.15,
    ribbonBorderWidth: 1,
    ribbonBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },
    ribbonBlendMode: 'normal',
    ribbonTooltip: ChordRibbonTooltip,

    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: 0,
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    colors: { scheme: 'nivo' },

    legends: [],

    isInteractive: true,
}

export const ChordDefaultProps = {
    ...commonDefaultProps,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    role: 'img',
}

export const ChordCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
