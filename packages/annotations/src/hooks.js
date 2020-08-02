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
