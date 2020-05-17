import React from 'react'
import { Annotation } from '@nivo/annotations'
import { useScatterPlotAnnotations } from './hooks'

const ScatterPlotAnnotations = ({ nodes, annotations, innerWidth, innerHeight }) => {
    const boundAnnotations = useScatterPlotAnnotations(nodes, annotations)

    return boundAnnotations.map((annotation, i) => (
        <Annotation
            key={i}
            {...annotation}
            containerWidth={innerWidth}
            containerHeight={innerHeight}
        />
    ))
}

ScatterPlotAnnotations.propTypes = {}

export default ScatterPlotAnnotations
