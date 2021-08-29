import { useMemo } from 'react'
import { useTheme } from '../../../theming/context'

export const useAxisTheme = () => {
    const theme = useTheme()
    const nivoTheme = useMemo(() => {
        return {
            ...theme.nivo,
            axis: {
                ...theme.nivo.axis,
                domain: {
                    ...theme.nivo.axis.domain,
                    line: {
                        ...theme.nivo.axis.domain.line,
                        strokeWidth: 1,
                    },
                },
                legend: {
                    ...theme.nivo.axis.legend,
                    text: {
                        ...theme.nivo.axis.legend.text,
                        fill: theme.colors.accent,
                    },
                },
            },
        }
    }, [theme])

    return nivoTheme
}
