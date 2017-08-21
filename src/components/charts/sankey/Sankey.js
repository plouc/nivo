/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { cloneDeep } from 'lodash'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { withColors, withTheme, withDimensions, withMotion } from '../../../hocs'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import SvgWrapper from '../SvgWrapper'
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey'
import SankeyNodes from './SankeyNodes'
import SankeyLinks from './SankeyLinks'

const getLinkPath = sankeyLinkHorizontal()

const Sankey = ({
    data: _data,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    // nodes
    nodeOpacity,
    nodeWidth,
    nodePadding,
    nodeBorderWidth,
    getNodeBorderColor,

    // links
    linkOpacity,
    getLinkColor,

    // theming
    getColor, // computed

    // motion
    animate,
    motionDamping,
    motionStiffness,

    // interactivity
    isInteractive,
}) => {
    const sankey = d3Sankey()
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .size([width, height])
        .nodeId(d => d.id)

    const data = cloneDeep(_data)
    sankey(data)

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            <SankeyLinks
                links={data.links}
                linkOpacity={linkOpacity}
                getLinkColor={getLinkColor}
                {...motionProps}
            />
            <SankeyNodes
                nodes={data.nodes}
                getColor={getColor}
                nodeOpacity={nodeOpacity}
                nodeBorderWidth={nodeBorderWidth}
                getNodeBorderColor={getNodeBorderColor}
                {...motionProps}
            />
        </SvgWrapper>
    )
}

Sankey.propTypes = {
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

    // nodes
    nodeOpacity: PropTypes.number.isRequired,
    nodeWidth: PropTypes.number.isRequired,
    nodePadding: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    nodeBorderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // links
    linkOpacity: PropTypes.number.isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
}

export const SankeyDefaultProps = {
    // nodes
    nodeOpacity: 0.65,
    nodeWidth: 12,
    nodePadding: 12,
    nodeBorderWidth: 1,
    nodeBorderColor: 'inherit:darker(0.5)',

    // links
    linkOpacity: 0.25,

    // interactivity
    isInteractive: true,
}

const enhance = compose(
    defaultProps(SankeyDefaultProps),
    withColors(),
    withColors({
        colorByKey: 'linkColorBy',
        destKey: 'getLinkColor',
        defaultColorBy: 'source.id',
    }),
    withTheme(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['nodeBorderColor'], ({ nodeBorderColor }) => ({
        getNodeBorderColor: getInheritedColorGenerator(nodeBorderColor),
    })),
    pure
)

export default enhance(Sankey)
