import { useMemo } from 'react'
import { arc as d3Arc } from 'd3-shape'
import { ArcGenerator, Arc } from './types'

export const useArcGenerator = ({ cornerRadius = 0 }: { cornerRadius: number }): ArcGenerator =>
    useMemo(
        () =>
            d3Arc<Arc>()
                .innerRadius(arc => arc.innerRadius)
                .outerRadius(arc => arc.outerRadius)
                .cornerRadius(cornerRadius),
        [cornerRadius]
    )
