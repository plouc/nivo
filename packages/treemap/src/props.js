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
import { treeMapTilePropType, defsPropTypes } from '@nivo/core'
import TreeMapNode from './TreeMapNode'
import TreeMapHtmlNode from './TreeMapHtmlNode'

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
    tile: treeMapTilePropType.isRequired,
    innerPadding: PropTypes.number.isRequired,
    outerPadding: PropTypes.number.isRequired,

    // labels
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.string,
    labelSkipSize: PropTypes.number.isRequired,
    orientLabel: PropTypes.bool.isRequired,

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    tooltip: PropTypes.func,
}

export const TreeMapPropTypes = {
    ...commonPropTypes,
    nodeComponent: PropTypes.func.isRequired,
    ...defsPropTypes,
}

export const TreeMapHtmlPropTypes = {
    ...commonPropTypes,
    nodeComponent: PropTypes.func.isRequired,
}

export const TreeMapCanvasPropTypes = {
    ...commonPropTypes,
    pixelRatio: PropTypes.number.isRequired,
}

/*—————————————————————————————————————————————————————————————————————————————

  Default props

—————————————————————————————————————————————————————————————————————————————*/

const commonDefaultProps = {
    // data
    identity: 'id',

    tile: 'squarify',
    leavesOnly: false,

    // labels
    enableLabel: true,
    label: 'id',
    labelSkipSize: 0,
    labelTextColor: 'inherit:darker(1)',
    orientLabel: true,

    innerPadding: 0,
    outerPadding: 0,

    borderWidth: 0,
    borderColor: 'inherit',

    // interactivity
    isInteractive: true,
    onClick: noop,
}

export const TreeMapDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: TreeMapNode,
    defs: [],
    fill: [],
}

export const TreeMapHtmlDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: TreeMapHtmlNode,
}

export const TreeMapCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
