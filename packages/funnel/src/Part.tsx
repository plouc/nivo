import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'
import {
    FunnelDatum,
    FunnelPartWithHandlers,
    FunnelAreaGenerator,
    FunnelBorderGenerator,
} from './types'

export interface PartProps<D extends FunnelDatum> {
    part: FunnelPartWithHandlers<D>
    areaGenerator: FunnelAreaGenerator
    borderGenerator: FunnelBorderGenerator
}

export const Part = <D extends FunnelDatum>({
    part,
    areaGenerator,
    borderGenerator,
}: PartProps<D>) => {
    const { animate, config: motionConfig } = useMotionConfig()

    const animatedAreaPath = useAnimatedPath(areaGenerator(part.areaPoints) as string)
    const animatedBorderPath = useAnimatedPath(borderGenerator(part.borderPoints) as string)
    const animatedProps = useSpring({
        areaColor: part.color,
        borderWidth: part.borderWidth,
        borderColor: part.borderColor,
        config: motionConfig,
        immediate: !animate,
    })

    return (
        <>
            {part.borderWidth > 0 && (
                <animated.path
                    d={animatedBorderPath}
                    stroke={animatedProps.borderColor}
                    strokeWidth={animatedProps.borderWidth}
                    strokeOpacity={part.borderOpacity}
                    fill="none"
                />
            )}
            <animated.path
                d={animatedAreaPath}
                fill={animatedProps.areaColor}
                fillOpacity={part.fillOpacity}
                onMouseEnter={part.onMouseEnter}
                onMouseLeave={part.onMouseLeave}
                onMouseMove={part.onMouseMove}
                onClick={part.onClick}
            />
        </>
    )
}
