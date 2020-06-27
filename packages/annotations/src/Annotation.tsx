/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, ReactNode } from 'react'
import { AnnotationProps, AnnotationNoteFn, AnnotationDatum, ContainerDimensions } from './types'
import { useComputedAnnotation } from './hooks'
import AnnotationNote from './AnnotationNote'
import AnnotationLink from './AnnotationLink'
import CircleAnnotationOutline from './CircleAnnotationOutline'
import DotAnnotationOutline from './DotAnnotationOutline'
import RectAnnotationOutline from './RectAnnotationOutline'

// export interface AnnotationNote {
//     abs: number | string
// }

// export interface AnnotationProps {
//     datum: AnnotationDatum[]

//     type: 'circle' | 'rect' | 'dot'

//     containerWidth: number
//     containerHeight: number

//     x: number
//     y: number
//     size?: number
//     width?: number
//     height?: number

//     noteX: number | AnnotationNote
//     noteY: number | AnnotationNote
//     noteWidth?: number
//     noteTextOffset?: number
//     note: ReactNode // PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
// }

interface Datum {
    datum: AnnotationDatum
}

interface Note {
    note: AnnotationNoteFn | ReactNode
}

export const annotationDefaults = {
    noteWidth: 120,
    noteTextOffset: 8,

    animate: true,
    motionStiffness: 90,
    motionDamping: 13,
}

export const Annotation = memo(
    ({
        datum,
        containerWidth,
        containerHeight,
        x,
        y,
        noteX,
        noteY,
        noteWidth = annotationDefaults.noteWidth,
        noteTextOffset = annotationDefaults.noteTextOffset,
        note,
        ...props
    }: AnnotationProps & ContainerDimensions & Datum & Note) => {
        const computed = useComputedAnnotation({
            ...props,
            containerWidth,
            containerHeight,
            x,
            y,
            noteX,
            noteY,
            noteWidth,
            noteTextOffset,
        })

        return (
            <>
                <AnnotationLink points={computed.points} isOutline={true} />
                {props.type === 'circle' && (
                    <CircleAnnotationOutline x={x} y={y} size={props.size} />
                )}
                {props.type === 'dot' && <DotAnnotationOutline x={x} y={y} size={props.size} />}
                {props.type === 'rect' && (
                    <RectAnnotationOutline x={x} y={y} width={props.width} height={props.height} />
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

// Annotation.displayName = 'Annotation'
// Annotation.propTypes = {
//     datum: PropTypes.object.isRequired,

//     type: PropTypes.oneOf(['circle', 'rect', 'dot']).isRequired,

//     containerWidth: PropTypes.number.isRequired,
//     containerHeight: PropTypes.number.isRequired,

//     x: PropTypes.number.isRequired,
//     y: PropTypes.number.isRequired,
//     size: PropTypes.number,
//     width: PropTypes.number,
//     height: PropTypes.number,

//     noteX: PropTypes.oneOfType([
//         PropTypes.number,
//         PropTypes.shape({
//             abs: PropTypes.number.isRequired,
//         }),
//     ]).isRequired,
//     noteY: PropTypes.oneOfType([
//         PropTypes.number,
//         PropTypes.shape({
//             abs: PropTypes.number.isRequired,
//         }),
//     ]).isRequired,
//     noteWidth: PropTypes.number.isRequired,
//     noteTextOffset: PropTypes.number.isRequired,
//     note: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
// }
// Annotation.defaultProps = {
//     noteWidth: defaultProps.noteWidth,
//     noteTextOffset: defaultProps.noteTextOffset,
// }

// export default Annotation
