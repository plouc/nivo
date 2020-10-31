import { filter } from 'lodash'
import { ReactNode } from 'react'

export interface Position {
    x: number
    y: number
}

export interface AnnotationDatum extends Position {}

export interface AnnotationItem {
    type: AnnotationType
    match: typeof filter
    noteX: NoteCoordinate
    noteY: NoteCoordinate
    offset?: number
    size?: number
}

export interface ContainerDimensions {
    containerHeight: number
    containerWidth: number
}

export interface Dimensions {
    height: number
    size: number
    width: number
}

export interface UseAnnotationsProps<Datum extends AnnotationDatum> {
    items: Datum[]
    annotations: AnnotationItem[]
    getPosition?: (datum: Datum) => Position
    getDimensions: (datum: Datum, offset: number) => Dimensions
}

export type AnnotationNoteFn = (props: Position & { datum: AnnotationDatum }) => ReactNode

export type AnnotationType = 'circle' | 'dot' | 'rect'

export type NoteCoordinate = number | { abs: number }

type CommonAnnotationProps = Position & {
    noteX: NoteCoordinate
    noteY: NoteCoordinate
    noteWidth?: number
    noteTextOffset?: number
}

export type CircleAnnotationProps = CommonAnnotationProps & {
    type: 'circle'
    size: number
}

export type DotAnnotationProps = CommonAnnotationProps & {
    type: 'dot'
    size?: number
}

export type RectAnnotationProps = CommonAnnotationProps & {
    type: 'rect'
    width: number
    height: number
}

export type AnnotationProps = CircleAnnotationProps | DotAnnotationProps | RectAnnotationProps
