import { useCallback } from 'react'
import { PropertyAccessor, usePropertyAccessor, useTheme } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { DatumWithArcAndColor } from '../types'
import { ArcLinkWithDatum, ArcLinkLabel } from './types'
import { useArcLinks } from './useArcLinks'

/**
 * Compute arc link labels, please note that the datum should
 * contain a color in order to be able to compute the link/label text color.
 *
 * Please see `useArcLinks` for a more detailed explanation
 * about the parameters.
 */
export const useArcLinkLabels = <Datum extends DatumWithArcAndColor>({
    data,
    skipAngle,
    offset,
    diagonalLength,
    straightLength,
    textOffset = 0,
    label,
    linkColor,
    textColor,
}: {
    data: Datum[]
    skipAngle?: number
    offset?: number
    diagonalLength: number
    straightLength: number
    textOffset: number
    label: PropertyAccessor<Datum, string>
    linkColor: InheritedColorConfig<Datum>
    textColor: InheritedColorConfig<Datum>
}) => {
    const getLabel = usePropertyAccessor<Datum, string>(label)

    const theme = useTheme()
    const getLinkColor = useInheritedColor<Datum>(linkColor, theme)
    const getTextColor = useInheritedColor<Datum>(textColor, theme)

    const computeExtraProps = useCallback(
        (link: ArcLinkWithDatum<Datum>) => {
            const position = {
                x: link.points[2].x,
                y: link.points[2].y,
            }
            let textAnchor: ArcLinkLabel<Datum>['textAnchor']
            if (link.side === 'before') {
                position.x -= textOffset
                textAnchor = 'end'
            } else {
                position.x += textOffset
                textAnchor = 'start'
            }

            return {
                ...position,
                label: getLabel(link.data),
                linkColor: getLinkColor(link.data),
                textAnchor,
                textColor: getTextColor(link.data),
            }
        },
        [getLabel, getLinkColor, getTextColor, textOffset]
    )

    return useArcLinks<Datum, Omit<ArcLinkLabel<Datum>, keyof ArcLinkWithDatum<Datum>>>({
        data,
        skipAngle,
        offset,
        diagonalLength,
        straightLength,
        computeExtraProps,
    })
}
