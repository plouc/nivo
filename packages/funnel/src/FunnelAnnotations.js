import React from 'react'
import { Annotation } from '@nivo/annotations'
import { useFunnelAnnotations } from './hooks'

export const FunnelAnnotations = ({ parts, annotations, width, height }) => {
    const boundAnnotations = useFunnelAnnotations(parts, annotations)

    return boundAnnotations.map((annotation, i) => (
        <Annotation key={i} {...annotation} containerWidth={width} containerHeight={height} />
    ))
}

FunnelAnnotations.propTypes = {}
