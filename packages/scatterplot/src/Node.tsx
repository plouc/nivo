import { ScatterPlotNodeProps, ScatterPlotDatum } from './types'

export const Node = <RawDatum extends ScatterPlotDatum>({
    x,
    y,
    size,
    color,
    blendMode,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: ScatterPlotNodeProps<RawDatum>) => (
    <circle
        cx={x}
        cy={y}
        r={size / 2}
        fill={color}
        style={{ mixBlendMode: blendMode }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
    />
)
