import { MouseEvent, TouchEvent, FunctionComponent } from 'react'
import { Box } from '@nivo/core'
import { PartialTheme } from '@nivo/theming'
import { Delaunay, Voronoi } from 'd3-delaunay'

export type NodeMouseHandler<Node> = (node: Node, Node: MouseEvent) => void
export type NodeTouchHandler<Node> = (node: Node, event: TouchEvent) => void

export type NodePositionAccessor<Node> = (node: Node) => [number, number]

export type VoronoiDatum = {
    id: string | number
    x: number
    y: number
}

export type VoronoiDomain = [number, number]

export type VoronoiLayerId = 'links' | 'cells' | 'points' | 'bounds'

export interface VoronoiCustomLayerProps {
    points: {
        x: number
        y: number
        data: VoronoiDatum
    }[]
    delaunay: Delaunay<Delaunay.Point>
    voronoi: Voronoi<Delaunay.Point>
}

export type VoronoiCustomLayer = FunctionComponent<VoronoiCustomLayerProps>

export type VoronoiLayer = VoronoiLayerId | VoronoiCustomLayer

export type VoronoiCommonProps = {
    data: VoronoiDatum[]
    width: number
    height: number
    margin?: Box
    xDomain: VoronoiDomain
    yDomain: VoronoiDomain
    layers: VoronoiLayer[]
    theme?: PartialTheme
    enableLinks: boolean
    linkLineWidth: number
    linkLineColor: string
    enableCells: boolean
    cellLineWidth: number
    cellLineColor: string
    enablePoints: boolean
    pointSize: number
    pointColor: string
    role: string
}

export type VoronoiSvgProps = VoronoiCommonProps
