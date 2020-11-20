import React, { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'
import { partition as d3Partition, hierarchy } from 'd3-hierarchy'
import { arc } from 'd3-shape'
import {
    getAccessorFor,
    // @ts-ignore
    getLabelGenerator,
    Container,
    SvgWrapper,
    useDimensions,
    usePartialTheme,
} from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { SunburstLabels } from './SunburstLabels'
import { SunburstArc } from './SunburstArc'
import { defaultProps } from './props'
import { SunburstSvgProps, SunburstNode, Data } from './types'

export const Sunburst = <Datum extends Record<string, unknown>>(props: SunburstSvgProps<Datum>) => {
    const {
        data: _data,
        identity,
        value,

        colors,
        childColor,

        margin: partialMargin,
        width,
        height,

        cornerRadius,

        borderWidth,
        borderColor,

        // slices labels
        enableSliceLabels,
        sliceLabel,
        sliceLabelsSkipAngle,
        sliceLabelsTextColor,

        // theming
        theme: _theme,

        role,

        // interactivity
        isInteractive,
        tooltipFormat,
        tooltip,

        // event handlers
        onClick,
        onMouseEnter,
        onMouseLeave,
    } = { ...defaultProps, ...props }

    const { margin } = useDimensions(width, height, partialMargin)
    const theme = usePartialTheme(_theme)

    const { centerX, centerY, radius } = useMemo(() => {
        const radius = Math.min(width, height) / 2

        return { radius, centerX: width / 2, centerY: height / 2 }
    }, [height, width])

    const arcGenerator = useMemo(
        () =>
            arc<SunburstNode>()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .innerRadius(d => Math.sqrt(d.y0))
                .outerRadius(d => Math.sqrt(d.y1))
                .cornerRadius(cornerRadius),
        [cornerRadius]
    )

    const getColor = useOrdinalColorScale(colors, 'id')
    const getChildColor = useInheritedColor(childColor, theme)

    const getSliceLabel = useMemo(() => getLabelGenerator(sliceLabel), [sliceLabel])
    const getIdentity = useMemo(() => getAccessorFor(identity), [identity])
    const getValue = useMemo(() => getAccessorFor(value), [value])

    const nodes = useMemo(() => {
        const partition = d3Partition<Data<Datum>>().size([2 * Math.PI, radius * radius])
        const data = hierarchy(_data).sum(getValue)
        const total = data.value ?? 0

        return sortBy(partition(cloneDeep(data)).descendants(), 'depth').reduce(
            (acc, { children: _children, ...node }) => {
                const value = node.value ?? 0
                const id = getIdentity<Data<Datum>, string>(node.data)
                const data = {
                    id,
                    value,
                    percentage: (100 * value) / total,
                    depth: node.depth,
                }
                const parent = acc.find(
                    n => node.parent && n.data.id === getIdentity(node.parent.data)
                )
                const color =
                    node.depth === 1 || childColor === 'noinherit'
                        ? getColor(data)
                        : parent
                        ? getChildColor(parent.data)
                        : node.data.color

                return [...acc, { ...node, data: { ...data, color } }]
            },
            [] as SunburstNode<Datum>[]
        )
    }, [_data, childColor, getChildColor, getColor, getIdentity, getValue, radius])

    return (
        <Container isInteractive={isInteractive} theme={theme} animate={false}>
            <SvgWrapper width={width} height={height} margin={margin} role={role}>
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
                                tooltipFormat={tooltipFormat}
                                tooltip={tooltip}
                                onClick={onClick}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                            />
                        ))}
                    {enableSliceLabels && (
                        <SunburstLabels
                            nodes={nodes}
                            label={getSliceLabel}
                            skipAngle={sliceLabelsSkipAngle}
                            textColor={sliceLabelsTextColor}
                        />
                    )}
                </g>
            </SvgWrapper>
        </Container>
    )
}
