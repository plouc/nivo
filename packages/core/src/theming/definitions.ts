export interface Theme {
    background: string
    axis: Partial<{
        domain: Partial<{
            line: Partial<CSSProperties>
        }>
        ticks: Partial<{
            line: Partial<CSSProperties>
            text: Partial<CSSProperties>
        }>
        legend: Partial<{
            text: Partial<CSSProperties>
        }>
    }>
    grid: Partial<{
        line: Partial<CSSProperties>
    }>
    legends: Partial<{
        text: Partial<CSSProperties>
    }>
    labels: Partial<{
        text: Partial<CSSProperties>
    }>
    markers: Partial<{
        lineColor: string
        lineStrokeWidth: number
        textColor: string
        fontSize: string | 0
    }>
    dots: Partial<{
        text: Partial<CSSProperties>
    }>
    tooltip: Partial<{
        container: Partial<CSSProperties>
        basic: Partial<CSSProperties>
        table: Partial<CSSProperties>
        tableCell: Partial<CSSProperties>
    }>
}
