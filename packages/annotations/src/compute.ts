/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { filter, omit } from 'lodash'
import {
    radiansToDegrees,
    absoluteAngleDegrees,
    degreesToRadians,
    positionFromAngle,
} from '@nivo/core'
import { annotationDefaults } from './Annotation'
import {
    AnnotationProps,
    AnnotationDatum,
    AnnotationItem,
    Position,
    UseAnnotationsProps,
} from './types'

const defaultPositionAccessor = <T extends AnnotationDatum>(item: T): Position => ({
    x: item.x,
    y: item.y,
})

export interface ComputedAnnotation extends Omit<AnnotationItem, 'match' | 'offset'> {
    datum: AnnotationDatum
    size: number
}

const isDatum = (item: unknown): item is AnnotationDatum => item !== undefined

export const bindAnnotations = <Datum extends AnnotationDatum>({
    items,
    annotations,
    getPosition = defaultPositionAccessor,
    getDimensions,
}: UseAnnotationsProps<Datum>) =>
    annotations.reduce<ComputedAnnotation[]>((acc, annotation) => {
        filter(items, annotation.match).forEach(item => {
            if (!isDatum(item)) {
                return
            }

            const position = getPosition(item)
            const dimensions = getDimensions(item, annotation.offset || 0)

            acc.push({
                ...omit(annotation, ['match', 'offset']),
                ...position,
                ...dimensions,
                datum: item,
                size: annotation.size || dimensions.size,
            })
        })

        return acc
    }, [])

export const getLinkAngle = (
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number
) => {
    const angle = Math.atan2(targetY - sourceY, targetX - sourceX)
    return absoluteAngleDegrees(radiansToDegrees(angle))
}

export const computeAnnotation = ({
    x = 0,
    y = 0,
    noteX,
    noteY,
    noteWidth = annotationDefaults.noteWidth,
    noteTextOffset = annotationDefaults.noteTextOffset,
    ...props
}: AnnotationProps) => {
    let computedNoteX = 0
    let computedNoteY = 0

    if (typeof noteX !== 'number') {
        if (noteX.abs !== undefined) {
            computedNoteX = Number(noteX.abs)
        }
    } else {
        computedNoteX = x + noteX
    }

    if (typeof noteY !== 'number') {
        if (noteY.abs !== undefined) {
            computedNoteY = Number(noteY.abs)
        }
    } else {
        computedNoteY = y + noteY
    }

    let computedX = x
    let computedY = y

    const angle = getLinkAngle(x, y, computedNoteX, computedNoteY)

    if (props.type === 'circle') {
        const position = positionFromAngle(degreesToRadians(angle), props.size / 2)
        computedX += position.x
        computedY += position.y
    }

    if (props.type === 'rect') {
        const eighth = Math.round((angle + 90) / 45) % 8
        const { height, width } = props
        if (eighth === 0) {
            computedY -= height / 2
        }
        if (eighth === 1) {
            computedX += width / 2
            computedY -= height / 2
        }
        if (eighth === 2) {
            computedX += width / 2
        }
        if (eighth === 3) {
            computedX += width / 2
            computedY += height / 2
        }
        if (eighth === 4) {
            computedY += height / 2
        }
        if (eighth === 5) {
            computedX -= width / 2
            computedY += height / 2
        }
        if (eighth === 6) {
            computedX -= width / 2
        }
        if (eighth === 7) {
            computedX -= width / 2
            computedY -= height / 2
        }
    }

    let textX = computedNoteX
    const textY = computedNoteY - noteTextOffset

    let noteLineX = computedNoteX
    const noteLineY = computedNoteY

    if ((angle + 90) % 360 > 180) {
        textX -= noteWidth
        noteLineX -= noteWidth
    } else {
        noteLineX += noteWidth
    }

    return {
        points: [
            [computedX, computedY],
            [computedNoteX, computedNoteY],
            [noteLineX, noteLineY],
        ],
        text: [textX, textY],
        angle: angle + 90,
    }
}
