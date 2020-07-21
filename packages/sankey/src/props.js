/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { sankeyCenter, sankeyJustify, sankeyLeft, sankeyRight } from 'd3-sankey'
import { noop, blendModePropType, motionPropTypes } from '@nivo/core'
import { ordinalColorsPropType, inheritedColorPropType } from '@nivo/colors'
import { LegendPropShape } from '@nivo/legends'

export const sankeyAlignmentPropMapping = {
    center: sankeyCenter,
    justify: sankeyJustify,
    start: sankeyLeft,
    end: sankeyRight,
}

export const sankeyAlignmentPropKeys = Object.keys(sankeyAlignmentPropMapping)

export const sankeyAlignmentPropType = PropTypes.oneOf(sankeyAlignmentPropKeys)

export const sankeyAlignmentFromProp = prop => sankeyAlignmentPropMapping[prop]

export const SankeyPropTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
        ).isRequired,
        links: PropTypes.arrayOf(
            PropTypes.shape({
                source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
        ).isRequired,
    }).isRequired,

    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    align: sankeyAlignmentPropType.isRequired,
    sort: PropTypes.oneOfType([
        PropTypes.oneOf(['auto', 'input', 'ascending', 'descending']),
        PropTypes.func,
    ]).isRequired,

    colors: ordinalColorsPropType.isRequired,

    nodeOpacity: PropTypes.number.isRequired,
    nodeHoverOpacity: PropTypes.number.isRequired,
    nodeHoverOthersOpacity: PropTypes.number.isRequired,
    nodeThickness: PropTypes.number.isRequired,
    nodeSpacing: PropTypes.number.isRequired,
    nodeInnerPadding: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    nodeBorderColor: inheritedColorPropType,

    linkOpacity: PropTypes.number.isRequired,
    linkHoverOpacity: PropTypes.number.isRequired,
    linkHoverOthersOpacity: PropTypes.number.isRequired,
    linkContract: PropTypes.number.isRequired,
    linkBlendMode: blendModePropType.isRequired,
    enableLinkGradient: PropTypes.bool.isRequired,

    enableLabels: PropTypes.bool.isRequired,
    labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
    labelPadding: PropTypes.number.isRequired,
    labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    labelTextColor: inheritedColorPropType,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    nodeTooltip: PropTypes.func,
    linkTooltip: PropTypes.func,

    isInteractive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['links', 'nodes', 'labels', 'legends']),
            PropTypes.func,
        ])
    ).isRequired,

    ...motionPropTypes,
}

export const SankeyDefaultProps = {
    layout: 'horizontal',
    align: 'center',
    sort: 'auto',

    colors: { scheme: 'nivo' },

    nodeOpacity: 0.75,
    nodeHoverOpacity: 1,
    nodeHoverOthersOpacity: 0.15,
    nodeThickness: 12,
    nodeSpacing: 12,
    nodeInnerPadding: 0,
    nodeBorderWidth: 1,
    nodeBorderColor: { from: 'color', modifiers: [['darker', 0.5]] },

    linkOpacity: 0.25,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.15,
    linkContract: 0,
    linkBlendMode: 'multiply',
    enableLinkGradient: false,

    enableLabels: true,
    label: 'id',
    labelPosition: 'inside',
    labelPadding: 9,
    labelOrientation: 'horizontal',
    labelTextColor: { from: 'color', modifiers: [['darker', 0.8]] },

    isInteractive: true,
    onClick: noop,

    legends: [],

    layers: ['links', 'nodes', 'labels', 'legends'],

    animate: true,
    motionConfig: 'gentle',
}
