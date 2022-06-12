export interface DotsItemSymbolProps {
    size: number
    color: string
    borderWidth: number
    borderColor: string
}

export interface DotsItemProps extends DotsItemSymbolProps {
    x: number
    y: number
    datum: Record<string, unknown>

    symbol: any

    label: string | number
    labelTextAnchor: 'start' | 'middle' | 'end'
    labelYOffset: number
}
