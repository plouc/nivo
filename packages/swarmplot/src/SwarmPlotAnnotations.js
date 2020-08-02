/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
