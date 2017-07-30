/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import d3 from 'd3'
import invariant from 'invariant'
import { radiansToDegrees } from '../../../ArcUtils'

class RadialStackRadiusAxis extends Component {
    static decorateRadialStack({ props: { angleData } }) {
        const axis = d3.svg.axis()

        return ({
            element,
            angle,
            radius,
            transitionDuration,
            transitionEasing,
        }) => {
            let wrapper = d3.select(
                `.nivo_radial-stack_radius-axis-${angleData}`
            )
            if (wrapper.node() === null) {
                wrapper = element
                    .append('g')
                    .attr(
                        'class',
                        `nivo_radial-stack_radius-axis nivo_radial-stack_radius-axis-${angleData}`
                    )
            }

            // copy original scale
            const scale = radius.copy()
            axis.scale(scale).ticks(3)

            wrapper.attr(
                'transform',
                d => `rotate(${radiansToDegrees(angle(angleData))})`
            )

            wrapper
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .call(axis)
        }
    }

    render() {
        invariant(
            false,
            '<RadialStackRadiusAxis> element is for Radial components configuration only and should not be rendered'
        )
    }
}

const { any } = PropTypes

RadialStackRadiusAxis.propTypes = {
    angleData: any.isRequired,
}

RadialStackRadiusAxis.defaultProps = {}

export default RadialStackRadiusAxis
