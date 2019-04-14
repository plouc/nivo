/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { noop, defsPropTypes } from '@nivo/core'
import {
    ordinalColorsPropType,
    colorPropertyAccessorPropType,
    inheritedColorPropType,
} from '@nivo/colors'
import BubbleNode from './BubbleNode'
import BubbleHtmlNode from './BubbleHtmlNode'

const commonPropTypes = {
    // data
    // `root` managed by `withHierarchy()` HOC
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

    // dimensions managed by `withDimensions()` HOC

    // theme managed by `withTheme()` HOC
    colors: ordinalColorsPropType.isRequired,
    colorBy: colorPropertyAccessorPropType.isRequired,

    leavesOnly: PropTypes.bool.isRequired,
    padding: PropTypes.number.isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,

    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.string,
    labelTextColor: inheritedColorPropType.isRequired,
    labelSkipRadius: PropTypes.number.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    isZoomable: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,
}

export const BubblePropTypes = {
    ...commonPropTypes,
    nodeComponent: PropTypes.func.isRequired,
    ...defsPropTypes,
}

export const BubbleHtmlPropTypes = {
    ...commonPropTypes,
    nodeComponent: PropTypes.func.isRequired,
}

export const BubbleCanvasPropTypes = {
    ...commonPropTypes,
    pixelRatio: PropTypes.number.isRequired,
}

const commonDefaultProps = {
    identity: 'id',

    leavesOnly: false,
    padding: 1,

    colors: { scheme: 'nivo' },
    colorBy: 'depth',
    borderWidth: 0,
    borderColor: { from: 'color' },

    enableLabel: true,
    label: 'id',
    labelTextColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },
    labelSkipRadius: 8,

    isInteractive: true,
    onClick: noop,
    isZoomable: true,
}

export const BubbleDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: BubbleNode,
    defs: [],
    fill: [],
}

export const BubbleHtmlDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: BubbleHtmlNode,
}

export const BubbleCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
