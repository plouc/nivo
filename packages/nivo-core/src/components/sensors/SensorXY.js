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
import setDisplayName from 'recompose/setDisplayName'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'

class SensorXY extends Component {
    handle = (e) => {
        const bounds = this.rect.getBoundingClientRect()

        const x = e.clientX - bounds.left
        const y = e.clientY - bounds.top

        const { points, onMatch } = this.props

        let finalX
        let finalY
        const hoveredPoints = []
        points.forEach(p => {
            const deltaX = Math.abs(x - p.x)
            const deltaY = Math.abs(y - p.y)
            if (deltaX < 10 && deltaY < 10) {
                hoveredPoints.push(p.id)
                finalX = p.x
                finalY = p.y
            }
        })

        onMatch({
            x: finalX,
            y: finalY,
            points: hoveredPoints
        })
    }

    render() {
        const {
            width,
            height,
        } = this.props

        return (
            <rect
                ref={rect => { this.rect = rect }}
                width={width}
                height={height}
                fill="rgba(0,0,0,0)"
                onMouseMove={this.handle}
            />
        )
    }
}

SensorXY.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    onMatch: PropTypes.func,
}

const enhance = compose(
    setDisplayName('SensorXY'),
    defaultProps({}),
    withPropsOnChange(['data', 'xScale', 'yScale'], ({ data, xScale, yScale }) => {
        const points = data.reduce((agg, serie) => {
            serie.data.forEach(d => {
                agg.push({
                    id: d.id,
                    x: xScale(d.x),
                    y: yScale(d.y)
                })
            })

            return agg
        }, [])

        return { points }
    }),
    pure
)

export default enhance(SensorXY)