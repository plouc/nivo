import { useMemo } from 'react'
import { PartialTheme } from '@nivo/theming'
import { useTheme } from 'styled-components'

export const useAxisTheme = (): PartialTheme => {
    const theme = useTheme()
    const nivoTheme: PartialTheme = useMemo(() => {
        return {
            ...theme.nivo,
            axis: {
                ...theme.nivo.axis,
                domain: {
                    ...theme.nivo.axis!.domain,
                    line: {
                        ...theme.nivo.axis!.domain!.line,
                        strokeWidth: 1,
                    },
                },
                legend: {
                    ...theme.nivo.axis!.legend,
                    text: {
                        ...theme.nivo.axis!.legend!.text,
                        fill: theme.colors.accent,
                    },
                },
            },
        }
    }, [theme])

    return nivoTheme
}
