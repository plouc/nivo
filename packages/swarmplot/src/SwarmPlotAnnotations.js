import React from 'react'
import { Annotation } from '@nivo/annotations'
import { useSwarmPlotAnnotations } from './hooks'

const SwarmPlotAnnotations = ({ nodes, annotations, innerWidth, innerHeight }) => {
    const boundAnnotations = useSwarmPlotAnnotations(nodes, annotations)

    return boundAnnotations.map((annotation, i) => (
        <Annotation
            key={i}
            {...annotation}
            containerWidth={innerWidth}
            containerHeight={innerHeight}
        />
    ))
}

SwarmPlotAnnotations.propTypes = {}

export default SwarmPlotAnnotations
