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
import { Axis, motionPropTypes } from '@nivo/core'

export default class BulletItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        scale: PropTypes.func.isRequired,
        ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
        measures: PropTypes.arrayOf(PropTypes.number).isRequired,
        markers: PropTypes.arrayOf(PropTypes.number),
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        measureHeight: PropTypes.number.isRequired,
        markerHeight: PropTypes.number.isRequired,
        theme: PropTypes.object.isRequired,
        ...motionPropTypes,
    }

    static defaultProps = {
        markers: [],
    }

    render() {
        const {
            scale,
            ranges,
            measures,
            markers,
            x,
            y,
            width,
            height,
            measureHeight,
            markerHeight,
            theme,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
        }

        return (
            <g transform={`translate(${x},${y})`}>
                <TransitionMotion
                    styles={ranges.map((range, i) => ({
                        key: `${i}`,
                        style: {
                            width: spring(scale(range), springConfig),
                            height: spring(height, springConfig),
                        },
                    }))}
                >
                    {interpolatedStyles => (
                        <Fragment>
                            {interpolatedStyles.map(({ key, style }) => (
                                <rect
                                    key={key}
                                    width={Math.max(style.width, 0)}
                                    height={Math.max(style.height, 0)}
                                    fill="rgba(255, 0, 0, .35)"
                                />
                            ))}
                        </Fragment>
                    )}
                </TransitionMotion>
                <g transform={`translate(0,${(height - measureHeight) / 2})`}>
                    <TransitionMotion
                        styles={measures.map((measure, i) => ({
                            key: `${i}`,
                            style: {
                                width: spring(scale(measure), springConfig),
                                height: spring(measureHeight, springConfig),
                            },
                        }))}
                    >
                        {interpolatedStyles => (
                            <Fragment>
                                {interpolatedStyles.map(({ key, style }) => (
                                    <rect
                                        key={key}
                                        width={Math.max(style.width, 0)}
                                        height={Math.max(style.height, 0)}
                                        fill="rgba(0, 255, 0, .35)"
                                    />
                                ))}
                            </Fragment>
                        )}
                    </TransitionMotion>
                </g>
                <TransitionMotion
                    styles={markers.map((marker, i) => ({
                        key: `${i}`,
                        style: {
                            x: spring(scale(marker), springConfig),
                            height: spring(markerHeight, springConfig),
                        },
                    }))}
                >
                    {interpolatedStyles => (
                        <Fragment>
                            {interpolatedStyles.map(({ key, style }) => (
                                <line
                                    key={key}
                                    y1={(height - style.height) / 2}
                                    y2={(height - style.height) / 2 + style.height}
                                    x1={style.x}
                                    x2={style.x}
                                    fill="none"
                                    stroke="black"
                                    strokeWidth={3}
                                />
                            ))}
                        </Fragment>
                    )}
                </TransitionMotion>
                <Axis width={width} height={height} scale={scale} position="bottom" theme={theme} />
            </g>
        )
    }
}
