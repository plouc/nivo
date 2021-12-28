import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { useAreaBumpSerieHandlers } from './hooks'
import {
    AreaBumpAreaGenerator,
    AreaBumpCommonProps,
    AreaBumpComputedSerie,
    AreaBumpDatum,
} from './types'

interface AreaProps<D extends AreaBumpDatum> {
    serie: AreaBumpComputedSerie<D>
    areaGenerator: AreaBumpAreaGenerator
    blendMode: AreaBumpCommonProps<D>['blendMode']
    isInteractive: AreaBumpCommonProps<D>['isInteractive']
    onMouseEnter?: AreaBumpCommonProps<D>['onMouseEnter']
    onMouseMove?: AreaBumpCommonProps<D>['onMouseMove']
    onMouseLeave?: AreaBumpCommonProps<D>['onMouseLeave']
    onClick?: AreaBumpCommonProps<D>['onClick']
    setCurrentSerie: any
    tooltip: AreaBumpCommonProps<D>['tooltip']
}

export const Area = <D extends AreaBumpDatum>({
    serie,
    areaGenerator,
    blendMode,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setCurrentSerie,
    tooltip,
}: AreaProps<D>) => {
    const handlers = useAreaBumpSerieHandlers<D>({
        serie,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        setCurrent: setCurrentSerie,
        tooltip,
    })

    const { animate, config: springConfig } = useMotionConfig()

    const animatedPath = useAnimatedPath(areaGenerator(serie.areaPoints)!)
    const animatedProps = useSpring<{
        color: string
        fillOpacity: number
        stroke: string
        strokeOpacity: number
    }>({
        color: serie.color,
        fillOpacity: serie.style.fillOpacity,
        stroke: serie.style.borderColor,
        strokeOpacity: serie.style.borderOpacity,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            d={animatedPath}
            fill={serie.fill ? serie.fill : animatedProps.color}
            fillOpacity={animatedProps.fillOpacity}
            stroke={animatedProps.stroke}
            strokeWidth={serie.style.borderWidth}
            strokeOpacity={animatedProps.strokeOpacity}
            style={{ mixBlendMode: blendMode }}
            onMouseEnter={handlers.onMouseEnter}
            onMouseMove={handlers.onMouseMove}
            onMouseLeave={handlers.onMouseLeave}
            onClick={handlers.onClick}
        />
    )
}
