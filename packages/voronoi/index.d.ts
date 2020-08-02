import * as React from 'react'
import { Dimensions, Box, Theme } from '@nivo/core'

declare module '@nivo/voronoi' {
    export interface VoronoiDatum {
        id: string | number
        x: number
        y: number
    }

    export type VoronoiDomain = [number, number]

    export type VoronoiCustomLayer = (...args: any[]) => React.ReactNode

    export interface VoronoiProps {
        data: VoronoiDatum[]

        xDomain?: VoronoiDomain
        yDomain?: VoronoiDomain

        layers?: ('links' | 'cells' | 'points' | 'bounds' | VoronoiCustomLayer)[]

        theme?: Theme

        margin?: Box

        enableLinks?: boolean
        linkLineWidth?: number
        linkLineColor?: string

        enableCells?: boolean
        cellLineWidth?: number
        cellLineColor?: string

        enablePoints?: boolean
        pointSize?: number
        pointColor?: string
    }

    export class Voronoi extends React.Component<VoronoiProps & Dimensions> {}
    export class ResponsiveVoroinoi extends React.Component<VoronoiProps> {}
}
