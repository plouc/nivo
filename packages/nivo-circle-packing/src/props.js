/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { noop } from '@nivo/core'
import { defsPropTypes } from '@nivo/core'
import BubbleNode from './BubbleNode'
import BubbleHtmlNode from './BubbleHtmlNode'

/*—————————————————————————————————————————————————————————————————————————————

  Prop types

—————————————————————————————————————————————————————————————————————————————*/

const commonPropTypes = {
    // data
    // `root` managed by `withHierarchy()` HOC
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

    // dimensions managed by `withDimensions()` HOC

    // styling
    // theme managed by `withTheme()` HOC
    // colors managed by `withColors()` HOC

    leavesOnly: PropTypes.bool.isRequired,
    padding: PropTypes.number.isRequired,

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,

    // labels
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.string,
    labelTextColor: PropTypes.any.isRequired,
    labelSkipRadius: PropTypes.number.isRequired,

    // interactivity
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

/*—————————————————————————————————————————————————————————————————————————————

  Default props

—————————————————————————————————————————————————————————————————————————————*/

const commonDefaultProps = {
    identity: 'id',

    leavesOnly: false,
    padding: 1,

    // border
    borderWidth: 0,
    borderColor: 'inherit',

    // labels
    enableLabel: true,
    label: 'id',
    labelTextColor: 'inherit:darker(1)',
    labelSkipRadius: 8,

    // interactivity
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
