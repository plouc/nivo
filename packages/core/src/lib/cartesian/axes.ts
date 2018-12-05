/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isArray, isNumber } from 'lodash'
import { textPropsByEngine } from '../bridge'

const horizontalPositions = ['top', 'bottom']
const verticalPositions = ['left', 'right']

const centerScale = (scale: any): any => {
    if (scale.bandwidth === undefined) return scale

    const bandwidth = scale.bandwidth()
    if (bandwidth === 0) return scale

    let offset = bandwidth / 2
    if (scale.round()) {
        offset = Math.round(offset)
    }

    return d => scale(d) + offset
}

const getScaleValues = (scale: any, tickCount?: number): Array<number | string> => {
    if (scale.ticks) return scale.ticks(tickCount)
    return scale.domain()
}

export const computeAxisTicks = ({
    width,
    height,
    position: _position,
    scale,
    tickValues: _tickValues,
    tickSize = 5,
    tickPadding = 5,
    tickRotation = 0,
    engine = 'svg',
}: {
    width: number
    height: number
    position: string
    scale: any
    tickValues?: number | Array<number | string | Date>
    tickSize: number
    tickPadding: number
    tickRotation: number
    engine?: 'svg' | 'canvas'
}) => {
    const tickValues = isArray(_tickValues) ? _tickValues : undefined
    const tickCount = isNumber(_tickValues) ? _tickValues : undefined

    const values = tickValues !== undefined ? tickValues : getScaleValues(scale, tickCount)

    const textProps = textPropsByEngine[engine]

    const orient = _position
    const position = scale.bandwidth ? centerScale(scale) : scale
    const line = { lineX: 0, lineY: 0 }
    const text = { textX: 0, textY: 0 }

    let x = 0
    let y = 0
    let translate
    let textAlign = textProps.align.center
    let textBaseline = textProps.baseline.center

    if (horizontalPositions.includes(orient)) {
        translate = d => ({ x: position(d), y: 0 })

        line.lineY = tickSize * (orient === 'bottom' ? 1 : -1)
        text.textY = (tickSize + tickPadding) * (orient === 'bottom' ? 1 : -1)

        if (orient === 'bottom') {
            y = height
            textBaseline = textProps.baseline.top
        } else {
            textBaseline = textProps.baseline.bottom
        }

        if (tickRotation === 0) {
            textAlign = textProps.align.center
        } else if (
            (orient === 'bottom' && tickRotation < 0) ||
            (orient === 'top' && tickRotation > 0)
        ) {
            textAlign = textProps.align.right
            textBaseline = textProps.baseline.center
        } else if (
            (orient === 'bottom' && tickRotation > 0) ||
            (orient === 'top' && tickRotation < 0)
        ) {
            textAlign = textProps.align.left
            textBaseline = textProps.baseline.center
        }
    } else if (verticalPositions.includes(orient)) {
        translate = d => ({ x: 0, y: position(d) })

        line.lineX = tickSize * (orient === 'right' ? 1 : -1)
        text.textX = (tickSize + tickPadding) * (orient === 'right' ? 1 : -1)

        if (orient === 'right') {
            x = width
            textAlign = textProps.align.left
        } else {
            textAlign = textProps.align.right
        }
    }

    const ticks = values.map(value => ({
        key: value,
        value,
        ...translate(value),
        ...line,
        ...text,
    }))

    return {
        x,
        y,
        ticks,
        textAlign,
        textBaseline,
    }
}

export const computeGridLines = ({
    width,
    height,
    scale,
    axis,
    values = getScaleValues(scale),
}: {
    width: number
    height: number
    scale: any
    axis: 'x' | 'y'
    values?: Array<number | string | Date>
}): Array<{
    key: string
    x1: number
    x2: number
    y1: number
    y2: number
}> => {
    const position = centerScale(scale)

    let lines
    if (axis === 'x') {
        lines = values.map(v => ({
            key: `${v}`,
            x1: position(v),
            x2: position(v),
            y1: 0,
            y2: height,
        }))
    } else if (axis === 'y') {
        lines = values.map(v => ({
            key: `${v}`,
            x1: 0,
            x2: width,
            y1: position(v),
            y2: position(v),
        }))
    }

    return lines
}
