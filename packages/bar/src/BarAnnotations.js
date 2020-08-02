/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Annotation, useAnnotations } from '@nivo/annotations'

const BarAnnotations = ({ bars, annotations, animate, motionStiffness, motionDamping }) => {
    const boundAnnotations = useAnnotations({
        items: bars,
        annotations,
        getPosition: bar => ({
            x: bar.x + bar.width / 2,
            y: bar.y + bar.height / 2,
        }),
        getDimensions: (bar, offset) => {
            const width = bar.width + offset * 2
            const height = bar.height + offset * 2

            return {
                width,
                height,
                size: Math.max(width, height),
            }
        },
    })

    return boundAnnotations.map((annotation, i) => (
        <Annotation
            key={i}
            {...annotation}
            containerWidth={innerWidth}
            containerHeight={innerHeight}
            animate={animate}
            motionStiffness={motionStiffness}
            motionDamping={motionDamping}
        />
    ))
}

BarAnnotations.propTypes = {}

export default BarAnnotations
