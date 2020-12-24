import isPlainObject from 'lodash/isPlainObject'
import filter from 'lodash/filter'
import omit from 'lodash/omit'
import {
    radiansToDegrees,
    absoluteAngleDegrees,
    degreesToRadians,
    positionFromAngle,
} from '@nivo/core'
import { defaultProps } from './props'
import { AnnotationSpec, AnnotationSpecWithMatcher } from './types'

const defaultPositionAccessor = item => ({ x: item.x, y: item.y })

export const bindAnnotations = <Datum>({
    items,
    annotations,
    getPosition = defaultPositionAccessor,
    getDimensions,
}: {
    items: Datum[]
    annotations: AnnotationSpecWithMatcher<Datum>[]
    getPosition: any
    getDimensions: any
}) =>
    annotations.reduce((acc, annotation) => {
        filter(items, annotation.match).forEach(item => {
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
    type,
    x,
    y,
    size,
    width,
    height,
    noteX,
    noteY,
    noteWidth = defaultProps.noteWidth,
    noteTextOffset = defaultProps.noteTextOffset,
}: AnnotationSpec) => {
    let computedNoteX
    let computedNoteY

    if (isPlainObject(noteX)) {
        if (noteX.abs !== undefined) {
            computedNoteX = noteX.abs
        }
    } else {
        computedNoteX = x + noteX
    }

    if (isPlainObject(noteY)) {
        if (noteY.abs !== undefined) {
            computedNoteY = noteY.abs
        }
    } else {
        computedNoteY = y + noteY
    }

    let computedX = x
    let computedY = y

    const angle = getLinkAngle(x, y, computedNoteX, computedNoteY)

    if (type === 'circle') {
        const position = positionFromAngle(degreesToRadians(angle), size / 2)
        computedX += position.x
        computedY += position.y
    }

    if (type === 'rect') {
        const eighth = Math.round((angle + 90) / 45) % 8
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
    let textY = computedNoteY - noteTextOffset

    let noteLineX = computedNoteX
    let noteLineY = computedNoteY

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
