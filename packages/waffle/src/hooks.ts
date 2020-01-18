import { useState, useMemo } from 'react'
import {
    InheritedColor,
    OrdinalColorScale,
    useInheritedColor,
    useOrdinalColorScale,
} from '@nivo/colors'
import { computeGrid, mergeCellsData, WaffleCell, WaffleDataCell } from './compute'
import { useTheme } from '@nivo/core'
import { waffleDefaults } from './Waffle'

export interface WaffleDatum {
    id: string | number
    label: string | number
    value: number
}

export interface EnhancedWaffleDatum extends WaffleDatum {
    groupIndex: number
    startAt: number
    endAt: number
    color: string
    fill?: string
}

export type WaffleFillDirection = 'top' | 'right' | 'bottom' | 'left'

export const useWaffle = ({
    width,
    height,
    data,
    total,
    hiddenIds = waffleDefaults.hiddenIds,
    rows,
    columns,
    fillDirection = waffleDefaults.fillDirection,
    padding = waffleDefaults.padding,
    colors = waffleDefaults.colors,
    emptyColor = waffleDefaults.emptyColor,
    borderColor = waffleDefaults.borderColor,
}: {
    width: number
    height: number
    data: WaffleDatum[]
    total: number
    rows: number
    columns: number
    hiddenIds?: Array<string | number>
    fillDirection?: WaffleFillDirection
    padding?: number
    colors?: OrdinalColorScale<WaffleDatum>
    emptyColor?: string
    borderColor?: InheritedColor
}) => {
    const [currentCell, setCurrentCell] = useState<WaffleCell | WaffleDataCell | null>(null)

    const theme = useTheme()
    const getColor = useOrdinalColorScale<WaffleDatum>(colors, 'id')
    const getBorderColor = useInheritedColor(borderColor, theme)

    const unit = total / (rows * columns)
    const grid = useMemo(
        () => computeGrid(width, height, rows, columns, fillDirection, padding, emptyColor),
        [width, height, rows, columns, fillDirection, padding, emptyColor]
    )

    const computedData: EnhancedWaffleDatum[] = useMemo(() => {
        let currentPosition = 0

        return data.map((datum, groupIndex) => {
            if (!hiddenIds.includes(datum.id)) {
                const enhancedDatum = {
                    ...datum,
                    groupIndex,
                    startAt: currentPosition,
                    endAt: currentPosition + Math.round(datum.value / unit),
                    color: getColor(datum),
                }

                currentPosition = enhancedDatum.endAt

                return enhancedDatum
            }

            return {
                ...datum,
                groupIndex,
                startAt: currentPosition,
                endAt: currentPosition,
                color: getColor(datum),
            }
        })
    }, [data, hiddenIds, getColor, unit])

    const legendData = useMemo(
        () =>
            computedData.map(datum => ({
                id: datum.id,
                label: datum.id,
                color: datum.color,
                // fill: datum.fill,
            })),
        [computedData]
    )

    return {
        grid,
        computedData,
        legendData,
        getBorderColor,
        currentCell,
        setCurrentCell,
    }
}

export const useMergedCellData = (cells: WaffleCell[], data: EnhancedWaffleDatum[]) =>
    useMemo(() => mergeCellsData(cells, data), [cells, data])
