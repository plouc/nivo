import { useCallback } from 'react'
import { PropertyAccessor, usePropertyAccessor, useTheme } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { DatumWithArcAndColor } from '../types'
import { useArcCenters, ArcCenter } from '../centers'

export interface ArcLabel<Datum extends DatumWithArcAndColor> extends ArcCenter<Datum> {
    label: string
    textColor: string
}

/**
 * Compute arc labels, please note that the datum should
 * contain a color in order to be able to compute the label text color.
 *
 * Please see `useArcCenters` for a more detailed explanation
 * about the parameters.
 */
export const useArcLabels = <Datum extends DatumWithArcAndColor>({
    data,
    offset,
    skipAngle,
    label,
    textColor,
}: {
    data: Datum[]
    offset?: number
    skipAngle?: number
    label: PropertyAccessor<Datum, string>
    textColor: InheritedColorConfig<Datum>
}) => {
    const getLabel = usePropertyAccessor<Datum, string>(label)

    const theme = useTheme()
    const getTextColor = useInheritedColor<Datum>(textColor, theme)

    const computeExtraProps = useCallback(
        (datum: Datum) => {
            return {
                label: getLabel(datum),
                textColor: getTextColor(datum),
            }
        },
        [getLabel, getTextColor]
    )

    return useArcCenters<Datum, Omit<ArcLabel<Datum>, keyof ArcCenter<Datum>>>({
        data,
        offset,
        skipAngle,
        computeExtraProps,
    })
}
