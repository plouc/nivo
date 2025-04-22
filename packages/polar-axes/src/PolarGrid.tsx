import { AnyScale } from '@nivo/scales'
import { RadialGrid } from './RadialGrid'
import { CircularGrid, CircularGridProps } from './CircularGrid'

export interface PolarGridProps {
    center: [number, number]
    enableRadialGrid: boolean
    angleScale: AnyScale
    startAngle: number
    endAngle: number
    enableCircularGrid: boolean
    radiusScale: AnyScale
    circularGridTicks?: CircularGridProps['ticks']
}

export const PolarGrid = ({
    center,
    enableRadialGrid,
    angleScale,
    startAngle,
    endAngle,
    enableCircularGrid,
    radiusScale,
    circularGridTicks,
}: PolarGridProps) => {
    const innerRadius = Math.min(...radiusScale.range())
    const outerRadius = Math.max(...radiusScale.range())

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {enableRadialGrid && (
                <RadialGrid
                    scale={angleScale}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                />
            )}
            {enableCircularGrid && (
                <CircularGrid
                    scale={radiusScale}
                    ticks={circularGridTicks}
                    startAngle={startAngle}
                    endAngle={endAngle}
                />
            )}
        </g>
    )
}
