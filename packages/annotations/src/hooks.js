import { useMemo } from 'react'
import { bindAnnotations, computeAnnotation } from './compute'

export const useAnnotations = ({ items, annotations, getPosition, getDimensions }) =>
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

export const useComputedAnnotations = ({ annotations, containerWidth, containerHeight }) =>
    useMemo(
        () =>
            annotations.map(annotation => ({
                ...annotation,
                computed: computeAnnotation({
                    containerWidth,
                    containerHeight,
                    ...annotation,
                }),
            })),
        [annotations, containerWidth, containerHeight]
    )

export const useComputedAnnotation = ({
    type,
    containerWidth,
    containerHeight,
    x,
    y,
    size,
    width,
    height,
    noteX,
    noteY,
    noteWidth,
    noteTextOffset,
}) =>
    useMemo(
        () =>
            computeAnnotation({
                type,
                containerWidth,
                containerHeight,
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
        [
            type,
            containerWidth,
            containerHeight,
            x,
            y,
            size,
            width,
            height,
            noteX,
            noteY,
            noteWidth,
            noteTextOffset,
        ]
    )
