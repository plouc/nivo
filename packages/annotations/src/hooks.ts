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
export const useAnnotations = <Datum>({
    data,
    annotations,
    getPosition,
    getDimensions,
}: {
    data: Datum[]
    annotations: AnnotationMatcher<Datum>[]
    getPosition: AnnotationPositionGetter<Datum>
    getDimensions: AnnotationDimensionsGetter<Datum>
}) =>
    useMemo(
        () =>
            bindAnnotations<Datum>({
                data,
                annotations,
                getPosition,
                getDimensions,
            }),
        [data, annotations, getPosition, getDimensions]
    )

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

export const useComputedAnnotation = <Datum>(annotation: AnnotationSpec<Datum>) =>
    useMemo(() => computeAnnotation<Datum>(annotation), [annotation])
