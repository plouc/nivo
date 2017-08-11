/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import _ from 'lodash'
import Nivo from '../../../Nivo'
import { getColorsGenerator, extractRGB } from '../../../lib/colorUtils'
import Container from '../Container'
import BubbleHelper from '../../../lib/charts/bubble/BubbleHelper'
import { convertGetter } from '../../../lib/propertiesConverters'
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps'

const ignoreProps = [
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
]

export default class BubblePlaceholders extends Component {
    static propTypes = _.omit(bubblePropTypes, ignoreProps)

    static defaultProps = _.omit(bubbleDefaultProps, ignoreProps)

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
            colorBy,
            animate,
            motionStiffness,
            motionDamping,
            children,
            isInteractive,
        } = this.props

        const identity = convertGetter(_identity)
        const value = convertGetter(_value)
        const color = getColorsGenerator(colors, colorBy)

        const margin = Object.assign({}, Nivo.defaults.margin, this.props.margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom

        const nodes = this.bubble.compute({
            width,
            height,
            root,
            leavesOnly,
            identity,
            value,
            padding,
            color,
            colorBy,
        })

        let wrapperTag
        let containerTag

        const wrapperProps = {}
        const containerProps = {}

        if (namespace === 'svg') {
            wrapperTag = 'svg'
            containerTag = 'g'

            wrapperProps.width = _width
            wrapperProps.height = _height
            wrapperProps.xmlns = 'http://www.w3.org/2000/svg'
            containerProps.transform = `translate(${margin.left},${margin.top})`
        } else {
            wrapperTag = 'div'
            containerTag = 'div'

            wrapperProps.style = {
                position: 'relative',
                width: _width,
                height: _height,
            }
            containerProps.style = Object.assign({}, margin, {
                position: 'absolute',
            })
        }

        if (!animate) {
            return React.createElement(
                wrapperTag,
                wrapperProps,
                React.createElement(
                    containerTag,
                    containerProps,
                    children(
                        nodes.map(node => {
                            return {
                                key: node.data.key,
                                data: node,
                                style: _.pick(node, ['r', 'x', 'y', 'color']),
                            }
                        })
                    )
                )
            )
        }

        const motionProps = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return (
            <Container isInteractive={isInteractive}>
                {({ showTooltip, hideTooltip }) =>
                    React.createElement(
                        wrapperTag,
                        wrapperProps,
                        <TransitionMotion
                            willEnter={this.willEnter}
                            willLeave={this.willLeave}
                            styles={nodes.map(b => {
                                return {
                                    key: b.data.key,
                                    data: b,
                                    style: {
                                        r: spring(b.r, motionProps),
                                        x: spring(b.x, motionProps),
                                        y: spring(b.y, motionProps),
                                        ...extractRGB(b.color, motionProps),
                                    },
                                }
                            })}
                        >
                            {interpolatedStyles => {
                                return React.createElement(
                                    containerTag,
                                    containerProps,
                                    children(
                                        interpolatedStyles.map(interpolatedStyle => {
                                            const {
                                                colorR,
                                                colorG,
                                                colorB,
                                            } = interpolatedStyle.style
                                            interpolatedStyle.style.color = `rgb(${Math.round(
                                                colorR
                                            )},${Math.round(colorG)},${Math.round(colorB)})`

                                            return interpolatedStyle
                                        }),
                                        { showTooltip, hideTooltip }
                                    )
                                )
                            }}
                        </TransitionMotion>
                    )}
            </Container>
        )
    }
}
