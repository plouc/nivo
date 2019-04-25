/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo } from 'react'
import { hierarchy as d3Hierarchy, pack as d3Pack } from 'd3-hierarchy'
import { Delaunay } from 'd3-delaunay'
import { SvgWrapper, withContainer, useDimensions, useTheme } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'

const VoronoiCirclePacking = memo(
    ({
        data,
        width,
        height,
        margin: partialMargin,
    }) => {
        const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
            width,
            height,
            partialMargin
        )
        const size = Math.min(innerWidth, innerHeight)
        const theme = useTheme()
        const getColor = useOrdinalColorScale({ scheme: 'spectral' }, 'data.id')

        const hierarchy = useMemo(
            () => {
                const hier = d3Hierarchy({ children: data }).sum(d => d.value)
                return hier
            },
            [data]
        )
        const pack = useMemo(
            () => d3Pack().size([size, size]),
            [size]
        )
        const packed = useMemo(
            () => {
                const packedRoot = hierarchy.copy()
                pack(packedRoot)

                return packedRoot
            },
            [hierarchy, pack]
        )
        const nodes = packed.leaves()

        const points = nodes.map(n => [n.x, n.y])
        const delaunay = Delaunay.from(points)
        const voronoi = delaunay.voronoi([0, 0, size, size])        

        const enableMesh = false
        const enableCircles = true
        const renderPoints = true

        return (
            <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
                <g
                    transform={`translate(${(innerWidth - size) / 2},${(innerHeight - size) / 2})`}
                >
                    <mask id="mask">
                        <circle
                            cx={packed.x}
                            cy={packed.y}
                            r={packed.r}
                            fill="white"
                        />
                    </mask>
                    <g mask="url(#mask)">
                        {enableMesh && (
                            <path d={voronoi.render()} stroke="red" strokeWidth={1} opacity={0.5} />
                        )}
                        {points.map((p, i) => {
                            const node = nodes[i]
                            return (
                                <path
                                    key={node.data.id}
                                    fill={getColor(node)}
                                    opacity={.6}
                                    d={voronoi.renderCell(i)}
                                />
                            )
                        })}
                        {enableCircles && nodes.map(node => {
                            return (
                                <circle
                                    key={node.data.id}
                                    cx={node.x}
                                    cy={node.y}
                                    r={node.r}
                                    fill="none"
                                    stroke={getColor(node)}
                                    strokeWidth={1}
                                    strokeOpacity={1}
                                />
                            )
                        })}
                        {renderPoints && (
                            <path
                                key="points"
                                fill="black"
                                d={delaunay.renderPoints(undefined, 1)}
                            />
                        )}
                        {nodes.map(node => {
                            return (
                                <text
                                    key={node.data.id}
                                    x={node.x}
                                    y={node.y}
                                    textAnchor="middle"
                                    alignmentBaseline="central"
                                    style={{
                                        fontSize: 12
                                    }}
                                >
                                    {node.data.id}
                                </text>
                            )
                        })}
                    </g>
                </g>
            </SvgWrapper>
        )
    }
)

VoronoiCirclePacking.displayName = 'VoronoiCirclePacking'

export default withContainer(VoronoiCirclePacking)
