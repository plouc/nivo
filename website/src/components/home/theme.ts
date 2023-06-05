import { useMemo } from 'react'
import { useTheme } from 'styled-components'

export const useHomeTheme = () => {
    const theme = useTheme()

    const { colors, reversedColors } = useMemo(() => {
        const _colors: string[] = theme.colors.coloredRange.slice(1)
        const _reversedColors = [..._colors].reverse()

        return { colors: _colors, reversedColors: _reversedColors }
    }, [theme])

    const nivoTheme = useMemo(() => {
        return {
            axis: {
                ticks: {
                    line: {
                        stroke: theme.colors.coloredRange[4],
                    },
                    text: {
                        fill: theme.colors.coloredRange[4],
                        fontSize: 9,
                    },
                },
            },
            grid: {
                line: {
                    stroke: theme.colors.coloredRange[4],
                    strokeWidth: 2,
                    strokeDasharray: '5,8',
                },
            },
            labels: {
                text: {
                    fill: theme.colors.coloredRange[4],
                },
            },
        }
    }, [theme])

    return {
        colors,
        reversedColors,
        nivoTheme,
    }
}
