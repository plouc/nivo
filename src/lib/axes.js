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
    const bandwidth = scale.bandwidth()

    if (bandwidth === 0) return scale

    let offset = bandwidth / 2
    if (scale.round()) {
        offset = Math.round(offset)
    }

    return d => scale(d) + offset
}

const textPropsByEngine = {
    svg: {
        align: {
            left: 'start',
            center: 'middle',
            right: 'end',
        },
        baseline: {
            top: 'before-edge',
            center: 'central',
            bottom: 'after-edge',
        },
    },
    canvas: {
        align: {
            left: 'left',
            center: 'center',
            right: 'right',
        },
        baseline: {
            top: 'top',
            center: 'middle',
            bottom: 'bottom',
        },
    },
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
 * @parem {string}   [engine='svg']
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

    engine = 'svg',
}) => {
    let values
    if (scale.ticks) {
        values = scale.ticks()
    } else {
        values = scale.domain()
    }

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
