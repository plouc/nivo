import React from 'react'
import { defaultProps } from './props'
import { useComputedAnnotation } from './hooks'
import { AnnotationNote } from './AnnotationNote'
import { AnnotationLink } from './AnnotationLink'
import { CircleAnnotationOutline } from './CircleAnnotationOutline'
import { DotAnnotationOutline } from './DotAnnotationOutline'
import { RectAnnotationOutline } from './RectAnnotationOutline'
import { AnnotationType, RelativeOrAbsolutePosition } from './types'

export const Annotation = <Datum,>({
    datum,
    type,
    x,
    y,
    size,
    width,
    height,
    noteX,
    noteY,
    noteWidth = defaultProps.noteWidth,
    noteTextOffset = defaultProps.noteTextOffset,
    note,
}: {
    datum: Datum
    type: AnnotationType
    x: number
    y: number
    size?: number
    width?: number
    height?: number
    noteX: RelativeOrAbsolutePosition
    noteY: RelativeOrAbsolutePosition
    noteWidth?: number
    noteTextOffset?: number
    note: any
}) => {
    const computed = useComputedAnnotation({
        type,
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
            {type === 'rect' && <RectAnnotationOutline x={x} y={y} width={width} height={height} />}
            <AnnotationLink points={computed.points} />
            <AnnotationNote datum={datum} x={computed.text[0]} y={computed.text[1]} note={note} />
        </>
    )
}
