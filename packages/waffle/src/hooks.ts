import { useState, useMemo } from 'react'
import { useTheme } from '@nivo/core'
import {
    InheritedColor,
    OrdinalColorScale,
    useInheritedColor,
    useOrdinalColorScale,
} from '@nivo/colors'
import {
    waffleDefaults,
    WaffleFillDirection,
    WaffleDatum,
    EnhancedWaffleDatum,
    WaffleCell,
    WaffleBaseDatum,
    WaffleEmptyCell,
} from './props'
import { computeGrid, mergeCellsData } from './compute'

export const useWaffle = <Datum extends WaffleBaseDatum = WaffleBaseDatum>({
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
    data: Array<WaffleDatum<Datum>>
    total: number
    rows: number
    columns: number
    hiddenIds?: Array<string | number>
    fillDirection?: WaffleFillDirection
    padding?: number
    colors?: OrdinalColorScale<WaffleDatum<Datum>>
    emptyColor?: string
    borderColor?: InheritedColor
}) => {
    const [currentCell, setCurrentCell] = useState<WaffleCell<Datum> | null>(null)

    const theme = useTheme()
    const getColor = useOrdinalColorScale<Datum>(colors, 'id')
    const getBorderColor = useInheritedColor(borderColor, theme)

    const unit = total / (rows * columns)
    const grid = useMemo(
        () => computeGrid(width, height, rows, columns, fillDirection, padding, emptyColor),
        [width, height, rows, columns, fillDirection, padding, emptyColor]
    )

    const computedData: Array<EnhancedWaffleDatum<Datum>> = useMemo(() => {
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

export const useMergedCellData = <Datum extends WaffleBaseDatum = WaffleBaseDatum>(
    cells: WaffleEmptyCell[],
    data: Array<EnhancedWaffleDatum<Datum>>
) => useMemo(() => mergeCellsData(cells, data), [cells, data])
