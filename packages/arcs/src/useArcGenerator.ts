import { useMemo } from 'react'
import { arc as d3Arc } from 'd3-shape'
import { ArcGenerator, Arc } from './types'

/**
 * Memoize a d3 arc generator.
 *
 * Please note that both inner/outer radius aren't static
 * and should come from the arc itself, while it requires
 * more props on the arcs, it provides more flexibility
 * because it's not limited to pie then but can also work
 * with charts such as sunbursts.
 */
export const useArcGenerator = ({
    cornerRadius = 0,
    padAngle = 0,
}: {
    cornerRadius?: number
    padAngle?: number
}): ArcGenerator =>
    useMemo(
        () =>
            d3Arc<Arc>()
                .innerRadius(arc => arc.innerRadius)
                .outerRadius(arc => arc.outerRadius)
                .cornerRadius(cornerRadius)
                .padAngle(padAngle),
        [cornerRadius, padAngle]
    )
