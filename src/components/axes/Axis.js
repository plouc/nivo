/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component, PropTypes } from 'react'
import { TransitionMotion, spring }    from 'react-motion'
import { max }                         from 'd3'
import Nivo                            from '../../Nivo'
import AxisTick                        from './AxisTick'


const center = scale => {
    let offset = scale.bandwidth() / 2
    if (scale.round()) offset = Math.round(offset)

    return d => scale(d) + offset
}


class Axis extends Component {
    willEnter() {
        return {
            opacity: 0,
            x:       0,
            y:       0,
        }
    }

    willLeave(styleThatLeft) {
        const { style } = styleThatLeft

        return {
            opacity: spring(0),
            x:       spring(style.x.val),
            y:       spring(style.y.val),
        }
    }

    render() {
        const {
            orient,
            scale,
            tickSize,
            tickPadding,
            animate,
            motionStiffness, motionDamping,
    } = this.props

        let values
        if (scale.ticks) {
            values = scale.ticks()
        } else {
            values = scale.domain()
        }

        const position = (scale.bandwidth ? center(scale) : scale)

        let translate
        let textAnchor
        let textDY
        const tickLine = { x2: 0, y2: 0 }
        const textXY   = { x:  0, y:  0 }

        if (['top', 'bottom'].includes(orient)) {
            translate = d => ({ x: position(d), y: 0 })

            textAnchor = 'middle'
            textDY     = orient === 'top' ? '0em' : '0.71em'
            textXY.y   = (tickSize + tickPadding) * (orient === 'bottom' ? 1 : -1)

            tickLine.y2 = tickSize * (orient === 'bottom' ? 1 : -1)
        } else if (['left', 'right'].includes(orient)) {
            translate = d => ({ x: 0, y: position(d) })

            textAnchor = orient === 'left' ? 'end' : 'start'
            textDY     = '0.32em'
            textXY.x   = (tickSize + tickPadding) * (orient === 'right' ? 1 : -1)

            tickLine.x2 = tickSize * (orient === 'right' ? 1 : -1)
        }

        const ticks = values.map(v => {
            return {
                key: v,
                ...translate(v),
            }
        })

        const springConfig = {
            stiffness: motionStiffness,
            damping:   motionDamping,
        }

        return (
            <g className={`nivo_axis nivo_axis-${orient}`}>
                <TransitionMotion
                    willEnter={this.willEnter}
                    willLeave={this.willLeave}
                    styles={ticks.map(tick => {
                        return {
                            key:   `${tick.key}`,
                            data:  tick.key,
                            style: {
                                opacity: spring(1,      springConfig),
                                x:       spring(tick.x, springConfig),
                                y:       spring(tick.y, springConfig),
                            }
                        }
                    })}
                >
                    {interpolatedStyles => (
                        <g>
                            {interpolatedStyles.map(interpolatedStyle => {
                                const { key, style } = interpolatedStyle
                                return (
                                    <AxisTick
                                        key={key}
                                        value={key}
                                        tickLine={tickLine}
                                        textXY={textXY}
                                        textDY={textDY}
                                        textAnchor={textAnchor}
                                        {...style}
                                    />
                                )
                            })}
                        </g>
                    )}
                </TransitionMotion>
            </g>
        )
    }
}

Axis.propTypes = {
    orient:          PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    scale:           PropTypes.any.isRequired,
    tickSize:        PropTypes.number.isRequired,
    tickPadding:     PropTypes.number.isRequired,

    // motion
    animate:         PropTypes.bool.isRequired,
    motionStiffness: PropTypes.number.isRequired,
    motionDamping:   PropTypes.number.isRequired,
}

Axis.defaultProps = {
    tickSize:    5,
    tickPadding: 5,

    // motion
    animate:         true,
    motionStiffness: Nivo.defaults.motionStiffness,
    motionDamping:   Nivo.defaults.motionDamping,
}


export default Axis
