/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import maxBy from 'lodash/maxBy'
import sortBy from 'lodash/sortBy'
import { getValueFormatter } from '@nivo/core'
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

export default class StackedSizeLegendSvg extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                value: PropTypes.number.isRequired,
                size: PropTypes.number.isRequired,
                color: PropTypes.string,
            })
        ).isRequired,
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
        format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
        labelPosition: PropTypes.oneOf([
            POSITION_TOP,
            POSITION_RIGHT,
            POSITION_BOTTOM,
            POSITION_LEFT,
        ]).isRequired,
        labelColor: PropTypes.string.isRequired,
        linkLength: PropTypes.number.isRequired,
        linkDotSize: PropTypes.number.isRequired,
        linkColor: PropTypes.string.isRequired,
        linkStyle: PropTypes.object.isRequired,
        labelOffset: PropTypes.number.isRequired,
        shape: PropTypes.oneOf([SHAPE_CIRCLE, SHAPE_SQUARE]).isRequired,
        shapeColor: PropTypes.string.isRequired,
        shapeStyle: PropTypes.object.isRequired,
    }

    static defaultProps = {
        x: 0,
        y: 0,
        anchor: ANCHOR_BOTTOM,
        format: v => v,
        labelPosition: POSITION_RIGHT,
        labelColor: '#333333',
        linkLength: 20,
        linkDotSize: 4,
        linkColor: '#333333',
        linkStyle: {
            strokeWidth: 1,
        },
        labelOffset: 9,
        shape: SHAPE_SQUARE,
        shapeColor: '#333333',
        shapeStyle: {
            strokeWidth: 2,
            fill: 'none',
        },
    }

    render() {
        const {
            data: _data,
            x,
            y,
            anchor,
            linkLength,
            linkDotSize,
            linkColor,
            linkStyle,
            format,
            labelPosition,
            labelOffset,
            labelColor,
            shape,
            shapeColor,
            shapeStyle,
        } = this.props

        const formatter = getValueFormatter(format)
        const data = sortBy(_data, 'size').reverse()
        const maxShape = maxBy(data, 'size')
        const maxSize = maxShape.size

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
                    id: d.id,
                    label: d.label,
                    size: d.size,
                }))
                switch (labelPosition) {
                    case POSITION_RIGHT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x + labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_LEFT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x - labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_BOTTOM:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y + labelOffset,
                            label: link.label,
                        }))
                        break
                    case POSITION_TOP:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y - labelOffset,
                            label: link.label,
                        }))
                        break
                }

                break

            case ANCHOR_TOP:
                shapes = data.map(d => ({
                    x: (maxShape.size - d.size) / 2,
                    y: 0,
                    id: d.id,
                    label: d.label,
                    size: d.size,
                }))
                switch (labelPosition) {
                    case POSITION_RIGHT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x + labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_LEFT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x - labelOffset,
                            y: link.target.y,
                            label: link.Label,
                        }))
                        break
                    case POSITION_BOTTOM:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y + labelOffset,
                            label: link.label,
                        }))
                        break
                    case POSITION_TOP:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y - labelOffset,
                            label: link.label,
                        }))
                        break
                }
                break

            case ANCHOR_TOP_RIGHT:
                shapes = data.map(d => ({
                    x: maxShape.size - d.size,
                    y: 0,
                    id: d.id,
                    label: d.label,
                    size: d.size,
                }))
                switch (labelPosition) {
                    case POSITION_RIGHT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x + labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_LEFT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x - labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_BOTTOM:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y + labelOffset,
                            label: link.label,
                        }))
                        break
                    case POSITION_TOP:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y - labelOffset,
                            label: link.label,
                        }))
                        break
                }
                break

            case ANCHOR_RIGHT:
                shapes = data.map(d => ({
                    x: maxShape.size - d.size,
                    y: (maxShape.size - d.size) / 2,
                    id: d.id,
                    label: d.label,
                    size: d.size,
                }))
                switch (labelPosition) {
                    case POSITION_RIGHT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x + labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_LEFT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x - labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_BOTTOM:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y + labelOffset,
                            label: link.label,
                        }))
                        break
                    case POSITION_TOP:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y - labelOffset,
                            label: link.Label,
                        }))
                        break
                }
                break

            case ANCHOR_BOTTOM_RIGHT:
                shapes = data.map(d => ({
                    x: maxShape.size - d.size,
                    y: maxShape.size - d.size,
                    id: d.id,
                    label: d.label,
                    size: d.size,
                }))
                switch (labelPosition) {
                    case POSITION_RIGHT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x + labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_LEFT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x - labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_BOTTOM:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y + labelOffset,
                            label: link.label,
                        }))
                        break
                    case POSITION_TOP:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y - labelOffset,
                            label: link.label,
                        }))
                        break
                }
                break

            case ANCHOR_BOTTOM:
                shapes = data.map(d => ({
                    x: (maxShape.size - d.size) / 2,
                    y: maxShape.size - d.size,
                    id: d.id,
                    label: d.label,
                    size: d.size,
                }))
                switch (labelPosition) {
                    case POSITION_RIGHT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x + labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_LEFT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x - labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_BOTTOM:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y + labelOffset,
                            label: link.label,
                        }))
                        break
                    case POSITION_TOP:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y - labelOffset,
                            label: link.label,
                        }))
                        break
                }
                break

            case ANCHOR_BOTTOM_LEFT:
                shapes = data.map(d => ({
                    x: 0,
                    y: maxShape.size - d.size,
                    id: d.id,
                    label: d.label,
                    size: d.size,
                }))
                switch (labelPosition) {
                    case POSITION_RIGHT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x + labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_LEFT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x - labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_BOTTOM:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y + labelOffset,
                            label: link.label,
                        }))
                        break
                    case POSITION_TOP:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y - labelOffset,
                            label: link.label,
                        }))
                        break
                }
                break

            case ANCHOR_LEFT:
                shapes = data.map(d => ({
                    x: 0,
                    y: (maxShape.size - d.size) / 2,
                    id: d.id,
                    label: d.label,
                    size: d.size,
                }))
                switch (labelPosition) {
                    case POSITION_RIGHT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x + labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_LEFT:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x - labelOffset,
                            y: link.target.y,
                            label: link.label,
                        }))
                        break
                    case POSITION_BOTTOM:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y + labelOffset,
                            label: link.label,
                        }))
                        break
                    case POSITION_TOP:
                        links = shapes.map(s => {
                            return {
                                label: s.label,
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
                        labels = links.map(link => ({
                            x: link.target.x,
                            y: link.target.y - labelOffset,
                            label: link.label,
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
                            stroke={shapeColor}
                            style={shapeStyle}
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
                            stroke={shapeColor}
                            style={shapeStyle}
                        />
                    ))}
                {links.map((link, i) => (
                    <Fragment key={i}>
                        <line
                            stroke={linkColor}
                            style={linkStyle}
                            x1={link.source.x}
                            y1={link.source.y}
                            x2={link.target.x}
                            y2={link.target.y}
                        />
                        <circle
                            fill={linkColor}
                            r={linkDotSize / 2}
                            cx={link.source.x}
                            cy={link.source.y}
                        />
                        <circle
                            fill={linkColor}
                            r={linkDotSize / 2}
                            cx={link.target.x}
                            cy={link.target.y}
                        />
                    </Fragment>
                ))}
                {labels.map((label, i) => (
                    <text
                        key={i}
                        x={label.x}
                        y={label.y}
                        textAnchor={textAnchor}
                        style={{ alignmentBaseline, fill: labelColor }}
                    >
                        {formatter(label.label)}
                    </text>
                ))}
            </g>
        )
    }
}
