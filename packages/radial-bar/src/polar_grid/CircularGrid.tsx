import { SVGProps, useMemo } from 'react'
import { ScaleBand } from 'd3-scale'
import { useTransition } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { ArcLine } from '@nivo/arcs'

interface CircularGridProps {
    scale: ScaleBand<string>
    startAngle: number
    endAngle: number
}

export const CircularGrid = ({
    scale,
    startAngle: originalStartAngle,
    endAngle: originalEndAngle,
}: CircularGridProps) => {
    const theme = useTheme()

    const startAngle = originalStartAngle - 90
    const endAngle = originalEndAngle - 90

    const radii = useMemo(
        () =>
            scale.domain().map((value, index) => ({
                id: index,
                radius: (scale(value) as number) + scale.bandwidth() / 2,
            })),
        [scale]
    )

    const { animate, config: springConfig } = useMotionConfig()
    const transition = useTransition<
        { id: number; radius: number },
        { radius: number; startAngle: number; endAngle: number; opacity: number }
    >(radii, {
        keys: item => item.id,
        initial: item => ({
            radius: item.radius,
            startAngle,
            endAngle,
            opacity: 1,
        }),
        from: item => ({
            radius: item.radius,
            startAngle,
            endAngle,
            opacity: 0,
        }),
        enter: item => ({
            radius: item.radius,
            startAngle,
            endAngle,
            opacity: 1,
        }),
        update: item => ({
            radius: item.radius,
            startAngle,
            endAngle,
            opacity: 1,
        }),
        leave: item => ({
            radius: item.radius,
            startAngle,
            endAngle,
            opacity: 1,
        }),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((style, item) => (
                <ArcLine
                    key={item.id}
                    animated={style}
                    {...(theme.grid.line as Omit<SVGProps<SVGPathElement>, 'ref'>)}
                    strokeOpacity={style.opacity}
                    fill="none"
                />
            ))}
        </>
    )
}
