export type AnnotationType = 'circle' | 'dot' | 'rect'

export type RelativeOrAbsolutePosition = number | { abs: number }

export interface AnnotationSpec {
    type: AnnotationType
    x: number
    y: number
    size: number
    width: number
    height: number
    noteX: RelativeOrAbsolutePosition
    noteY: RelativeOrAbsolutePosition
    noteWidth: number
    noteTextOffset: number
}

export interface AnnotationSpecWithMatcher<Datum> extends AnnotationSpec {
    match: any
}
