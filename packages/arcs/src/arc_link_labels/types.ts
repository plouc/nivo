import { DatumWithArc, DatumWithArcAndColor, Point } from '../types'

export interface ArcLink {
    side: 'before' | 'after'
    points: [Point, Point, Point]
}

export interface ArcLinkWithDatum<Datum extends DatumWithArc> extends ArcLink {
    data: Datum
}

export interface ArcLinkLabel<Datum extends DatumWithArcAndColor> extends ArcLinkWithDatum<Datum> {
    x: number
    y: number
    label: string
    linkColor: string
    textAnchor: 'start' | 'end'
    textColor: string
}
