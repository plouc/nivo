/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import max from 'lodash/max'
import {
    SHAPE_SQUARE,
    SHAPE_CIRCLE,
    ANCHOR_TOP,
    ANCHOR_TOP_RIGHT,
    ANCHOR_RIGHT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_LEFT,
    ANCHOR_TOP_LEFT,
    POSITION_TOP,
    POSITION_RIGHT,
    POSITION_BOTTOM,
    POSITION_LEFT,
} from '../constants'

const SizeLegendSvg = ({ x, y, anchor, linkLength, labelPosition, labelOffset, shape }) => {
    const data = [
        {
            size: 120,
        },
        {
            size: 90,
        },
        {
            size: 50,
        },
    ]

    const maxShape = data[0]

    const maxSize = max(data.map(d => d.size))

    let shapes
    let links = []
    let labels = []

    let alignmentBaseline
    let textAnchor
    switch (labelPosition) {
        case POSITION_TOP:
            alignmentBaseline = 'baseline'
            textAnchor = 'middle'
            break
        case POSITION_RIGHT:
            alignmentBaseline = 'central'
            textAnchor = 'start'
            break
        case POSITION_LEFT:
            alignmentBaseline = 'central'
            textAnchor = 'end'
            break
        case POSITION_BOTTOM:
            alignmentBaseline = 'hanging'
            textAnchor = 'middle'
    }

    switch (anchor) {
        case ANCHOR_TOP_LEFT:
            shapes = data.map(d => ({
                x: 0,
                y: 0,
                size: d.size,
            }))
            switch (labelPosition) {
                case POSITION_RIGHT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.size : s.size / 2,
                                y: s.y + s.size,
                            },
                            target: {
                                x: maxSize - s.x + linkLength,
                                y: s.y + s.size,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x + labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_LEFT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? 0 : s.size / 2,
                                y: s.y + s.size,
                            },
                            target: {
                                x: -linkLength,
                                y: s.y + s.size,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x - labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_BOTTOM:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.size,
                                y: shape === SHAPE_SQUARE ? s.size : s.size / 2,
                            },
                            target: {
                                x: s.size,
                                y: maxSize + linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y + labelOffset,
                        label: i,
                    }))
                    break
                case POSITION_TOP:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.size,
                                y: shape === SHAPE_SQUARE ? 0 : s.size / 2,
                            },
                            target: {
                                x: s.size,
                                y: -linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y - labelOffset,
                        label: i,
                    }))
                    break
            }

            break

        case ANCHOR_TOP:
            shapes = data.map(d => ({
                x: (maxShape.size - d.size) / 2,
                y: 0,
                size: d.size,
            }))
            switch (labelPosition) {
                case POSITION_RIGHT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.x + s.size : s.x + s.size / 2,
                                y: s.size,
                            },
                            target: {
                                x: maxSize + linkLength,
                                y: s.size,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x + labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_LEFT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.x : maxSize / 2,
                                y: s.size,
                            },
                            target: {
                                x: -linkLength,
                                y: s.size,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x - labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_BOTTOM:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x + s.size,
                                y: shape === SHAPE_SQUARE ? s.size : s.size / 2,
                            },
                            target: {
                                x: s.x + s.size,
                                y: maxSize + linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y + labelOffset,
                        label: i,
                    }))
                    break
                case POSITION_TOP:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x + s.size,
                                y: shape === SHAPE_SQUARE ? 0 : s.size / 2,
                            },
                            target: {
                                x: s.x + s.size,
                                y: -linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y - labelOffset,
                        label: i,
                    }))
                    break
            }
            break

        case ANCHOR_TOP_RIGHT:
            shapes = data.map(d => ({
                x: maxShape.size - d.size,
                y: 0,
                size: d.size,
            }))
            switch (labelPosition) {
                case POSITION_RIGHT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? maxSize : s.x + s.size / 2,
                                y: s.size,
                            },
                            target: {
                                x: s.x + s.size + linkLength,
                                y: s.size,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x + labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_LEFT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.x : s.x + s.size / 2,
                                y: s.size,
                            },
                            target: {
                                x: -linkLength,
                                y: s.size,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x - labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_BOTTOM:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x,
                                y: shape === SHAPE_SQUARE ? s.size : s.size / 2,
                            },
                            target: {
                                x: s.x,
                                y: maxSize + linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y + labelOffset,
                        label: i,
                    }))
                    break
                case POSITION_TOP:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x,
                                y: shape === SHAPE_SQUARE ? 0 : s.size / 2,
                            },
                            target: {
                                x: s.x,
                                y: -linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y - labelOffset,
                        label: i,
                    }))
                    break
            }
            break

        case ANCHOR_RIGHT:
            shapes = data.map(d => ({
                x: maxShape.size - d.size,
                y: (maxShape.size - d.size) / 2,
                size: d.size,
            }))
            switch (labelPosition) {
                case POSITION_RIGHT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? maxSize : s.x + s.size / 2,
                                y: s.y,
                            },
                            target: {
                                x: s.x + s.size + linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x + labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_LEFT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.x : s.x + s.size / 2,
                                y: s.y,
                            },
                            target: {
                                x: -linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x - labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_BOTTOM:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x,
                                y: shape === SHAPE_SQUARE ? s.y + s.size : s.y + s.size / 2,
                            },
                            target: {
                                x: s.x,
                                y: maxSize + linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y + labelOffset,
                        label: i,
                    }))
                    break
                case POSITION_TOP:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x,
                                y: shape === SHAPE_SQUARE ? s.y : s.y + s.size / 2,
                            },
                            target: {
                                x: s.x,
                                y: -linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y - labelOffset,
                        label: i,
                    }))
                    break
            }
            break

        case ANCHOR_BOTTOM_RIGHT:
            shapes = data.map(d => ({
                x: maxShape.size - d.size,
                y: maxShape.size - d.size,
                size: d.size,
            }))
            switch (labelPosition) {
                case POSITION_RIGHT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? maxSize : s.x + s.size / 2,
                                y: s.y,
                            },
                            target: {
                                x: s.x + s.size + linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x + labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_LEFT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.x : s.x + s.size / 2,
                                y: s.y,
                            },
                            target: {
                                x: -linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x - labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_BOTTOM:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x,
                                y: shape === SHAPE_SQUARE ? maxSize : maxSize - s.size / 2,
                            },
                            target: {
                                x: s.x,
                                y: maxSize + linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y + labelOffset,
                        label: i,
                    }))
                    break
                case POSITION_TOP:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x,
                                y: shape === SHAPE_SQUARE ? s.y : maxSize - s.size / 2,
                            },
                            target: {
                                x: s.x,
                                y: -linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y - labelOffset,
                        label: i,
                    }))
                    break
            }
            break

        case ANCHOR_BOTTOM:
            shapes = data.map(d => ({
                x: (maxShape.size - d.size) / 2,
                y: maxShape.size - d.size,
                size: d.size,
            }))
            switch (labelPosition) {
                case POSITION_RIGHT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.x + s.size : s.x + s.size / 2,
                                y: s.y,
                            },
                            target: {
                                x: s.x + s.size / 2 + maxSize / 2 + linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x + labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_LEFT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.x : maxSize / 2,
                                y: s.y,
                            },
                            target: {
                                x: -linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x - labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_BOTTOM:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x + s.size,
                                y: shape === SHAPE_SQUARE ? maxSize : maxSize - s.size / 2,
                            },
                            target: {
                                x: s.x + s.size,
                                y: maxSize + linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y + labelOffset,
                        label: i,
                    }))
                    break
                case POSITION_TOP:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.x + s.size,
                                y: shape === SHAPE_SQUARE ? s.y : maxSize - s.size / 2,
                            },
                            target: {
                                x: s.x + s.size,
                                y: -linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y - labelOffset,
                        label: i,
                    }))
                    break
            }
            break

        case ANCHOR_BOTTOM_LEFT:
            shapes = data.map(d => ({
                x: 0,
                y: maxShape.size - d.size,
                size: d.size,
            }))
            switch (labelPosition) {
                case POSITION_RIGHT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.size : s.x + s.size / 2,
                                y: s.y,
                            },
                            target: {
                                x: maxSize - s.x + linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x + labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_LEFT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? 0 : s.size / 2,
                                y: s.y,
                            },
                            target: {
                                x: -linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x - labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_BOTTOM:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.size,
                                y: shape === SHAPE_SQUARE ? maxSize : maxSize - s.size / 2,
                            },
                            target: {
                                x: s.size,
                                y: maxSize + linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y + labelOffset,
                        label: i,
                    }))
                    break
                case POSITION_TOP:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.size,
                                y: shape === SHAPE_SQUARE ? s.y : maxSize - s.size / 2,
                            },
                            target: {
                                x: s.size,
                                y: -linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y - labelOffset,
                        label: i,
                    }))
                    break
            }
            break

        case ANCHOR_LEFT:
            shapes = data.map(d => ({
                x: 0,
                y: (maxShape.size - d.size) / 2,
                size: d.size,
            }))
            switch (labelPosition) {
                case POSITION_RIGHT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? s.size : s.size / 2,
                                y: s.y,
                            },
                            target: {
                                x: maxSize - s.x + linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x + labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_LEFT:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: shape === SHAPE_SQUARE ? 0 : s.size / 2,
                                y: s.y,
                            },
                            target: {
                                x: -linkLength,
                                y: s.y,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x - labelOffset,
                        y: link.target.y,
                        label: i,
                    }))
                    break
                case POSITION_BOTTOM:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.size,
                                y: shape === SHAPE_SQUARE ? s.y + s.size : s.y + s.size / 2,
                            },
                            target: {
                                x: s.size,
                                y: maxSize + linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y + labelOffset,
                        label: i,
                    }))
                    break
                case POSITION_TOP:
                    links = shapes.map(s => {
                        return {
                            source: {
                                x: s.size,
                                y: shape === SHAPE_SQUARE ? s.y : s.y + s.size / 2,
                            },
                            target: {
                                x: s.size,
                                y: -linkLength,
                            },
                        }
                    })
                    labels = links.map((link, i) => ({
                        x: link.target.x,
                        y: link.target.y - labelOffset,
                        label: i,
                    }))
                    break
            }
            break
    }

    return (
        <g transform={`translate(${x},${y})`}>
            {shape === 'circle' &&
                shapes.map((s, i) => (
                    <circle
                        key={i}
                        r={s.size / 2}
                        cx={s.x + s.size / 2}
                        cy={s.y + s.size / 2}
                        fill="none"
                        strokeDasharray="3 6"
                        stroke="black"
                    />
                ))}
            {shape === 'square' &&
                shapes.map((s, i) => (
                    <rect
                        key={i}
                        x={s.x}
                        y={s.y}
                        width={s.size}
                        height={s.size}
                        fill="none"
                        strokeDasharray="3 6"
                        stroke="black"
                    />
                ))}
            {links.map((link, i) => (
                <Fragment key={i}>
                    <line
                        stroke="black"
                        x1={link.source.x}
                        y1={link.source.y}
                        x2={link.target.x}
                        y2={link.target.y}
                    />
                    <circle fill="black" r={2} cx={link.source.x} cy={link.source.y} />
                    <circle fill="black" r={2} cx={link.target.x} cy={link.target.y} />
                </Fragment>
            ))}
            {labels.map((label, i) => (
                <text
                    key={i}
                    x={label.x}
                    y={label.y}
                    textAnchor={textAnchor}
                    style={{ alignmentBaseline, fill: 'black' }}
                >
                    {label.label}
                </text>
            ))}
        </g>
    )
}

SizeLegendSvg.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    anchor: PropTypes.oneOf([
        ANCHOR_TOP,
        ANCHOR_TOP_RIGHT,
        ANCHOR_RIGHT,
        ANCHOR_BOTTOM_RIGHT,
        ANCHOR_BOTTOM,
        ANCHOR_BOTTOM_LEFT,
        ANCHOR_LEFT,
        ANCHOR_TOP_LEFT,
    ]).isRequired,
    labelPosition: PropTypes.oneOf([POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT])
        .isRequired,
    linkLength: PropTypes.number.isRequired,
    labelOffset: PropTypes.number.isRequired,
    shape: PropTypes.oneOf([SHAPE_CIRCLE, SHAPE_SQUARE]).isRequired,
}

SizeLegendSvg.defaultProps = {
    x: 0,
    y: 0,
    anchor: ANCHOR_BOTTOM,
    labelPosition: POSITION_RIGHT,
    linkLength: 20,
    labelOffset: 9,
    shape: SHAPE_SQUARE,
}

export default SizeLegendSvg
