export interface DotsItemSymbolProps {
    size: number
    color: string
    borderWidth: number
    borderColor: string
}

export interface DotsItemProps extends DotsItemSymbolProps {
    x: number
    y: number
    //datum: PropTypes.object.isRequired,
    datum: any

    //symbol: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    symbol: any

    label: string | number
    labelTextAnchor: 'start' | 'middle' | 'end'
    labelYOffset: number
}
