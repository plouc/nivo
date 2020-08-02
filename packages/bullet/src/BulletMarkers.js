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
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '@nivo/core'
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import partial from 'lodash/partial'

const getPositionGenerator = ({ layout, reverse, scale, height, markerSize }) => {
    if (layout === 'horizontal') {
        return marker => {
            const x = scale(marker.value)
            const y = height / 2
            const rotation = reverse === true ? 180 : 0

            return { x, y, size: markerSize, rotation }
        }
    }

    return marker => {
        const x = height / 2
        const y = scale(marker.value)
        const rotation = reverse === true ? 270 : 90

        return { x, y, size: markerSize, rotation }
    }
}

export default class BulletMarkers extends Component {
    static propTypes = {
        scale: PropTypes.func.isRequired,
        layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
        reverse: PropTypes.bool.isRequired,
        markers: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                index: PropTypes.number.isRequired,
                color: PropTypes.string.isRequired,
            })
        ).isRequired,
        height: PropTypes.number.isRequired,
        markerSize: PropTypes.number.isRequired,
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
        const {
            scale,
            layout,
            reverse,
            markers,
            height,
            markerSize,
            component,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const getPosition = getPositionGenerator({ layout, reverse, scale, height, markerSize })

        if (animate !== true) {
            return (
                <Fragment>
                    {markers.map(marker =>
                        React.createElement(component, {
                            key: marker.index,
                            ...marker,
                            ...getPosition(marker),
                            data: marker,
                            onMouseEnter: partial(this.handleMouseEnter, marker),
                            onMouseMove: partial(this.handleMouseEnter, marker),
                            onMouseLeave: partial(this.handleMouseLeave, marker),
                            onClick: partial(this.handleClick, marker),
                        })
                    )}
                </Fragment>
            )
        }

        const springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
        }

        return (
            <TransitionMotion
                styles={markers.map((marker, i) => {
                    const position = getPosition(marker)

                    return {
                        key: `${i}`,
                        data: marker,
                        style: {
                            x: spring(position.x, springConfig),
                            y: spring(position.y, springConfig),
                            size: spring(position.size, springConfig),
                            rotation: spring(position.rotation, springConfig),
                            ...interpolateColor(marker.color, springConfig),
                        },
                    }
                })}
            >
                {interpolatedStyles => (
                    <Fragment>
                        {interpolatedStyles.map(({ key, style, data: marker }) => {
                            const color = getInterpolatedColor(style)

                            return React.createElement(component, {
                                key,
                                ...marker,
                                ...style,
                                color,
                                data: marker,
                                onMouseEnter: partial(this.handleMouseEnter, marker),
                                onMouseMove: partial(this.handleMouseEnter, marker),
                                onMouseLeave: partial(this.handleMouseLeave, marker),
                                onClick: partial(this.handleClick, marker),
                            })
                        })}
                    </Fragment>
                )}
            </TransitionMotion>
        )
    }
}
