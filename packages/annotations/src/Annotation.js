/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import { motionPropTypes } from '@nivo/core'
import { defaultProps } from './props'
import { useComputedAnnotation } from './hooks'
import AnnotationNote from './AnnotationNote'
import AnnotationLink from './AnnotationLink'
import CircleAnnotationOutline from './CircleAnnotationOutline'
import DotAnnotationOutline from './DotAnnotationOutline'
import RectAnnotationOutline from './RectAnnotationOutline'

const Annotation = memo(
    ({
        datum,
        type,
        containerWidth,
        containerHeight,
        x,
        y,
        size,
        width,
        height,
        noteX,
        noteY,
        noteWidth,
        noteTextOffset,
        note,
        animate,
        motionStiffness,
        motionDamping,
    }) => {
        const computed = useComputedAnnotation({
            type,
            containerWidth,
            containerHeight,
            x,
            y,
            size,
            width,
            height,
            noteX,
            noteY,
            noteWidth,
            noteTextOffset,
        })

        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return (
            <>
                <AnnotationLink
                    points={computed.points}
                    isOutline={true}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
                {type === 'circle' && (
                    <CircleAnnotationOutline
                        x={x}
                        y={y}
                        size={size}
                        animate={animate}
                        motionStiffness={motionStiffness}
                        motionDamping={motionDamping}
                    />
                )}
                {type === 'dot' && (
                    <DotAnnotationOutline
                        x={x}
                        y={y}
                        size={size}
                        animate={animate}
                        motionStiffness={motionStiffness}
                        motionDamping={motionDamping}
                    />
                )}
                {type === 'rect' && (
                    <RectAnnotationOutline
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        animate={animate}
                        motionStiffness={motionStiffness}
                        motionDamping={motionDamping}
                    />
                )}
                <AnnotationLink
                    points={computed.points}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
                {!animate && (
                    <AnnotationNote x={computed.text[0]} y={computed.text[1]} note={note} />
                )}
                {animate && (
                    <Motion
                        style={{
                            x: spring(computed.text[0], springConfig),
                            y: spring(computed.text[1], springConfig),
                        }}
                    >
                        {interpolated => (
                            <AnnotationNote
                                datum={datum}
                                x={interpolated.x}
                                y={interpolated.y}
                                note={note}
                            />
                        )}
                    </Motion>
                )}
            </>
        )
    }
)

Annotation.displayName = 'Annotation'
Annotation.propTypes = {
    datum: PropTypes.object.isRequired,

    type: PropTypes.oneOf(['circle', 'rect', 'dot']).isRequired,

    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,

    noteX: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            abs: PropTypes.number.isRequired,
        }),
    ]).isRequired,
    noteY: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            abs: PropTypes.number.isRequired,
        }),
    ]).isRequired,
    noteWidth: PropTypes.number.isRequired,
    noteTextOffset: PropTypes.number.isRequired,
    note: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,

    ...motionPropTypes,
}
Annotation.defaultProps = {
    noteWidth: defaultProps.noteWidth,
    noteTextOffset: defaultProps.noteTextOffset,

    animate: defaultProps.animate,
    motionStiffness: defaultProps.motionStiffness,
    motionDamping: defaultProps.motionDamping,
}

export default Annotation
