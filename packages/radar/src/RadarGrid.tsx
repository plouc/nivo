import { SVGProps, useMemo } from 'react'
import { positionFromAngle, useTheme } from '@nivo/core'
import { RadarGridLabels } from './RadarGridLabels'
import { RadarGridLevels } from './RadarGridLevels'
import { GridLabelComponent, RadarCommonProps } from './types'

interface RadarGridProps<D extends Record<string, unknown>> {
    indices: string[]
    shape: RadarCommonProps<D>['gridShape']
    radius: number
    levels: number
    angleStep: number
    label: GridLabelComponent
    labelOffset: number
}

export const RadarGrid = <D extends Record<string, unknown>>({
    indices,
    levels,
    shape,
    radius,
    angleStep,
    label,
    labelOffset,
}: RadarGridProps<D>) => {
    const theme = useTheme()
    const { radii, angles } = useMemo(() => {
        return {
            radii: Array.from({ length: levels })
                .map((_, i) => (radius / levels) * (i + 1))
                .reverse(),
            angles: Array.from({ length: indices.length }, (_, i) => i * angleStep - Math.PI / 2),
        }
    }, [indices, levels, radius, angleStep])

    return (
        <>
            {angles.map((angle, i) => {
                const position = positionFromAngle(angle, radius)
                return (
                    <line
                        key={`axis.${i}`}
                        x1={0}
                        y1={0}
                        x2={position.x}
                        y2={position.y}
                        {...(theme.grid.line as SVGProps<SVGLineElement>)}
                    />
                )
            })}
            {radii.map((radius, i) => (
                <RadarGridLevels<D>
                    key={`level.${i}`}
                    shape={shape}
                    radius={radius}
                    angleStep={angleStep}
                    dataLength={indices.length}
                />
            ))}
            <RadarGridLabels
                radius={radius}
                angles={angles}
                indices={indices}
                labelOffset={labelOffset}
                label={label}
            />
        </>
    )
}
