import React from 'react'
import { useComputedAnnotation } from './hooks'
import { AnnotationNote } from './AnnotationNote'
import { AnnotationLink } from './AnnotationLink'
import { CircleAnnotationOutline } from './CircleAnnotationOutline'
import { DotAnnotationOutline } from './DotAnnotationOutline'
import { RectAnnotationOutline } from './RectAnnotationOutline'
import {
    AnnotationSpec,
    isCircleAnnotation,
    isDotAnnotation,
    isRectAnnotation,
    NoteCanvasRenderer,
} from './types'

export const Annotation = <Datum,>(
    annotationSpec: Omit<AnnotationSpec<Datum>, 'note'> & {
        note: Exclude<AnnotationSpec<Datum>['note'], NoteCanvasRenderer>
    }
) => {
    const { datum, x, y, note } = annotationSpec

    const computed = useComputedAnnotation<Datum>(annotationSpec)

    return (
        <>
            <AnnotationLink points={computed.points} isOutline={true} />
            {isCircleAnnotation(annotationSpec) && (
                <CircleAnnotationOutline x={x} y={y} size={annotationSpec.size} />
            )}
            {isDotAnnotation(annotationSpec) && (
                <DotAnnotationOutline x={x} y={y} size={annotationSpec.size} />
            )}
            {isRectAnnotation(annotationSpec) && (
                <RectAnnotationOutline
                    x={x}
                    y={y}
                    width={annotationSpec.width}
                    height={annotationSpec.height}
                />
            )}
            <AnnotationLink points={computed.points} />
            <AnnotationNote datum={datum} x={computed.text[0]} y={computed.text[1]} note={note} />
        </>
    )
}
