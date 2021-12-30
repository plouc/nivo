import { CompleteTheme } from '@nivo/core'
import { ReactElement } from 'react'

// The types below are from lodash but the babel plugin won't let us import it
type PartialShallow<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [P in keyof T]?: T[P] extends object ? object : T[P]
}
type PropertyName = string | number | symbol
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | PartialShallow<T>
type ListIterator<T, TResult> = (value: T, index: number, collection: ArrayLike<T>) => TResult
type ListIterateeCustom<T, TResult> = ListIterator<T, TResult> | IterateeShorthand<T>

// When passing a simple number, the position
// is considered to be a relative position,
// when using an object with an `abs` property,
// then it's absolute.
export type RelativeOrAbsolutePosition = number | { abs: number }

export type AnnotationPositionGetter<Datum> = (datum: Datum) => {
    x: number
    y: number
}

export type AnnotationDimensionsGetter<Datum> = (datum: Datum) => {
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

// Define the kind of annotation you wish to render
export interface BaseAnnotationSpec<Datum> {
    // x coordinate of the annotated element,
    // referring to the center.
    x?: number
    // y coordinate of the annotated element,
    // referring to the center.
    y?: number
    note: Note<Datum>
    // x coordinate of the note, can be either
    // relative to the annotated element or absolute.
    noteX: RelativeOrAbsolutePosition
    // y coordinate of the note, can be either
    // relative to the annotated element or absolute.
    noteY: RelativeOrAbsolutePosition
    noteWidth?: number
    noteTextOffset?: number
    // circle/dot
    // size?: number
    // // rect
    // width?: number
    // // rect
    // height?: number
}

// This annotation can be used to draw a circle
// around the annotated element.
export type CircleAnnotationSpec<Datum> = BaseAnnotationSpec<Datum> & {
    type: 'circle'
    // diameter of the circle
    size?: number
    // add an extra offset around the annotated element
    offset?: number

    height?: never
    width?: never
}

// This annotation can be used to put a dot
// on the annotated element.
export type DotAnnotationSpec<Datum> = BaseAnnotationSpec<Datum> & {
    type: 'dot'
    // diameter of the dot
    size: number
    // add an extra offset around the annotated element
    offset?: number

    height?: never
    width?: never
}

// This annotation can be used to draw a rectangle
// around the annotated element.
export type RectAnnotationSpec<Datum> = BaseAnnotationSpec<Datum> & {
    type: 'rect'
    width?: number
    height?: number
    // add an extra offset around the annotated element
    offset?: number

    size?: never
    borderRadius?: number
}

export type AnnotationSpec<Datum> =
    | CircleAnnotationSpec<Datum>
    | DotAnnotationSpec<Datum>
    | RectAnnotationSpec<Datum>

export type AnnotationType = AnnotationSpec<unknown>['type']

export type AnnotationMatcher<Datum> = AnnotationSpec<Datum> & {
    match: ListIterateeCustom<Datum, boolean>
    offset?: number
}

// annotation once it has been bound to a specific datum
// according to `match`.
export type BoundAnnotation<Datum> = Required<AnnotationSpec<Datum>> & {
    // x coordinate of the annotated element,
    // referring to the center.
    x: number
    // y coordinate of the annotated element,
    // referring to the center.
    y: number
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
