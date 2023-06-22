import { AnyScale } from '@bitbloom/nivo-scales'
import { RadialGrid } from './RadialGrid'
import { CircularGrid } from './CircularGrid'
import { arrayExtent } from '@bitbloom/nivo-core'

interface PolarGridProps {
    center: [number, number]
    enableRadialGrid: boolean
    enableCircularGrid: boolean
    angleScale: AnyScale
    radiusScale: AnyScale
    startAngle: number
    endAngle: number
}

export const PolarGrid = ({
    center,
    enableRadialGrid,
    enableCircularGrid,
    angleScale,
    radiusScale,
    startAngle,
    endAngle,
}: PolarGridProps) => {
    const [innerRadius, outerRadius] = arrayExtent(radiusScale.range())

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
                <CircularGrid scale={radiusScale} startAngle={startAngle} endAngle={endAngle} />
            )}
        </g>
    )
}
