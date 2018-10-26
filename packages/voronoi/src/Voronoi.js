/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Container, SvgWrapper } from '@nivo/core'
import enhance from './enhance'
import { VoronoiPropTypes } from './props'

const Voronoi = ({
    delaunay,
    voronoi,

    margin,
    outerWidth,
    outerHeight,

    enableLinks,
    linkLineWidth,
    linkLineColor,

    enableCells,
    cellLineWidth,
    cellLineColor,

    enablePoints,
    pointSize,
    pointColor,

    theme,
}) => {
    return (
        <Container isInteractive={false} theme={theme}>
            {(/*{ showTooltip, hideTooltip }*/) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
                    {enableLinks && (
                        <path
                            stroke={linkLineColor}
                            strokeWidth={linkLineWidth}
                            fill="none"
                            d={delaunay.render()}
                        />
                    )}
                    {enableCells && (
                        <path
                            d={voronoi.render()}
                            fill="none"
                            stroke={cellLineColor}
                            strokeWidth={cellLineWidth}
                        />
                    )}
                    {enablePoints && (
                        <path
                            stroke="none"
                            fill={pointColor}
                            d={delaunay.renderPoints(undefined, pointSize / 2)}
                        />
                    )}
                    <path
                        fill="none"
                        stroke={cellLineColor}
                        strokeWidth={cellLineWidth}
                        d={voronoi.renderBounds()}
                    />
                </SvgWrapper>
            )}
        </Container>
    )
}

Voronoi.propTypes = VoronoiPropTypes

export default enhance(Voronoi)
