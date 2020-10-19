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

        return (
            <>
                <AnnotationLink points={computed.points} isOutline={true} />
                {type === 'circle' && <CircleAnnotationOutline x={x} y={y} size={size} />}
                {type === 'dot' && <DotAnnotationOutline x={x} y={y} size={size} />}
                {type === 'rect' && (
                    <RectAnnotationOutline x={x} y={y} width={width} height={height} />
                )}
                <AnnotationLink points={computed.points} />
                <AnnotationNote
                    datum={datum}
                    x={computed.text[0]}
                    y={computed.text[1]}
                    note={note}
                />
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
}
Annotation.defaultProps = {
    noteWidth: defaultProps.noteWidth,
    noteTextOffset: defaultProps.noteTextOffset,
}

export default Annotation
