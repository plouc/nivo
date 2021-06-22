import { createElement, Fragment, ReactNode } from 'react'
import { Container, SvgWrapper, useDimensions } from '@nivo/core'
import { VoronoiSvgProps, VoronoiLayerId } from './types'
import { defaultVoronoiProps } from './props'
import { useVoronoi, useVoronoiLayerContext } from './hooks'

type InnerVoronoiProps = Partial<Omit<VoronoiSvgProps, 'data' | 'width' | 'height'>> &
    Pick<VoronoiSvgProps, 'data' | 'width' | 'height'>

const InnerVoronoi = ({
    data,
    width,
    height,
    margin: partialMargin,
    layers = defaultVoronoiProps.layers,
    xDomain = defaultVoronoiProps.xDomain,
    yDomain = defaultVoronoiProps.yDomain,
    enableLinks = defaultVoronoiProps.enableLinks,
    linkLineWidth = defaultVoronoiProps.linkLineWidth,
    linkLineColor = defaultVoronoiProps.linkLineColor,
    enableCells = defaultVoronoiProps.enableCells,
    cellLineWidth = defaultVoronoiProps.cellLineWidth,
    cellLineColor = defaultVoronoiProps.cellLineColor,
    enablePoints = defaultVoronoiProps.enableCells,
    pointSize = defaultVoronoiProps.pointSize,
    pointColor = defaultVoronoiProps.pointColor,
    role = defaultVoronoiProps.role,
}: InnerVoronoiProps) => {
    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { points, delaunay, voronoi } = useVoronoi({
        data,
        width: innerWidth,
        height: innerHeight,
        xDomain,
        yDomain,
    })

    const layerById: Record<VoronoiLayerId, ReactNode> = {
        links: null,
        cells: null,
        points: null,
        bounds: null,
    }

    if (enableLinks && layers.includes('links')) {
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

    if (enableCells && layers.includes('cells')) {
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

    if (enablePoints && layers.includes('points')) {
        layerById.points = (
            <path
                key="points"
                stroke="none"
                fill={pointColor}
                d={delaunay.renderPoints(undefined, pointSize / 2)}
            />
        )
    }

    if (layers.includes('bounds')) {
        layerById.bounds = (
            <path
                key="bounds"
                fill="none"
                stroke={cellLineColor}
                strokeWidth={cellLineWidth}
                d={voronoi.renderBounds()}
            />
        )
    }

    const layerContext = useVoronoiLayerContext({
        points,
        delaunay,
        voronoi,
    })

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} role={role}>
            {layers.map((layer, i) => {
                if (layerById[layer as VoronoiLayerId] !== undefined) {
                    return layerById[layer as VoronoiLayerId]
                }

                if (typeof layer === 'function') {
                    return <Fragment key={i}>{createElement(layer, layerContext)}</Fragment>
                }

                return null
            })}
        </SvgWrapper>
    )
}

export const Voronoi = ({
    theme,
    ...otherProps
}: Partial<Omit<VoronoiSvgProps, 'data' | 'width' | 'height'>> &
    Pick<VoronoiSvgProps, 'data' | 'width' | 'height'>) => (
    <Container isInteractive={false} animate={false} theme={theme}>
        <InnerVoronoi {...otherProps} />
    </Container>
)
