/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { voronoi as VoronoiGenerator } from 'd3-voronoi'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import enhance from './enhance'
import { VoronoiPropTypes } from './props'

const Voronoi = ({
    data,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    // features
    enableSites,
    enableLinks,
    enablePolygons,

    // styling
    theme,
    borderWidth,
    borderColor,
    linkWidth,
    linkColor,
    siteSize,
    siteColor,
}) => {
    const voronoi = VoronoiGenerator()
        .x(d => d.x)
        .y(d => d.y)
        .extent([[0, 0], [width, height]])

    const polygons = voronoi.polygons(data)
    const links = voronoi.links(data)

    return (
        <Container isInteractive={false} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                    {enableLinks &&
                        links.map(l => (
                            <line
                                key={`${l.source.id}.${l.target.id}`}
                                fill="none"
                                stroke={linkColor}
                                strokeWidth={linkWidth}
                                x1={l.source.x}
                                y1={l.source.y}
                                x2={l.target.x}
                                y2={l.target.y}
                            />
                        ))}
                    {enablePolygons &&
                        polygons.map(p => (
                            <path
                                key={p.data.id}
                                fill="none"
                                stroke={borderColor}
                                strokeWidth={borderWidth}
                                d={`M${p.join('L')}Z`}
                                onClick={() => {
                                    console.log(p.data)
                                }}
                            />
                        ))}
                    {enableSites &&
                        data.map(d => (
                            <circle
                                key={d.id}
                                r={siteSize / 2}
                                cx={d.x}
                                cy={d.y}
                                fill={siteColor}
                                stroke="none"
                            />
                        ))}
                </SvgWrapper>
            )}
        </Container>
    )
}

Voronoi.propTypes = VoronoiPropTypes

export default enhance(Voronoi)
