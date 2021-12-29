import { useSpring, animated } from '@react-spring/web'
import { Line as D3Line } from 'd3-shape'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { BumpCommonProps, BumpComputedSerie, BumpDatum, BumpSerieExtraProps } from './types'
import { useBumpSerieHandlers } from './hooks'

interface LineProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    serie: BumpComputedSerie<Datum, ExtraProps>
    lineGenerator: D3Line<[number, number | null]>
    yStep: number
    isInteractive: BumpCommonProps<Datum, ExtraProps>['isInteractive']
    onMouseEnter?: BumpCommonProps<Datum, ExtraProps>['onMouseEnter']
    onMouseMove?: BumpCommonProps<Datum, ExtraProps>['onMouseMove']
    onMouseLeave?: BumpCommonProps<Datum, ExtraProps>['onMouseLeave']
    onClick?: BumpCommonProps<Datum, ExtraProps>['onClick']
    setActiveSerieIds: (serieIds: string[]) => void
    tooltip: BumpCommonProps<Datum, ExtraProps>['tooltip']
}

export const Line = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
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
}: LineProps<Datum, ExtraProps>) => {
    const handlers = useBumpSerieHandlers<Datum, ExtraProps>({
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

    const linePath = lineGenerator(serie.linePoints) || ''

    const animatedPath = useAnimatedPath(linePath)
    const animatedProps = useSpring<{
        color: string
        opacity: number
        lineWidth: number
    }>({
        color: serie.color,
        opacity: serie.opacity,
        lineWidth: serie.lineWidth,
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
