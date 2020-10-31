/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { bindAnnotations, computeAnnotation } from './compute'
import { AnnotationDatum, AnnotationProps, UseAnnotationsProps, ContainerDimensions } from './types'

export const useAnnotations = <Datum extends AnnotationDatum>({
    items,
    annotations,
    getPosition,
    getDimensions,
}: UseAnnotationsProps<Datum>) =>
    useMemo(
        () =>
            bindAnnotations({
                items,
                annotations,
                getPosition,
                getDimensions,
            }),
        [items, annotations, getPosition, getDimensions]
    )

export const useComputedAnnotations = <Datum extends AnnotationDatum>({
    annotations,
}: Pick<UseAnnotationsProps<Datum>, 'annotations'>) =>
    useMemo(
        () =>
            annotations.map(annotation => ({
                ...annotation,
                computed: computeAnnotation(annotation as any),
            })),
        [annotations]
    )

export const useComputedAnnotation = ({
    containerWidth,
    containerHeight,
    x,
    y,
    noteX,
    noteY,
    noteWidth,
    noteTextOffset,
    ...props
}: AnnotationProps & ContainerDimensions) =>
    useMemo(
        () =>
            computeAnnotation({
                ...props,
                x,
                y,
                noteX,
                noteY,
                noteWidth,
                noteTextOffset,
            }),
        [props, containerWidth, containerHeight, x, y, noteX, noteY, noteWidth, noteTextOffset]
    )
