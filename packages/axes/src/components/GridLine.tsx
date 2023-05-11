import { memo, SVGAttributes } from 'react'
import { SpringValues, animated } from '@react-spring/web'
import { useTheme } from '@nivo/theming'

export const GridLine = memo(
    ({
        animatedProps,
    }: {
        animatedProps: SpringValues<{
            opacity: number
            x1: number
            x2: number
            y1: number
            y2: number
        }>
    }) => {
        const theme = useTheme()

        return (
            <animated.line
                {...animatedProps}
                {...(theme.grid.line as SVGAttributes<SVGLineElement>)}
            />
        )
    }
)
