/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import Nivo from '../../../Nivo'
import TreeMapHelper from '../../../lib/charts/treemap/TreeMapHelper'
import { convertGetter } from '../../../lib/propertiesConverters'
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps'
import { getColorsGenerator, extractRGB } from '../../../lib/colorUtils'

class TreeMapPlaceholders extends Component {
    componentWillMount() {
        this.treemap = TreeMapHelper()
    }

    willEnter({ data: node }) {
        const width = node.x1 - node.x0
        const height = node.y1 - node.y0

        return {
            x: node.x0 + width / 2,
            y: node.y0 + height / 2,
            width: 0,
            height: 0,
            ...extractRGB(node.color),
        }
    }

    render() {
        const {
            root,
            namespace,
            width: _width,
            height: _height,
            tile,
            leavesOnly,
            innerPadding,
            outerPadding,
            identity: _identity,
            value: _value,
            animate,
            motionStiffness,
            motionDamping,
            colors,
            colorBy,
        } = this.props

        const identity = convertGetter(_identity)
        const value = convertGetter(_value)

        const margin = Object.assign({}, Nivo.defaults.margin, this.props.margin)
        const width = _width - margin.left - margin.right
        const height = _height - margin.top - margin.bottom

        const color = getColorsGenerator(colors, colorBy)

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
            containerProps.style = {
                position: 'absolute',
                top: margin.top,
                left: margin.left,
            }
        }

        const nodes = this.treemap.compute({
            width,
            height,
            root,
            tile,
            leavesOnly,
            innerPadding,
            outerPadding,
            identity,
            value,
            color,
            colorBy,
        })

        if (animate === false) {
            return React.createElement(
                wrapperTag,
                wrapperProps,
                React.createElement(
                    containerTag,
                    containerProps,
                    this.props.children(
                        nodes.map(node => {
                            return {
                                key: node.data.key,
                                data: node.data,
                                style: {
                                    x: node.x0,
                                    y: node.y0,
                                    width: node.x1 - node.x0,
                                    height: node.y1 - node.y0,
                                    color: node.color,
                                },
                            }
                        })
                    )
                )
            )
        }

        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return React.createElement(
            wrapperTag,
            wrapperProps,
            <TransitionMotion
                willEnter={this.willEnter}
                styles={nodes.map(node => {
                    return {
                        key: node.data.key,
                        data: node,
                        style: {
                            x: spring(node.x0, springConfig),
                            y: spring(node.y0, springConfig),
                            width: spring(node.x1 - node.x0, springConfig),
                            height: spring(node.y1 - node.y0, springConfig),
                            ...extractRGB(node.color, springConfig),
                        },
                    }
                })}
            >
                {interpolatedStyles =>
                    React.createElement(
                        containerTag,
                        containerProps,
                        this.props.children(
                            interpolatedStyles.map(interpolatedStyle => {
                                const { colorR, colorG, colorB } = interpolatedStyle.style
                                interpolatedStyle.style.color = `rgb(${Math.round(
                                    colorR
                                )},${Math.round(colorG)},${Math.round(colorB)})`

                                interpolatedStyle.style.width = Math.max(
                                    0,
                                    interpolatedStyle.style.width
                                )
                                interpolatedStyle.style.height = Math.max(
                                    0,
                                    interpolatedStyle.style.height
                                )

                                return interpolatedStyle
                            })
                        )
                    )}
            </TransitionMotion>
        )
    }
}

TreeMapPlaceholders.propTypes = _.omit(treeMapPropTypes, [
    'orientLabels',
    'skipVMin',
    'transitionDuration',
    'transitionEasing',
])

TreeMapPlaceholders.defaultProps = _.omit(treeMapDefaultProps, [
    'orientLabels',
    'skipVMin',
    'transitionDuration',
    'transitionEasing',
])

export default TreeMapPlaceholders
