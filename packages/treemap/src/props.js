/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { noop, treeMapTilePropType, defsPropTypes } from '@nivo/core'
import {
    ordinalColorsPropType,
    colorPropertyAccessorPropType,
    inheritedColorPropType,
} from '@nivo/colors'
import TreeMapNode from './TreeMapNode'
import TreeMapHtmlNode from './TreeMapHtmlNode'

const commonPropTypes = {
    // data
    // `root` managed by `withHierarchy()` HOC
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

    // dimensions managed by `withDimensions()` HOC

    // styling
    // theme managed by `withTheme()` HOC
    colors: ordinalColorsPropType.isRequired,
    colorBy: colorPropertyAccessorPropType.isRequired,

    leavesOnly: PropTypes.bool.isRequired,
    tile: treeMapTilePropType.isRequired,
    innerPadding: PropTypes.number.isRequired,
    outerPadding: PropTypes.number.isRequired,

    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.string,
    labelSkipSize: PropTypes.number.isRequired,
    labelTextColor: inheritedColorPropType.isRequired,
    orientLabel: PropTypes.bool.isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,

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

const commonDefaultProps = {
    identity: 'id',

    tile: 'squarify',
    leavesOnly: false,

    colors: { scheme: 'nivo' },
    colorBy: 'depth',

    enableLabel: true,
    label: 'id',
    labelSkipSize: 0,
    labelTextColor: { from: 'color', modifiers: [['darker', 1]] },
    orientLabel: true,

    innerPadding: 0,
    outerPadding: 0,

    borderWidth: 0,
    borderColor: { from: 'color' },

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
