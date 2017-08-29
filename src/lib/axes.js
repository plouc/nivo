/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const horizontalPositions = ['top', 'bottom']
const verticalPositions = ['left', 'right']

const centerScale = scale => {
    let offset = scale.bandwidth() / 2
    if (scale.round()) {
        offset = Math.round(offset)
    }

    return d => scale(d) + offset
}

/**
 * @typedef {Object} AxisTick
 * @param {number} x
 * @param {number} y
 * @param {number} lineX
 * @param {number} lineY
 * @param {number} textX
 * @param {number} textY
 */

/**
 * @param {number}   width
 * @param {number}   height
 * @param {string}   _position
 * @param {Function} scale
 * @param {number}   [tickSize=5]
 * @param {number}   [tickPadding=5]
 * @param {number}   [tickRotation=0]
 * @return {{ x: number, y: number, ticks: Array.<AxisTick>, textAlign: string, textBaseline: string }}
 */
export const computeAxisTicks = ({
    width,
    height,
    position: _position,
    scale,

    // ticks
    tickSize = 5,
    tickPadding = 5,
    tickRotation = 0,
    //format,
}) => {
    let values
    if (scale.ticks) {
        values = scale.ticks()
    } else {
        values = scale.domain()
    }

    const orient = _position
    const position = scale.bandwidth ? centerScale(scale) : scale
    const line = { lineX: 0, lineY: 0 }
    const text = { textX: 0, textY: 0 }

    let x = 0
    let y = 0
    let translate
    let textAlign = 'center'
    let textBaseline = 'middle'

    if (horizontalPositions.includes(orient)) {
        translate = d => ({ x: position(d), y: 0 })

        line.lineY = tickSize * (orient === 'bottom' ? 1 : -1)
        text.textY = (tickSize + tickPadding) * (orient === 'bottom' ? 1 : -1)

        if (orient === 'bottom') {
            y = height
            textBaseline = 'top'
        } else {
            textBaseline = 'bottom'
        }

        if (tickRotation === 0) {
            textAlign = 'center'
        } else if (
            (orient === 'bottom' && tickRotation < 0) ||
            (orient === 'top' && tickRotation > 0)
        ) {
            textAlign = 'right'
            textBaseline = 'middle'
        } else if (
            (orient === 'bottom' && tickRotation > 0) ||
            (orient === 'top' && tickRotation < 0)
        ) {
            textAlign = 'left'
            textBaseline = 'middle'
        }
    } else if (verticalPositions.includes(orient)) {
        translate = d => ({ x: 0, y: position(d) })

        line.lineX = tickSize * (orient === 'right' ? 1 : -1)
        text.textX = (tickSize + tickPadding) * (orient === 'right' ? 1 : -1)

        if (orient === 'right') {
            x = width
            textAlign = 'left'
        } else {
            textAlign = 'right'
        }
    }

    const ticks = values.map(value => {
        const position = translate(value)

        return {
            value,
            ...position,
            ...line,
            ...text,
        }
    })

    return {
        x,
        y,
        ticks,
        textAlign,
        textBaseline,
    }
}
