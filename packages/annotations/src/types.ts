import { CompleteTheme } from '@nivo/core'
import React, { ReactElement } from 'react'

// When passing a simple number, the position
// is considered to be a relative position,
// when using an object with an `abs` property,
// then it's absolute.
export type RelativeOrAbsolutePosition = number | { abs: number }

export type AnnotationPositionGetter<Datum> = (
    datum: Datum
) => {
    x: number
    y: number
}

export type AnnotationDimensionsGetter<Datum> = (
    datum: Datum,
    offset: number
) => {
    size: number
    width: number
    height: number
}

export type NoteComponent<Datum> = (props: { datum: Datum; x: number; y: number }) => JSX.Element

export type NoteSvg<Datum> = string | ReactElement | NoteComponent<Datum>

export type NoteCanvasRenderer<Datum> = (
    ctx: CanvasRenderingContext2D,
    props: {
        datum: Datum
        x: number
        y: number
        theme: CompleteTheme
    }
) => void

export type NoteCanvas<Datum> = string | NoteCanvasRenderer<Datum>

export type Note<Datum> = NoteSvg<Datum> | NoteCanvas<Datum>

export const isSvgNote = <Datum>(note: Note<Datum>): note is NoteSvg<Datum> => {
    const noteType = typeof note

    return (
        React.isValidElement(note) ||
        noteType === 'string' ||
        noteType === 'function' ||
        noteType === 'object'
    )
}

export const isCanvasNote = <Datum>(note: Note<Datum>): note is NoteCanvas<Datum> => {
    const noteType = typeof note

    return noteType === 'string' || noteType === 'function'
}

// Define the kind of annotation you wish to render
export interface BaseAnnotationSpec<Datum> {
    // x coordinate of the annotated element
    x: number
    // y coordinate of the annotated element
    y: number
    note: Note<Datum>
    // x coordinate of the note, can be either
    // relative to the annotated element or absolute.
    noteX: RelativeOrAbsolutePosition
    // y coordinate of the note, can be either
    // relative to the annotated element or absolute.
    noteY: RelativeOrAbsolutePosition
    noteWidth: number
    noteTextOffset: number
    // circle/dot
    size?: number
    // rect
    width?: number
    // rect
    height?: number
}

// This annotation can be used to draw a circle
// around the annotated element.
export type CircleAnnotationSpec<Datum> = BaseAnnotationSpec<Datum> & {
    type: 'circle'
    // diameter of the circle
    size: number
}

export const isCircleAnnotation = <Datum>(
    annotationSpec: AnnotationSpec<Datum>
): annotationSpec is CircleAnnotationSpec<Datum> => annotationSpec.type === 'circle'

// This annotation can be used to put a dot
// on the annotated element.
export type DotAnnotationSpec<Datum> = BaseAnnotationSpec<Datum> & {
    type: 'dot'
    // diameter of the dot
    size: number
}

export const isDotAnnotation = <Datum>(
    annotationSpec: AnnotationSpec<Datum>
): annotationSpec is DotAnnotationSpec<Datum> => annotationSpec.type === 'dot'

// This annotation can be used to draw a rectangle
// around the annotated element.
export type RectAnnotationSpec<Datum> = BaseAnnotationSpec<Datum> & {
    type: 'rect'
    width: number
    height: number
}

export const isRectAnnotation = <Datum>(
    annotationSpec: AnnotationSpec<Datum>
): annotationSpec is RectAnnotationSpec<Datum> => annotationSpec.type === 'rect'

export type AnnotationSpec<Datum> =
    | CircleAnnotationSpec<Datum>
    | DotAnnotationSpec<Datum>
    | RectAnnotationSpec<Datum>

export type AnnotationType = AnnotationSpec<unknown>['type']

export type AnnotationMatcher<Datum> = AnnotationSpec<Datum> & {
    match: (datum: Datum) => boolean
    offset?: number
}

// annotation once it has been bound to a specific datum
// according to `match`.
export type BoundAnnotation<Datum> = AnnotationSpec<Datum> & {
    datum: Datum
}

export type AnnotationInstructions = {
    // points of the link
    points: [number, number][]
    // position of the text
    text: [number, number]
    // in degrees
    angle: number
}

export type ComputedAnnotation<Datum> = BoundAnnotation<Datum> & {
    computed: AnnotationInstructions
}
