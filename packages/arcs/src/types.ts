import { Arc as D3Arc } from 'd3-shape'

export interface Point {
    x: number
    y: number
}

export interface Arc {
    // start angle in radians
    startAngle: number
    // end angle in radians
    endAngle: number
    // inner radius in pixels
    innerRadius: number
    // outer radius in pixels
    outerRadius: number
}

export interface DatumWithArc {
    id: string | number
    arc: Arc
}

export interface DatumWithArcAndColor extends DatumWithArc {
    color: string
    // when using patterns/gradients
    fill?: string
}

export type ArcGenerator = D3Arc<any, Arc>
