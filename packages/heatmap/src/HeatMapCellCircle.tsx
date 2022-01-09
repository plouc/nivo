import { memo, useMemo } from 'react'
import { animated, to } from '@react-spring/web'
import { useTheme } from '@nivo/core'
import { HeatMapDatum, CellComponentProps } from './types'

const NonMemoizedHeatMapCellCircle = <Datum extends HeatMapDatum>({
    cell,
    borderWidth,
    animatedProps,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    enableLabels,
}: CellComponentProps<Datum>) => {
    const theme = useTheme()

    const handlers = useMemo(
        () => ({
            onMouseEnter: onMouseEnter ? onMouseEnter(cell) : undefined,
            onMouseMove: onMouseMove ? onMouseMove(cell) : undefined,
            onMouseLeave: onMouseLeave ? onMouseLeave(cell) : undefined,
            onClick: onClick ? onClick(cell) : undefined,
        }),
        [cell, onMouseEnter, onMouseMove, onMouseLeave, onClick]
    )

    return (
        <animated.g
            data-testid={`cell.${cell.id}`}
            style={{ cursor: 'pointer' }}
            opacity={animatedProps.opacity}
            {...handlers}
            transform={to([animatedProps.x, animatedProps.y], (x, y) => `translate(${x}, ${y})`)}
        >
            <animated.circle
                r={to(
                    [animatedProps.width, animatedProps.height],
                    (width, height) => Math.min(width, height) / 2
                )}
                fill={animatedProps.color}
                fillOpacity={animatedProps.opacity}
                strokeWidth={borderWidth}
                stroke={animatedProps.borderColor}
            />
            {enableLabels && (
                <animated.text
                    dominantBaseline="central"
                    textAnchor="middle"
                    fill={animatedProps.labelTextColor}
                    style={{
                        ...theme.labels.text,
                        fill: undefined,
                    }}
                >
                    {cell.label}
                </animated.text>
            )}
        </animated.g>
    )
}

export const HeatMapCellCircle = memo(
    NonMemoizedHeatMapCellCircle
) as typeof NonMemoizedHeatMapCellCircle
