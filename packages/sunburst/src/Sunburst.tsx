import React from 'react'
import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'
// @ts-ignore
import compose from 'recompose/compose'
// @ts-ignore
import defaultProps from 'recompose/defaultProps'
// @ts-ignore
import withPropsOnChange from 'recompose/withPropsOnChange'
// @ts-ignore
import withProps from 'recompose/withProps'
// @ts-ignore
import pure from 'recompose/pure'
import { partition as Partition, hierarchy } from 'd3-hierarchy'
import { arc } from 'd3-shape'
import {
    // @ts-ignore
    withTheme,
    // @ts-ignore
    withDimensions,
    // @ts-ignore
    getAccessorFor,
    // @ts-ignore
    getLabelGenerator,
    // @ts-ignore
    Container,
    // @ts-ignore
    SvgWrapper,
} from '@nivo/core'
// @ts-ignore
import { getOrdinalColorScale, getInheritedColorGenerator } from '@nivo/colors'
import SunburstLabels from './SunburstLabels'
import SunburstArc from './SunburstArc'
import { defaultProps as defaultSunburstProps } from './props'
import { SunburstSvgProps, SunburstNode, TooltipHandlers } from './types'

const getAncestor = (node: any): any => {
    if (node.depth === 1) return node
    if (node.parent) return getAncestor(node.parent)
    return node
}

const Sunburst = ({
    nodes,

    margin,
    centerX,
    centerY,
    outerWidth,
    outerHeight,

    arcGenerator,

    borderWidth,
    borderColor,

    // slices labels
    enableSlicesLabels,
    getSliceLabel,
    slicesLabelsSkipAngle,
    slicesLabelsTextColor,

    // theming
    theme,

    role,

    // interactivity
    isInteractive,
    tooltipFormat,
    tooltip,

    // event handlers
    onClick,
    onMouseEnter,
    onMouseLeave,
}: SunburstSvgProps & Required<typeof defaultSunburstProps>) => {
    return (
        <Container isInteractive={isInteractive} theme={theme} animate={false}>
            {({ showTooltip, hideTooltip }: TooltipHandlers) => (
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

const enhance = compose(
    defaultProps(defaultSunburstProps),
    withTheme(),
    withDimensions(),
    withPropsOnChange(['colors'], ({ colors }: Required<SunburstSvgProps>) => ({
        getColor: getOrdinalColorScale(colors, 'id'),
    })),
    withProps(({ width, height }: Record<string, number>) => {
        const radius = Math.min(width, height) / 2

        const partition = Partition().size([2 * Math.PI, radius * radius])

        return { radius, partition, centerX: width / 2, centerY: height / 2 }
    }),
    withPropsOnChange(['cornerRadius'], ({ cornerRadius }: { cornerRadius: number }) => ({
        arcGenerator: arc<SunburstNode>()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => Math.sqrt(d.y0))
            .outerRadius(d => Math.sqrt(d.y1))
            .cornerRadius(cornerRadius),
    })),
    withPropsOnChange(['identity'], ({ identity }: SunburstSvgProps) => ({
        getIdentity: getAccessorFor(identity),
    })),
    withPropsOnChange(['value'], ({ value }: SunburstSvgProps) => ({
        getValue: getAccessorFor(value),
    })),
    withPropsOnChange(['data', 'getValue'], ({ data, getValue }: Required<SunburstSvgProps>) => ({
        data: hierarchy(data).sum(getValue as any),
    })),
    withPropsOnChange(['childColor', 'theme'], ({ childColor, theme }: SunburstSvgProps) => ({
        getChildColor: getInheritedColorGenerator(childColor, theme),
    })),
    withPropsOnChange(
        ['data', 'partition', 'getIdentity', 'getChildColor'],
        ({
            data,
            partition,
            getIdentity,
            getColor,
            childColor,
            getChildColor,
        }: Required<SunburstSvgProps>) => {
            const total = (data as any).value

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
    withPropsOnChange(['sliceLabel'], ({ sliceLabel }: SunburstSvgProps) => ({
        getSliceLabel: getLabelGenerator(sliceLabel),
    })),
    pure
)

const enhancedSunburst = (enhance(Sunburst as any) as unknown) as React.FC<SunburstSvgProps>
enhancedSunburst.displayName = 'Sunburst'

export default enhancedSunburst
