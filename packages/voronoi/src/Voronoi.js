/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Container, SvgWrapper } from '@nivo/core'
import enhance from './enhance'
import { VoronoiPropTypes } from './props'

const Voronoi = ({
    delaunay,
    voronoi,

    data,
    layers,

    margin,
    width,
    height,
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
    const context = {
        width,
        height,
        data,
        delaunay,
        voronoi,
    }

    const layerById = {
        bounds: (
            <path
                key="bounds"
                fill="none"
                stroke={cellLineColor}
                strokeWidth={cellLineWidth}
                d={voronoi.renderBounds()}
            />
        ),
    }
    if (enableLinks === true) {
        layerById.links = (
            <path
                key="links"
                stroke={linkLineColor}
                strokeWidth={linkLineWidth}
                fill="none"
                d={delaunay.render()}
            />
        )
    }
    if (enableCells === true) {
        layerById.cells = (
            <path
                key="cells"
                d={voronoi.render()}
                fill="none"
                stroke={cellLineColor}
                strokeWidth={cellLineWidth}
            />
        )
    }
    if (enablePoints === true) {
        layerById.points = (
            <path
                key="points"
                stroke="none"
                fill={pointColor}
                d={delaunay.renderPoints(undefined, pointSize / 2)}
            />
        )
    }

    return (
        <Container isInteractive={false} theme={theme} animate={false}>
            {
                (/*{ showTooltip, hideTooltip }*/) => (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        theme={theme}
                    >
                        {layers.map((layer, i) => {
                            if (typeof layer === 'function') {
                                return <Fragment key={i}>{layer(context)}</Fragment>
                            }
                            return layerById[layer]
                        })}
                    </SvgWrapper>
                )
            }
        </Container>
    )
}

Voronoi.propTypes = VoronoiPropTypes

export default enhance(Voronoi)
