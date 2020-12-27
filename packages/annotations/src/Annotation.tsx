import React from 'react'
import { useComputedAnnotation } from './hooks'
import { AnnotationNote } from './AnnotationNote'
import { AnnotationLink } from './AnnotationLink'
import { CircleAnnotationOutline } from './CircleAnnotationOutline'
import { DotAnnotationOutline } from './DotAnnotationOutline'
import { RectAnnotationOutline } from './RectAnnotationOutline'
import {
    BoundAnnotation,
    isCircleAnnotation,
    isDotAnnotation,
    isRectAnnotation,
    isSvgNote,
} from './types'

export const Annotation = <Datum,>(annotation: BoundAnnotation<Datum>) => {
    const { datum, x, y, note } = annotation
    if (!isSvgNote(note)) {
        throw new Error('note should be a valid react element')
    }

    const computed = useComputedAnnotation(annotation)

    return (
        <>
            <AnnotationLink points={computed.points} isOutline={true} />
            {isCircleAnnotation(annotation) && (
                <CircleAnnotationOutline x={x} y={y} size={annotation.size} />
            )}
            {isDotAnnotation(annotation) && (
                <DotAnnotationOutline x={x} y={y} size={annotation.size} />
            )}
            {isRectAnnotation(annotation) && (
                <RectAnnotationOutline
                    x={x}
                    y={y}
                    width={annotation.width}
                    height={annotation.height}
                />
            )}
            <AnnotationLink points={computed.points} />
            <AnnotationNote datum={datum} x={computed.text[0]} y={computed.text[1]} note={note} />
        </>
    )
}
