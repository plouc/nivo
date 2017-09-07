/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { sankeyAlignmentPropType } from '../../../props'

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

    align: sankeyAlignmentPropType.isRequired,

    // nodes
    nodeOpacity: PropTypes.number.isRequired,
    nodeHoverOpacity: PropTypes.number.isRequired,
    nodeHoverOthersOpacity: PropTypes.number.isRequired,
    nodeWidth: PropTypes.number.isRequired,
    nodePaddingX: PropTypes.number.isRequired,
    nodePaddingY: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    nodeBorderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // links
    linkOpacity: PropTypes.number.isRequired,
    linkHoverOpacity: PropTypes.number.isRequired,
    linkHoverOthersOpacity: PropTypes.number.isRequired,
    linkContract: PropTypes.number.isRequired,

    // labels
    enableLabels: PropTypes.bool.isRequired,
    labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
    labelPadding: PropTypes.number.isRequired,
    labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getLabelTextColor: PropTypes.func.isRequired, // computed

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
}

export const SankeyDefaultProps = {
    align: 'center',

    // nodes
    nodeOpacity: 0.75,
    nodeHoverOpacity: 1,
    nodeHoverOthersOpacity: 0.15,
    nodeWidth: 12,
    nodePaddingX: 0,
    nodePaddingY: 12,
    nodeBorderWidth: 1,
    nodeBorderColor: 'inherit:darker(0.5)',

    // links
    linkOpacity: 0.25,
    linkHoverOpacity: 0.6,
    linkHoverOthersOpacity: 0.15,
    linkContract: 0,

    // labels
    enableLabels: true,
    labelPosition: 'inside',
    labelPadding: 9,
    labelOrientation: 'horizontal',
    labelTextColor: 'inherit:darker(0.8)',

    // interactivity
    isInteractive: true,
}
