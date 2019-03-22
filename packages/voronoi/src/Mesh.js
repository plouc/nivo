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
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { getRelativeCursor } from '@nivo/core'
import { computeMeshPoints, computeMesh } from './computeMesh'

class Mesh extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        points: PropTypes.array.isRequired,
        xAccessor: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func])
            .isRequired,
        yAccessor: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func])
            .isRequired,
        onMouseEnter: PropTypes.func,
        onMouseMove: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func,
        debug: PropTypes.bool.isRequired,

        delaunay: PropTypes.shape({
            find: PropTypes.func.isRequired,
        }).isRequired,
        voronoi: PropTypes.shape({
            renderCell: PropTypes.func.isRequired,
        }),
        voronoiPath: PropTypes.string,
    }

    state = {
        index: null,
    }

    constructor(props) {
        super(props)
        this.setRectRef = element => {
            this.rect = element
        }
    }

    handleMouseIn = (handler, event) => {
        const { delaunay, points } = this.props

        const [x, y] = getRelativeCursor(this.rect, event)
        const index = delaunay.find(x, y)

        if (handler !== undefined) {
            handler(points[index], event)
        }

        if (this.state.index !== index) {
            this.setState({ index })
        }
    }

    handleMouseEnter = event => {
        this.handleMouseIn(this.props.onMouseEnter, event)
    }

    handleMouseMove = event => {
        this.handleMouseIn(this.props.onMouseMove, event)
    }

    handleMouseLeave = event => {
        const { onMouseLeave, points } = this.props
        const { index } = this.state

        if (onMouseLeave !== undefined) {
            onMouseLeave(points[index], event)
        }

        this.setState({ index: null })
    }

    handleClick = event => {
        const { onClick, points } = this.props
        const { index } = this.state

        if (onClick === undefined || index === null) return

        onClick(points[index], event)
    }

    render() {
        const { width, height, voronoi, voronoiPath, debug } = this.props
        const { index } = this.state

        return (
            <g ref={this.setRectRef}>
                {debug && <path d={voronoiPath} stroke="red" strokeWidth={0.5} opacity={0.75} />}
                {index !== null && debug && (
                    <path fill="red" opacity={0.25} d={voronoi.renderCell(index)} />
                )}
                <rect
                    width={width}
                    height={height}
                    fill="purple"
                    opacity={0}
                    style={{ cursor: 'crosshair' }}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseMove={this.handleMouseMove}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.handleClick}
                />
            </g>
        )
    }
}

const enhance = compose(
    defaultProps({
        xAccessor: 'x',
        yAccessor: 'y',
        debug: false,
    }),
    withPropsOnChange(['points', 'xAccessor', 'yAccessor'], ({ points, xAccessor, yAccessor }) => ({
        points2d: computeMeshPoints({ points, xAccessor, yAccessor }).points,
    })),
    withPropsOnChange(
        ['points2d', 'width', 'height', 'debug'],
        ({ points2d, width, height, debug }) => {
            const mesh = computeMesh({ points: points2d, width, height, debug })

            let voronoiPath
            if (debug === true) {
                voronoiPath = mesh.voronoi.render()
            }

            return {
                ...mesh,
                voronoiPath,
            }
        }
    )
)

export default enhance(Mesh)
