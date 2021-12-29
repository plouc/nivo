import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import { useAreaBumpSerieHandlers } from './hooks'
import {
    AreaBumpAreaGenerator,
    AreaBumpCommonProps,
    AreaBumpComputedSerie,
    AreaBumpDatum,
    AreaBumpSerieExtraProps,
} from './types'

interface AreaProps<Datum extends AreaBumpDatum, ExtraProps extends AreaBumpSerieExtraProps> {
    serie: AreaBumpComputedSerie<Datum, ExtraProps>
    areaGenerator: AreaBumpAreaGenerator
    blendMode: AreaBumpCommonProps<Datum, ExtraProps>['blendMode']
    isInteractive: AreaBumpCommonProps<Datum, ExtraProps>['isInteractive']
    onMouseEnter?: AreaBumpCommonProps<Datum, ExtraProps>['onMouseEnter']
    onMouseMove?: AreaBumpCommonProps<Datum, ExtraProps>['onMouseMove']
    onMouseLeave?: AreaBumpCommonProps<Datum, ExtraProps>['onMouseLeave']
    onClick?: AreaBumpCommonProps<Datum, ExtraProps>['onClick']
    setActiveSerieIds: (serieIds: string[]) => void
    tooltip: AreaBumpCommonProps<Datum, ExtraProps>['tooltip']
}

export const Area = <Datum extends AreaBumpDatum, ExtraProps extends AreaBumpSerieExtraProps>({
    serie,
    areaGenerator,
    blendMode,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setActiveSerieIds,
    tooltip,
}: AreaProps<Datum, ExtraProps>) => {
    const handlers = useAreaBumpSerieHandlers<Datum, ExtraProps>({
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

    const animatedPath = useAnimatedPath(areaGenerator(serie.areaPoints) || '')
    const animatedProps = useSpring<{
        color: string
        fillOpacity: number
        stroke: string
        strokeOpacity: number
    }>({
        color: serie.color,
        fillOpacity: serie.fillOpacity,
        stroke: serie.borderColor,
        strokeOpacity: serie.borderOpacity,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            data-testid={`area.${serie.id}`}
            d={animatedPath}
            fill={serie.fill ? serie.fill : animatedProps.color}
            fillOpacity={animatedProps.fillOpacity}
            stroke={animatedProps.stroke}
            strokeWidth={serie.borderWidth}
            strokeOpacity={animatedProps.strokeOpacity}
            style={{ mixBlendMode: blendMode }}
            onMouseEnter={handlers.onMouseEnter}
            onMouseMove={handlers.onMouseMove}
            onMouseLeave={handlers.onMouseLeave}
            onClick={handlers.onClick}
        />
    )
}
