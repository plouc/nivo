import { FunctionComponent } from 'react'

export interface Point {
    x: number
    y: number
}

export interface DotsItemSymbolProps {
    size: number
    color: string
    borderWidth: number
    borderColor: string
}

export type DotsItemSymbolComponent = FunctionComponent<DotsItemSymbolProps>

export interface DotsItemProps<Datum extends Record<string, unknown>>
    extends Point,
        DotsItemSymbolProps {
    datum: Datum
    symbol?: DotsItemSymbolComponent
    label?: string | number
    labelTextAnchor?: 'start' | 'middle' | 'end'
    labelYOffset: number
}
