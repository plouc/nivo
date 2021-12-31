import { useMemo } from 'react'
import { bindAnnotations, computeAnnotation } from './compute'
import {
    AnnotationDimensionsGetter,
    AnnotationMatcher,
    AnnotationPositionGetter,
    BoundAnnotation,
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
    annotations: BoundAnnotation<Datum>[]
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

export const useComputedAnnotation = <Datum>(annotation: BoundAnnotation<Datum>) =>
    useMemo(() => computeAnnotation<Datum>(annotation), [annotation])
