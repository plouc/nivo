import { SVGProps, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { AnyScale, getScaleTicks } from '@nivo/scales'
import { ArcLine } from '@nivo/arcs'

interface CircularGridProps {
    scale: AnyScale
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

    const radii = useMemo(() => {
        const values = getScaleTicks(scale)

        return values.map((value, index) => {
            let radius = scale(value) as number
            if ('bandwidth' in scale) {
                radius += scale.bandwidth() / 2
            }

            return {
                id: index,
                radius,
            }
        })
    }, [scale])

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
            opacity: 0,
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
