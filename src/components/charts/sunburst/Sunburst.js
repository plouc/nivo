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
import { merge, sortBy, cloneDeep } from 'lodash'
import { Motion, TransitionMotion, spring } from 'react-motion'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withProps from 'recompose/withProps'
import pure from 'recompose/pure'
import { partition as Partition, hierarchy } from 'd3-hierarchy'
import { arc } from 'd3-shape'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import { withTheme, withDimensions, withColors } from '../../../hocs'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import SunburstArc from './SunburstArc'

const getAncestor = node => {
    if (node.depth === 1) return node
    if (node.parent) return getAncestor(node.parent)
    return node
}

const Sunburst = ({
    nodes,

    // dimensions
    margin,
    centerX,
    centerY,
    outerWidth,
    outerHeight,

    arcGenerator,

    // border
    borderWidth,
    borderColor,

    // interactivity
    isInteractive,
}) => {
    return (
        <Container isInteractive={isInteractive}>
            {({ showTooltip, hideTooltip }) =>
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                    <g transform={`translate(${centerX}, ${centerY})`}>
                        {nodes
                            .filter(node => node.depth > 0)
                            .map((node, i) =>
                                <SunburstArc
                                    key={i}
                                    node={node}
                                    arcGenerator={arcGenerator}
                                    borderWidth={borderWidth}
                                    borderColor={borderColor}
                                    showTooltip={showTooltip}
                                    hideTooltip={hideTooltip}
                                />
                            )}
                    </g>
                </SvgWrapper>}
        </Container>
    )
}

Sunburst.propTypes = {
    data: PropTypes.object.isRequired,
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIdentity: PropTypes.func.isRequired, // computed
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getValue: PropTypes.func.isRequired, // computed
    nodes: PropTypes.array.isRequired, // computed

    partition: PropTypes.func.isRequired, // computed

    cornerRadius: PropTypes.number.isRequired,
    arcGenerator: PropTypes.func.isRequired, // computed

    radius: PropTypes.number.isRequired, // computed
    centerX: PropTypes.number.isRequired, // computed
    centerY: PropTypes.number.isRequired, // computed

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    childColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

    // interactivity
    isInteractive: PropTypes.bool,
}

export const SunburstDefaultProps = {
    identity: 'id',
    value: 'value',

    cornerRadius: 0,

    // border
    borderWidth: 1,
    borderColor: 'white',

    childColor: 'inherit',

    // interactivity
    isInteractive: true,
}

const enhance = compose(
    defaultProps(SunburstDefaultProps),
    withTheme(),
    withDimensions(),
    withColors(),
    withProps(({ width, height }) => {
        const radius = Math.min(width, height) / 2

        const partition = Partition().size([2 * Math.PI, radius * radius])

        return { radius, partition, centerX: width / 2, centerY: height / 2 }
    }),
    withPropsOnChange(['cornerRadius'], ({ cornerRadius }) => ({
        arcGenerator: arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => Math.sqrt(d.y0))
            .outerRadius(d => Math.sqrt(d.y1))
            .cornerRadius(cornerRadius),
    })),
    withPropsOnChange(['identity'], ({ identity }) => ({
        getIdentity: getAccessorFor(identity),
    })),
    withPropsOnChange(['value'], ({ value }) => ({
        getValue: getAccessorFor(value),
    })),
    withPropsOnChange(['data', 'getValue'], ({ data, getValue }) => ({
        data: hierarchy(data).sum(getValue),
    })),
    withPropsOnChange(['childColor'], ({ childColor }) => ({
        getChildColor: getInheritedColorGenerator(childColor),
    })),
    withPropsOnChange(
        ['data', 'partition', 'getIdentity', 'getChildColor'],
        ({ data, partition, getIdentity, getColor, getChildColor }) => {
            const total = data.value

            const nodes = sortBy(partition(cloneDeep(data)).descendants(), 'depth')
            nodes.forEach(node => {
                const ancestor = getAncestor(node).data

                delete node.children
                delete node.data.children

                Object.assign(node.data, {
                    id: getIdentity(node.data),
                    value: node.value,
                    percentage: 100 * node.value / total,
                    depth: node.depth,
                    ancestor,
                })

                if (node.depth === 1) {
                    node.data.color = getColor(node.data)
                } else if (node.depth > 1) {
                    node.data.color = getChildColor(node.parent.data)
                }
            })

            return { nodes }
        }
    ),
    pure
)

export default enhance(Sunburst)
