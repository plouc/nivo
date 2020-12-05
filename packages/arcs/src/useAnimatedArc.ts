import { useSpring } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { Arc, ArcGenerator } from './types'
import { interpolateArc } from './arcInterpolator'

export const useAnimatedArc = (datumWithArc: { arc: Arc }, arcGenerator: ArcGenerator) => {
    const { animate, config: springConfig } = useMotionConfig()

    const animatedValues = useSpring({
        startAngle: datumWithArc.arc.startAngle,
        endAngle: datumWithArc.arc.endAngle,
        innerRadius: datumWithArc.arc.innerRadius,
        outerRadius: datumWithArc.arc.outerRadius,
        config: springConfig,
        immediate: !animate,
    })

    return {
        ...animatedValues,
        path: interpolateArc(
            animatedValues.startAngle,
            animatedValues.endAngle,
            animatedValues.innerRadius,
            animatedValues.outerRadius,
            arcGenerator
        ),
    }
}
