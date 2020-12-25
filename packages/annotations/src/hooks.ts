import { useMemo } from 'react'
import { bindAnnotations, computeAnnotation } from './compute'
import { AnnotationSpec, AnnotationSpecWithMatcher } from './types'

export const useAnnotations = <Datum>({
    items,
    annotations,
    getPosition,
    getDimensions,
}: {
    items: Datum[]
    annotations: AnnotationSpecWithMatcher<Datum>[]
    getPosition: any
    getDimensions: any
}) =>
    useMemo(
        () =>
            bindAnnotations<Datum>({
                items,
                annotations,
                getPosition,
                getDimensions,
            }),
        [items, annotations, getPosition, getDimensions]
    )

export const useComputedAnnotations = ({ annotations }: { annotations: AnnotationSpec[] }) =>
    useMemo(
        () =>
            annotations.map(annotation => ({
                ...annotation,
                computed: computeAnnotation({
                    ...annotation,
                }),
            })),
        [annotations]
    )

export const useComputedAnnotation = ({
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
}: AnnotationSpec) =>
    useMemo(
        () =>
            computeAnnotation({
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
            }),
        [type, x, y, size, width, height, noteX, noteY, noteWidth, noteTextOffset]
    )
