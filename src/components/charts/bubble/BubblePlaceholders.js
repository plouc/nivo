/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import React, { Component }                    from 'react'
import { TransitionMotion, spring }            from 'react-motion'
import { rgb }                                 from 'd3'
import _                                       from 'lodash'
import Nivo                                    from '../../../Nivo'
import { getColorRange, extractRGB }           from '../../../ColorUtils'
import BubbleHelper                            from '../../../lib/charts/bubble/BubbleHelper'
import { convertGetter }                       from '../../../lib/propertiesConverters'
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps'


class BubblePlaceholders extends Component {
    componentWillMount() {
        this.bubble = BubbleHelper()
    }

    willEnter({ data: node }) {
        return {
            r: 0,
            x: node.x,
            y: node.y,
            ...extractRGB(node.color),
        }
    }

    willLeave(styleThatLeft) {
        return {
            r: spring(0),
            x: spring(styleThatLeft.data.x),
            y: spring(styleThatLeft.data.y),
        }
    }

    render() {
        const {
            root,
            leavesOnly,
            namespace,
            width: _width,
            height: _height,
            identity: _identity,
            value: _value,
            padding,
            colors,
            animate,
            motionStiffness, motionDamping,
            children,
        } = this.props

        const identity = convertGetter(_identity)
        const value    = convertGetter(_value)

        const color    = getColorRange(colors)

        const margin   = Object.assign({}, Nivo.defaults.margin, this.props.margin)
        const width    = _width  - margin.left - margin.right
        const height   = _height - margin.top  - margin.bottom

        const nodes = this.bubble.compute({
            width,
            height,
            root,
            leavesOnly,
            identity, value,
            padding,
            color,
        })

        let wrapperTag
        let containerTag

        const wrapperProps   = {}
        const containerProps = {}

        if (namespace === 'svg') {
            wrapperTag   = 'svg'
            containerTag = 'g'

            wrapperProps.width       = _width
            wrapperProps.height      = _height
            containerProps.transform = `translate(${margin.left},${margin.top})`
        } else {
            wrapperTag   = 'div'
            containerTag = 'div'

            wrapperProps.style = {
                position: 'relative',
                width:    _width,
                height:   _height,
            }
            containerProps.style = margin
        }

        if (animate === false) {
            return React.createElement(wrapperTag, wrapperProps,
                React.createElement(
                    containerTag,
                    containerProps,
                    children(nodes.map(node => {
                        return {
                            key:   node.data.key,
                            data:  node,
                            style: _.pick(node, ['r', 'x', 'y', 'color']),
                        }
                    }))
                )
            )
        }

        const stiffness = motionStiffness
        const damping   = motionDamping

        return React.createElement(wrapperTag, wrapperProps, (
            <TransitionMotion
                willEnter={this.willEnter}
                willLeave={this.willLeave}
                styles={nodes.map(b => {
                    return {
                        key:   b.data.key,
                        data:  b,
                        style: {
                            r: spring(b.r, { stiffness, damping }),
                            x: spring(b.x, { stiffness, damping }),
                            y: spring(b.y, { stiffness, damping }),
                            ...extractRGB(b.color, { stiffness, damping }),
                        }
                    }
                })}
            >
                {interpolatedStyles => {
                    return React.createElement(
                        containerTag,
                        containerProps,
                        children(interpolatedStyles.map(interpolatedStyle => {
                            const { colorR, colorG, colorB } = interpolatedStyle.style
                            interpolatedStyle.style.color = `rgb(${Math.round(colorR)},${Math.round(colorG)},${Math.round(colorB)})`

                            return interpolatedStyle
                        }))
                    );
                }}
            </TransitionMotion>
        ))
    }
}

BubblePlaceholders.propTypes = _.omit(bubblePropTypes, [
    'borderWidth',
    'borderColor',
    'enableLabel',
    'label',
    'labelFormat',
    'labelTextColor',
    'labelSkipRadius',
    'labelTextDY',
    'transitionDuration',
    'transitionEasing',
])

BubblePlaceholders.defaultProps = _.omit(bubbleDefaultProps, [
    'borderWidth',
    'borderColor',
    'enableLabel',
    'label',
    'labelFormat',
    'labelTextColor',
    'labelSkipRadius',
    'labelTextDY',
    'transitionDuration',
    'transitionEasing',
])


export default BubblePlaceholders
