import { createElement, MouseEvent, useCallback } from 'react'
import { useTransition, animated, to } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { ComputedCell, HeatMapDatum, HeatMapSvgProps } from './types'

interface HeatMapCellsProps<Datum extends HeatMapDatum, ExtraProps extends object> {
    cells: ComputedCell<Datum>[]
    borderRadius: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['borderRadius']>
    borderWidth: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['borderWidth']>
    onMouseEnter: HeatMapSvgProps<Datum, ExtraProps>['onMouseEnter']
    onMouseMove: HeatMapSvgProps<Datum, ExtraProps>['onMouseMove']
    onMouseLeave: HeatMapSvgProps<Datum, ExtraProps>['onMouseLeave']
    onClick: HeatMapSvgProps<Datum, ExtraProps>['onClick']
    tooltip: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['tooltip']>
    isInteractive: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['isInteractive']>
    enableLabels: NonNullable<HeatMapSvgProps<Datum, ExtraProps>['enableLabels']>
}

/*
let cellComponent
if (cellShape === 'rect') {
    cellComponent = HeatMapCellRect
} else if (cellShape === 'circle') {
    cellComponent = HeatMapCellCircle
} else {
    cellComponent = cellShape
}
*/

export const HeatMapCells = <Datum extends HeatMapDatum, ExtraProps extends object>({
    cells,
    borderRadius,
    borderWidth,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    isInteractive,
    enableLabels,
}: HeatMapCellsProps<Datum, ExtraProps>) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        ComputedCell<Datum>,
        {
            x: number
            y: number
            width: number
            height: number
            color: string
            opacity: number
            borderColor: string
            labelTextColor: string
        }
    >(cells, {
        keys: cell => cell.id,
        initial: cell => ({
            x: cell.x,
            y: cell.y,
            width: cell.width,
            height: cell.height,
            color: cell.color,
            borderColor: cell.borderColor,
            labelTextColor: cell.labelTextColor,
        }),
        update: cell => ({
            x: cell.x,
            y: cell.y,
            width: cell.width,
            height: cell.height,
            color: cell.color,
            borderColor: cell.borderColor,
            labelTextColor: cell.labelTextColor,
        }),
        config: springConfig,
        immediate: !animate,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (cell: ComputedCell<Datum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { cell }), event)
            onMouseEnter?.(cell, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (cell: ComputedCell<Datum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { cell }), event)
            onMouseMove?.(cell, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (cell: ComputedCell<Datum>, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(cell, event)
        },
        [hideTooltip, onMouseLeave]
    )

    return (
        <g>
            {transition((animatedProps, cell) => {
                return (
                    <animated.g
                        transform={to(
                            [
                                animatedProps.x,
                                animatedProps.y,
                                animatedProps.width,
                                animatedProps.height,
                            ],
                            (x, y, width, height) => {
                                return `translate(${x - width / 2}, ${y - height / 2})`
                            }
                        )}
                    >
                        <animated.rect
                            key={cell.id}
                            fill={animatedProps.color}
                            fillOpacity={cell.opacity}
                            width={animatedProps.width}
                            height={animatedProps.height}
                            stroke={animatedProps.borderColor}
                            strokeWidth={borderWidth}
                            rx={borderRadius}
                            ry={borderRadius}
                            onMouseEnter={
                                isInteractive ? event => handleMouseEnter(cell, event) : undefined
                            }
                            onMouseMove={
                                isInteractive ? event => handleMouseMove(cell, event) : undefined
                            }
                            onMouseLeave={
                                isInteractive ? event => handleMouseLeave(cell, event) : undefined
                            }
                            onClick={isInteractive ? event => onClick?.(cell, event) : undefined}
                        />
                        {enableLabels && (
                            <animated.text
                                x={cell.width / 2}
                                y={cell.height / 2}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill={animatedProps.labelTextColor}
                                style={{
                                    ...theme.labels.text,
                                    fill: undefined,
                                    pointerEvents: 'none',
                                }}
                            >
                                {cell.label}
                            </animated.text>
                        )}
                    </animated.g>
                )
            })}
        </g>
    )
}
