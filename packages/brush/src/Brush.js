/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getCursorPositionFromElement, rectContainsPoint } from './compute'

const STATE_IDLE = 0
const STATE_SELECTING = 1
const STATE_COULD_MOVE = 2
const STATE_MOVING = 3
const STATE_COULD_RESIZE = 4
const STATE_RESIZING = 5
const STATE_COULD_RESIZE_X = 6
const STATE_RESIZING_X = 7
const STATE_COULD_RESIZE_Y = 8
const STATE_RESIZING_Y = 9

const cursors = {
    [STATE_IDLE]: 'crosshair',
    [STATE_SELECTING]: 'crosshair',
    [STATE_COULD_MOVE]: 'move',
    [STATE_MOVING]: 'move',
    [STATE_COULD_RESIZE_X]: 'col-resize',
    [STATE_RESIZING_X]: 'col-resize',
    [STATE_COULD_RESIZE_Y]: 'row-resize',
    [STATE_RESIZING_Y]: 'row-resize',
}

const noop = () => {}

export default class Brush extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,

        handleSize: PropTypes.number.isRequired,

        lockX: PropTypes.bool.isRequired,
        lockY: PropTypes.bool.isRequired,

        onBrushStart: PropTypes.func.isRequired,
        onBrushUpdate: PropTypes.func.isRequired,
        onBrushEnd: PropTypes.func.isRequired,
    }

    static defaultProps = {
        handleSize: 12,

        lockX: false,
        lockY: false,

        onBrushStart: noop,
        onBrushUpdate: noop,
        onBrushEnd: noop,
    }

    state = {
        mode: STATE_IDLE,
        prevPos: null,
        selectionOrigin: null,
        selection: null,
        handles: [],
    }

    constructor(props) {
        super(props)
        this.setElement = element => {
            this.element = element
        }
    }

    getXY = event => getCursorPositionFromElement(this.element, event)

    handleMouseDown = event => {
        event.preventDefault()
        event.stopPropagation()

        const { mode } = this.state

        const [x, y] = this.getXY(event)

        if (mode === STATE_COULD_RESIZE_Y) {
            return this.setState({
                mode: STATE_RESIZING_Y,
                origin: [x, y],
            })
        }

        if (mode === STATE_COULD_MOVE) {
            return this.setState({
                mode: STATE_MOVING,
                previous: [x, y],
            })
        }

        this.setState({
            mode: STATE_SELECTING,
            origin: [x, y],
            selection: { x, y, width: 0, height: 0 },
        })
    }

    handleMouseMove = event => {
        event.preventDefault()
        event.stopPropagation()

        const { handleSize } = this.props
        const { mode, selection, origin, previous } = this.state
        const [x, y] = this.getXY(event)

        if (!selection) return

        if (mode === STATE_SELECTING) {
            let newX = selection.x
            let newY = selection.y
            let newWidth = selection.width
            let newHeight = selection.height

            if (x < origin[0]) {
                newX = x
                newWidth = origin[0] - x
            } else {
                newX = origin[0]
                newWidth = x - origin[0]
            }

            if (y < origin[1]) {
                newY = y
                newHeight = origin[1] - y
            } else {
                newY = origin[1]
                newHeight = y - origin[1]
            }

            return this.setState({
                selection: {
                    x: newX,
                    y: newY,
                    width: newWidth,
                    height: newHeight,
                },
            })
        }

        if (mode === STATE_MOVING) {
            return this.setState({
                selection: {
                    ...selection,
                    x: selection.x + x - previous[0],
                    y: selection.y + y - previous[1],
                },
                previous: [x, y],
            })
        }

        if (mode === STATE_RESIZING_Y) {
            let newY = selection.y
            let newHeight = selection.height

            if (y < origin[1]) {
                newY = y
                newHeight = origin[1] - y
            } else {
                newY = origin[1]
                newHeight = y - origin[1]
            }

            return this.setState({
                selection: {
                    ...selection,
                    y: newY,
                    height: newHeight,
                },
            })
        }

        if (
            rectContainsPoint(
                selection.x,
                selection.y - handleSize * 0.5,
                selection.width,
                handleSize,
                x,
                y
            ) ||
            rectContainsPoint(
                selection.x,
                selection.y + selection.height - handleSize * 0.5,
                selection.width,
                handleSize,
                x,
                y
            )
        ) {
            return this.setState({
                mode: STATE_COULD_RESIZE_Y,
            })
        }

        if (
            rectContainsPoint(
                selection.x - handleSize * 0.5,
                selection.y,
                handleSize,
                selection.height,
                x,
                y
            ) ||
            rectContainsPoint(
                selection.x + selection.width - handleSize * 0.5,
                selection.y,
                handleSize,
                selection.height,
                x,
                y
            )
        ) {
            return this.setState({
                mode: STATE_COULD_RESIZE_X,
            })
        }

        if (rectContainsPoint(selection.x, selection.y, selection.width, selection.height, x, y)) {
            event.preventDefault()
            event.stopPropagation()

            return this.setState({
                mode: STATE_COULD_MOVE,
            })
        }

        this.setState({ mode: STATE_IDLE })
    }

    handleMouseUp = () => {
        this.props.onBrushEnd(this.state.selection)

        this.setState({
            mode: STATE_IDLE,
        })
    }

    render() {
        const { width, height } = this.props
        const { mode, selection } = this.state

        const cursor = cursors[mode]

        let selectionPreview = null
        if (selection) {
            selectionPreview = (
                <g transform={`translate(${selection.x},${selection.y})`}>
                    <rect
                        width={selection.width}
                        height={selection.height}
                        fill="none"
                        stroke="red"
                        strokeWidth={1}
                    />
                </g>
            )
        }

        return (
            <g>
                {selectionPreview}
                <rect
                    ref={this.setElement}
                    width={width}
                    height={height}
                    fill="red"
                    opacity={0}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                    style={{
                        userSelect: 'none',
                        cursor
                    }}
                />
            </g>
        )
    }
}
