import {
    AnnotationSpec,
    CircleAnnotationSpec,
    DotAnnotationSpec,
    Note,
    NoteCanvas,
    NoteSvg,
    RectAnnotationSpec,
} from './types'
import { isValidElement } from 'react'

export const isSvgNote = <Datum>(note: Note<Datum>): note is NoteSvg<Datum> => {
    const noteType = typeof note

    return (
        isValidElement(note) ||
        noteType === 'string' ||
        noteType === 'function' ||
        noteType === 'object'
    )
}

export const isCanvasNote = <Datum>(note: Note<Datum>): note is NoteCanvas<Datum> => {
    const noteType = typeof note

    return noteType === 'string' || noteType === 'function'
}

export const isCircleAnnotation = <Datum>(
    annotationSpec: AnnotationSpec<Datum>
): annotationSpec is CircleAnnotationSpec<Datum> => annotationSpec.type === 'circle'

export const isDotAnnotation = <Datum>(
    annotationSpec: AnnotationSpec<Datum>
): annotationSpec is DotAnnotationSpec<Datum> => annotationSpec.type === 'dot'

export const isRectAnnotation = <Datum>(
    annotationSpec: AnnotationSpec<Datum>
): annotationSpec is RectAnnotationSpec<Datum> => annotationSpec.type === 'rect'
