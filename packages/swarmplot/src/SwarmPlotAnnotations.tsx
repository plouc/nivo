import React from 'react'
import { Annotation } from '@nivo/annotations'
import { ComputedDatum, SwarmPlotSvgProps } from './types'
import { useSwarmPlotAnnotations } from './hooks'

export const SwarmPlotAnnotations = <RawDatum,>({
    nodes,
    annotations,
}: {
    nodes: ComputedDatum<RawDatum>[]
    annotations: SwarmPlotSvgProps<RawDatum>['annotations']
}) => {
    const boundAnnotations = useSwarmPlotAnnotations<RawDatum>(nodes, annotations)

    return (
        <>
            {boundAnnotations.map((annotation, i) => (
                <Annotation key={i} {...annotation} />
            ))}
        </>
    )
}
