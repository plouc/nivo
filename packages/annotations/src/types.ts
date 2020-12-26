import { CompleteTheme } from '@nivo/core'

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

export type NoteCanvasRenderer = <Datum>(
    ctx: CanvasRenderingContext2D,
    props: {
        datum: Datum
        x: number
        y: number
        theme: CompleteTheme
    }
) => void

export type NoteComponent = <Datum>(props: { datum: Datum; x: number; y: number }) => JSX.Element

export interface CommonAnnotationSpec<Datum> {
    // the datum associated to the annotated element
    datum: Datum
    // x coordinate of the annotated element
    x: number
    // y coordinate of the annotated element
    y: number
    note: string | NoteComponent | NoteCanvasRenderer
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
export type CircleAnnotationSpec<Datum> = CommonAnnotationSpec<Datum> & {
    type: 'circle'
    // diameter of the circle
    size: number
}

export const isCircleAnnotation = <Datum>(
    annotationSpec: Omit<AnnotationSpec<Datum>, 'datum' | 'note'>
): annotationSpec is CircleAnnotationSpec<Datum> => annotationSpec.type === 'circle'

// This annotation can be used to put a dot
// on the annotated element.
export type DotAnnotationSpec<Datum> = CommonAnnotationSpec<Datum> & {
    type: 'dot'
    // diameter of the dot
    size: number
}

export const isDotAnnotation = <Datum>(
    annotationSpec: Omit<AnnotationSpec<Datum>, 'datum' | 'note'>
): annotationSpec is DotAnnotationSpec<Datum> => annotationSpec.type === 'dot'

// This annotation can be used to draw a rectangle
// around the annotated element.
export type RectAnnotationSpec<Datum> = CommonAnnotationSpec<Datum> & {
    type: 'rect'
    width: number
    height: number
}

export const isRectAnnotation = <Datum>(
    annotationSpec: Omit<AnnotationSpec<Datum>, 'datum' | 'note'>
): annotationSpec is RectAnnotationSpec<Datum> => annotationSpec.type === 'rect'

export type AnnotationSpec<Datum> =
    | CircleAnnotationSpec<Datum>
    | DotAnnotationSpec<Datum>
    | RectAnnotationSpec<Datum>

export type AnnotationType = AnnotationSpec<unknown>['type']

export type AnnotationSpecWithMatcher<Datum> = AnnotationSpec<Datum> & {
    match: (datum: Datum) => boolean
    offset?: number
}

export type ComputedAnnotation = {
    // points of the link
    points: [number, number][]
    // position of the text
    text: [number, number]
    // in degrees
    angle: number
}

export type ComputedAnnotationSpec<Datum> = AnnotationSpec<Datum> & {
    computed: ComputedAnnotation
}
