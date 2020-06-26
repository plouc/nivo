/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { treeMapTilePropType, defsPropTypes } from '@nivo/core'
import {
    ordinalColorsPropType,
    colorPropertyAccessorPropType,
    inheritedColorPropType,
} from '@nivo/colors'
import TreeMapNode from './TreeMapNode'
import TreeMapHtmlNode from './TreeMapHtmlNode'

const commonPropTypes = {
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    valueFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    colors: ordinalColorsPropType.isRequired,
    colorBy: colorPropertyAccessorPropType.isRequired,
    nodeOpacity: PropTypes.number.isRequired,

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

    enableParentLabel: PropTypes.bool.isRequired,
    parentLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    parentLabelSize: PropTypes.number.isRequired,
    parentLabelPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    parentLabelPadding: PropTypes.number.isRequired,
    parentLabelTextColor: inheritedColorPropType.isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.func,
}

export const TreeMapPropTypes = {
    ...commonPropTypes,
    nodeComponent: PropTypes.elementType.isRequired,
    ...defsPropTypes,
}

export const TreeMapHtmlPropTypes = {
    ...commonPropTypes,
    nodeComponent: PropTypes.elementType.isRequired,
}

export const TreeMapCanvasPropTypes = {
    ...commonPropTypes,
    pixelRatio: PropTypes.number.isRequired,
}

const commonDefaultProps = {
    identity: 'id',
    value: 'value',

    tile: 'squarify',
    leavesOnly: false,
    innerPadding: 0,
    outerPadding: 0,

    colors: { scheme: 'nivo' },
    colorBy: 'pathComponents.1',
    nodeOpacity: 0.33,

    enableLabel: true,
    label: 'formattedValue',
    labelSkipSize: 0,
    labelTextColor: { from: 'color', modifiers: [['darker', 1]] },
    orientLabel: true,

    enableParentLabel: true,
    parentLabel: 'id',
    parentLabelSize: 20,
    parentLabelPosition: 'top',
    parentLabelPadding: 6,
    parentLabelTextColor: { from: 'color', modifiers: [['darker', 1]] },

    borderWidth: 1,
    borderColor: { from: 'color', modifiers: [['darker', 1]] },

    isInteractive: true,

    animate: true,
    motionConfig: 'gentle',
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
