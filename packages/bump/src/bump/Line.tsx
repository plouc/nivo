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
    onMouseEnter?: BumpCommonProps<Datum, ExtraProps>['onSerieMouseEnter']
    onMouseMove?: BumpCommonProps<Datum, ExtraProps>['onSerieMouseMove']
    onMouseLeave?: BumpCommonProps<Datum, ExtraProps>['onSerieMouseLeave']
    onClick?: BumpCommonProps<Datum, ExtraProps>['onSerieClick']
    setActiveSerieIds: (serieIds: string[]) => void
    lineTooltip: BumpCommonProps<Datum, ExtraProps>['lineTooltip']
    useMesh: BumpCommonProps<Datum, ExtraProps>['useMesh']
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
    lineTooltip,
    useMesh,
}: LineProps<Datum, ExtraProps>) => {
    const handlers = useBumpSerieHandlers<Datum, ExtraProps>({
        serie,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        setActiveSerieIds,
        lineTooltip,
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
            {isInteractive && !useMesh && (
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
