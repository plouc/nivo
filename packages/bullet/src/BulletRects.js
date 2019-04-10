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
import partial from 'lodash/partial'
import { TransitionMotion, spring } from 'react-motion'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { motionPropTypes } from '@nivo/core'
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import { computeRects } from './compute'

class BulletRects extends Component {
    static propTypes = {
        scale: PropTypes.func.isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                v0: PropTypes.number.isRequired,
                v1: PropTypes.number.isRequired,
            })
        ).isRequired,
        layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
        reverse: PropTypes.bool.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        rects: PropTypes.arrayOf(
            PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
                width: PropTypes.number.isRequired,
                height: PropTypes.number.isRequired,
                data: PropTypes.shape({
                    index: PropTypes.number.isRequired,
                    v0: PropTypes.number.isRequired,
                    v1: PropTypes.number.isRequired,
                    color: PropTypes.string.isRequired,
                }).isRequired,
            })
        ).isRequired,
        component: PropTypes.func.isRequired,
        onMouseEnter: PropTypes.func.isRequired,
        onMouseLeave: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        ...motionPropTypes,
    }

    handleMouseEnter = (data, event) => {
        this.props.onMouseEnter(data, event)
    }

    handleMouseLeave = (data, event) => {
        this.props.onMouseLeave(data, event)
    }

    handleClick = (data, event) => {
        this.props.onClick(data, event)
    }

    render() {
        const { rects, layout, y, component, animate, motionStiffness, motionDamping } = this.props

        const transform = `translate(${layout === 'horizontal' ? 0 : y},${
            layout === 'horizontal' ? y : 0
        })`

        if (animate !== true) {
            return (
                <g transform={transform}>
                    {rects.map(rect =>
                        React.createElement(component, {
                            key: rect.data.index,
                            index: rect.data.index,
                            color: rect.data.color,
                            ...rect,
                            onMouseEnter: partial(this.handleMouseEnter, rect.data),
                            onMouseMove: partial(this.handleMouseEnter, rect.data),
                            onMouseLeave: partial(this.handleMouseLeave, rect.data),
                            onClick: partial(this.handleClick, rect.data),
                        })
                    )}
                </g>
            )
        }

        const springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
        }

        return (
            <g transform={transform}>
                <TransitionMotion
                    styles={rects.map(rect => ({
                        key: `${rect.data.index}`,
                        data: rect.data,
                        style: {
                            x: spring(rect.x, springConfig),
                            y: spring(rect.y, springConfig),
                            width: spring(rect.width, springConfig),
                            height: spring(rect.height, springConfig),
                            ...interpolateColor(rect.data.color, springConfig),
                        },
                    }))}
                >
                    {interpolatedStyles => (
                        <Fragment>
                            {interpolatedStyles.map(({ key, style, data }) => {
                                const color = getInterpolatedColor(style)

                                return React.createElement(component, {
                                    key,
                                    index: Number(key),
                                    data,
                                    x: style.x,
                                    y: style.y,
                                    width: Math.max(style.width, 0),
                                    height: Math.max(style.height, 0),
                                    color,
                                    onMouseEnter: partial(this.handleMouseEnter, data),
                                    onMouseMove: partial(this.handleMouseEnter, data),
                                    onMouseLeave: partial(this.handleMouseLeave, data),
                                    onClick: partial(this.handleClick, data),
                                })
                            })}
                        </Fragment>
                    )}
                </TransitionMotion>
            </g>
        )
    }
}

const EnhancedBulletRects = compose(
    withPropsOnChange(
        ['data', 'layout', 'reverse', 'scale', 'height'],
        ({ data, layout, reverse, scale, height }) => ({
            rects: computeRects({
                data,
                layout,
                reverse,
                scale,
                height,
            }),
        })
    ),
    pure
)(BulletRects)

EnhancedBulletRects.displayName = 'BulletRects'

export default EnhancedBulletRects
