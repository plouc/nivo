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

class SensorX extends Component {
    handle = (e) => {
        const bounds = this.rect.getBoundingClientRect()

        const x = e.clientX - bounds.left

        const { points, onMatch } = this.props

        let finalX
        const hoveredPoints = []
        points.forEach(p => {
            const deltaX = Math.abs(x - p.x)
            if (deltaX < 10) {
                hoveredPoints.push(p.id)
                finalX = p.x
            }
        })

        onMatch({
            x: finalX,
            points: hoveredPoints
        })
    }

    handleLeave = () => {
        this.props.onMatch({
            x: null,
            points: []
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
                onMouseLeave={this.handleLeave}
            />
        )
    }
}

SensorX.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xScale: PropTypes.func,
    onMatch: PropTypes.func,
}

const enhance = compose(
    setDisplayName('SensorX'),
    defaultProps({}),
    withPropsOnChange(['data', 'xScale'], ({ data, xScale }) => {
        const points = data.reduce((agg, serie) => {
            serie.data.forEach(d => {
                agg.push({
                    id: d.id,
                    x: xScale(d.x),
                })
            })

            return agg
        }, [])

        return { points }
    }),
    pure
)

export default enhance(SensorX)