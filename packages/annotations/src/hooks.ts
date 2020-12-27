import { useMemo } from 'react'
import { bindAnnotations, computeAnnotation } from './compute'
import {
    AnnotationDimensionsGetter,
    AnnotationMatcher,
    AnnotationPositionGetter,
    AnnotationSpec,
} from './types'

/**
 * Bind annotations to a dataset.
 */
export const useAnnotations = <Datum>(params: {
    data: Datum[]
    annotations: AnnotationMatcher<Datum>[]
    getPosition: AnnotationPositionGetter<Datum>
    getDimensions: AnnotationDimensionsGetter<Datum>
}) =>
    useMemo(() => bindAnnotations<Datum>(params), [
        params.data,
        params.annotations,
        params.getPosition,
        params.getDimensions,
    ])

export const useComputedAnnotations = <Datum>({
    annotations,
}: {
    annotations: AnnotationSpec<Datum>[]
}) =>
    useMemo(
        () =>
            annotations.map(annotation => ({
                ...annotation,
                computed: computeAnnotation<Datum>({
                    ...annotation,
                }),
            })),
        [annotations]
    )

export const useComputedAnnotation = <Datum>(annotationSpec: AnnotationSpec<Datum>) =>
    useMemo(() => computeAnnotation<Datum>(annotationSpec), [
        annotationSpec.type,
        annotationSpec.x,
        annotationSpec.y,
        annotationSpec.size,
        annotationSpec.width,
        annotationSpec.height,
        annotationSpec.noteX,
        annotationSpec.noteY,
        annotationSpec.noteWidth,
        annotationSpec.noteTextOffset,
    ])
