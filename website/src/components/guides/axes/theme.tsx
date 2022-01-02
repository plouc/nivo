import { useMemo } from 'react'
import { Theme } from '@nivo/core'
import { useTheme } from 'styled-components'

export const useAxisTheme = (): Theme => {
    const theme = useTheme()
    const nivoTheme: Theme = useMemo(() => {
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
