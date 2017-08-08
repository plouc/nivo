/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// credit to Tanner Linsey from this issue on react motion repository:
// https://github.com/chenglou/react-motion/issues/153

import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { interpolate } from 'd3-interpolate'

const enhancedSpring = (value, config) => {
    if (typeof value !== 'number') {
        return {
            value,
            config,
            interpolator: config && config.interpolator ? config.interpolator : interpolate,
        }
    }
    return spring(value, config)
}

export default class SmartMotion extends Component {
    oldValues = {}
    newInters = {}
    currentStepValues = {}
    stepValues = {}
    stepInterpolators = {}

    render() {
        const { style, children, ...rest } = this.props

        const resolvedStyle = style(enhancedSpring)

        for (let key in resolvedStyle) {
            if (
                // If key is a non-numeric interpolation
                resolvedStyle[key] &&
                resolvedStyle[key].interpolator
            ) {
                // Make sure the steps start at 0
                this.currentStepValues[key] = this.currentStepValues[key] || 0
                if (
                    // And the value has changed
                    typeof this.newInters[key] === 'undefined' ||
                    resolvedStyle[key].value !== this.newInters[key].value
                ) {
                    // Save the new value
                    this.newInters[key] = resolvedStyle[key]

                    // Increment the stepInterValue for this key by 1
                    this.stepValues[key] = this.currentStepValues[key] + 1

                    // Set up the new interpolator
                    this.stepInterpolators[key] = this.newInters[key].interpolator(
                        this.oldValues[key],
                        this.newInters[key].value
                    )
                }
                // Return the spring with the destination stepValue and spring config
                resolvedStyle[key] = spring(this.stepValues[key], this.newInters[key].config)
                // console.log(resolvedStyle[key])
            }
        }

        return (
            <Motion {...rest} style={resolvedStyle}>
                {values => {
                    const newValues = {}
                    for (let key in values) {
                        if (this.stepValues[key]) {
                            // Save the currentStepValue
                            this.currentStepValues[key] = values[key]
                            // Figure the percentage
                            const percentage =
                                this.currentStepValues[key] - this.stepValues[key] + 1
                            // Save the current value and replace the value in the interpolated object
                            this.oldValues[key] = newValues[key] = this.stepInterpolators[key](
                                percentage
                            )
                        }
                    }
                    return children({
                        ...values,
                        ...newValues,
                    })
                }}
            </Motion>
        )
    }
}
