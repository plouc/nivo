import { useSpring, animated } from '@react-spring/web'
import { Line as D3Line } from 'd3-shape'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { BumpCommonProps, BumpComputedSerie, BumpDatum } from './types'
import { useBumpSerieHandlers } from './hooks'

interface LineProps<D extends BumpDatum> {
    serie: BumpComputedSerie<D>
    lineGenerator: D3Line<[number, number | null]>
    yStep: number
    isInteractive: BumpCommonProps<D>['isInteractive']
    onMouseEnter?: BumpCommonProps<D>['onMouseEnter']
    onMouseMove?: BumpCommonProps<D>['onMouseMove']
    onMouseLeave?: BumpCommonProps<D>['onMouseLeave']
    onClick?: BumpCommonProps<D>['onClick']
    setActiveSerieIds: (serieIds: string[]) => void
    tooltip: BumpCommonProps<D>['tooltip']
}

export const Line = <D extends BumpDatum>({
    serie,
    lineGenerator,
    yStep,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setActiveSerieIds,
    tooltip,
}: LineProps<D>) => {
    const handlers = useBumpSerieHandlers<D>({
        serie,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        setActiveSerieIds,
        tooltip,
    })

    const { animate, config: springConfig } = useMotionConfig()

    const linePath = lineGenerator(serie.linePoints)!

    const animatedPath = useAnimatedPath(linePath)
    const animatedProps = useSpring<{
        color: string
        opacity: number
        lineWidth: number
    }>({
        color: serie.color,
        opacity: serie.style.opacity,
        lineWidth: serie.style.lineWidth,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            <animated.path
                data-testid={`line.${serie.id}`}
                fill="none"
                d={animatedPath}
                stroke={animatedProps.color}
                strokeWidth={animatedProps.lineWidth}
                strokeLinecap="round"
                strokeOpacity={animatedProps.opacity}
                style={{ pointerEvents: 'none' }}
            />
            {isInteractive && (
                <path
                    data-testid={`line.${serie.id}.interactive`}
                    fill="none"
                    stroke="red"
                    strokeOpacity={0}
                    strokeWidth={yStep}
                    d={linePath}
                    strokeLinecap="butt"
                    onMouseEnter={handlers.onMouseEnter}
                    onMouseMove={handlers.onMouseMove}
                    onMouseLeave={handlers.onMouseLeave}
                    onClick={handlers.onClick}
                />
            )}
        </>
    )
}
