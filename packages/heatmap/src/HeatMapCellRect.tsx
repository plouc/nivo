import { memo, useMemo } from 'react'
import { animated, to } from '@react-spring/web'
import { useTheme } from '@nivo/theming'
import { CellComponentProps, HeatMapDatum } from './types'

const NonMemoizedHeatMapCellRect = <Datum extends HeatMapDatum>({
    cell,
    borderWidth,
    borderRadius,
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
            transform={to(
                [animatedProps.x, animatedProps.y, animatedProps.scale],
                (x, y, scale) => `translate(${x}, ${y}) scale(${scale})`
            )}
        >
            <animated.rect
                transform={to(
                    [animatedProps.width, animatedProps.height],
                    (width, height) => `translate(${width * -0.5}, ${height * -0.5})`
                )}
                key={cell.id}
                fill={animatedProps.color}
                width={animatedProps.width}
                height={animatedProps.height}
                stroke={animatedProps.borderColor}
                strokeWidth={borderWidth}
                rx={borderRadius}
                ry={borderRadius}
            />
            {enableLabels && (
                <animated.text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={animatedProps.labelTextColor}
                    style={{
                        ...theme.labels.text,
                        fill: undefined,
                        userSelect: 'none',
                    }}
                >
                    {cell.label}
                </animated.text>
            )}
        </animated.g>
    )
}

export const HeatMapCellRect = memo(NonMemoizedHeatMapCellRect) as typeof NonMemoizedHeatMapCellRect
