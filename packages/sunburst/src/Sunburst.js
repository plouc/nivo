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
import { noop } from '@nivo/core'
import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withProps from 'recompose/withProps'
import pure from 'recompose/pure'
import { partition as Partition, hierarchy } from 'd3-hierarchy'
import { arc } from 'd3-shape'
import {
    withTheme,
    withDimensions,
    getAccessorFor,
    getLabelGenerator,
    Container,
    SvgWrapper,
} from '@nivo/core'
import {
    getOrdinalColorScale,
    ordinalColorsPropType,
    inheritedColorPropType,
    getInheritedColorGenerator,
} from '@nivo/colors'
import SunburstLabels from './SunburstLabels'
import SunburstArc from './SunburstArc'

const getAncestor = node => {
    if (node.depth === 1) return node
    if (node.parent) return getAncestor(node.parent)
    return node
}

const Sunburst = ({
    nodes,

    margin, // eslint-disable-line react/prop-types
    centerX,
    centerY,
    outerWidth, // eslint-disable-line react/prop-types
    outerHeight, // eslint-disable-line react/prop-types

    arcGenerator,

    borderWidth,
    borderColor,

    // slices labels
    enableSlicesLabels,
    getSliceLabel,
    slicesLabelsSkipAngle,
    slicesLabelsTextColor,

    // theming
    theme, // eslint-disable-line react/prop-types

    role,

    isInteractive,
    tooltipFormat,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    return (
        <Container isInteractive={isInteractive} theme={theme} animate={false}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper
                    width={outerWidth}
                    height={outerHeight}
                    margin={margin}
                    theme={theme}
                    role={role}
                >
                    <g transform={`translate(${centerX}, ${centerY})`}>
                        {nodes
                            .filter(node => node.depth > 0)
                            .map((node, i) => (
                                <SunburstArc
                                    key={i}
                                    node={node}
                                    arcGenerator={arcGenerator}
                                    borderWidth={borderWidth}
                                    borderColor={borderColor}
                                    showTooltip={showTooltip}
                                    hideTooltip={hideTooltip}
                                    tooltipFormat={tooltipFormat}
                                    tooltip={tooltip}
                                    onClick={onClick}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                    theme={theme}
                                />
                            ))}
                        {enableSlicesLabels && (
                            <SunburstLabels
                                nodes={nodes}
                                theme={theme}
                                label={getSliceLabel}
                                skipAngle={slicesLabelsSkipAngle}
                                textColor={getInheritedColorGenerator(
                                    slicesLabelsTextColor,
                                    'labels.text.fill'
                                )}
                            />
                        )}
                    </g>
                </SvgWrapper>
            )}
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

    colors: ordinalColorsPropType.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    childColor: inheritedColorPropType.isRequired,

    // slices labels
    enableSlicesLabels: PropTypes.bool.isRequired,
    getSliceLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    slicesLabelsSkipAngle: PropTypes.number,
    slicesLabelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    role: PropTypes.string.isRequired,

    isInteractive: PropTypes.bool,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
}

export const SunburstDefaultProps = {
    identity: 'id',
    value: 'value',

    cornerRadius: 0,

    colors: { scheme: 'nivo' },
    borderWidth: 1,
    borderColor: 'white',

    childColor: { from: 'color' },
    role: 'img',

    // slices labels
    enableSlicesLabels: false,
    sliceLabel: 'value',
    slicesLabelsTextColor: 'theme',

    isInteractive: true,
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
}

const enhance = compose(
    defaultProps(SunburstDefaultProps),
    withTheme(),
    withDimensions(),
    withPropsOnChange(['colors'], ({ colors }) => ({
        getColor: getOrdinalColorScale(colors, 'id'),
    })),
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
    withPropsOnChange(['childColor', 'theme'], ({ childColor, theme }) => ({
        getChildColor: getInheritedColorGenerator(childColor, theme),
    })),
    withPropsOnChange(
        ['data', 'partition', 'getIdentity', 'getChildColor'],
        ({ data, partition, getIdentity, getColor, childColor, getChildColor }) => {
            const total = data.value

            const nodes = sortBy(partition(cloneDeep(data)).descendants(), 'depth')
            nodes.forEach(node => {
                const ancestor = getAncestor(node).data

                delete node.children
                delete node.data.children

                Object.assign(node.data, {
                    id: getIdentity(node.data),
                    value: node.value,
                    percentage: (100 * node.value) / total,
                    depth: node.depth,
                    ancestor,
                })

                if (node.depth === 1 || childColor === 'noinherit') {
                    node.data.color = getColor(node.data)
                } else if (node.depth > 1) {
                    node.data.color = getChildColor(node.parent.data)
                }
            })

            return { nodes }
        }
    ),
    withPropsOnChange(['sliceLabel'], ({ sliceLabel }) => ({
        getSliceLabel: getLabelGenerator(sliceLabel),
    })),
    pure
)

const enhancedSunburst = enhance(Sunburst)
enhancedSunburst.displayName = 'Sunburst'

export default enhancedSunburst
