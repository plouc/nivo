/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { merge } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import _ from 'lodash'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { withHierarchy, withTheme, withColors, withDimensions, withMotion } from '../../../hocs'
import { extractRGB } from '../../../lib/colorUtils'
import Container from '../Container'
import { computeBubble } from '../../../lib/charts/bubble/BubbleHelper'
import { getAccessorFor } from '../../../lib/propertiesConverters'
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

const nodeWillEnter = ({ data: node }) => ({
    r: 0,
    x: node.x,
    y: node.y,
    ...extractRGB(node.color),
})

const nodeWillLeave = styleThatLeft => ({
    r: spring(0),
    x: spring(styleThatLeft.data.x),
    y: spring(styleThatLeft.data.y),
})

const BubblePlaceholders = ({
    root,
    getIdentity,

    leavesOnly,
    namespace,

    width,
    height,
    margin,
    outerWidth,
    outerHeight,

    padding,

    // theming
    theme,
    getColor,

    animate,
    motionStiffness,
    motionDamping,
    children,
    isInteractive,
}) => {
    const nodes = computeBubble({
        width,
        height,
        root,
        leavesOnly,
        getIdentity,
        padding,
        getColor,
    })

    let wrapperTag
    let containerTag

    const wrapperProps = {}
    const containerProps = {}

    if (namespace === 'svg') {
        wrapperTag = 'svg'
        containerTag = 'g'

        wrapperProps.width = outerWidth
        wrapperProps.height = outerHeight
        wrapperProps.xmlns = 'http://www.w3.org/2000/svg'
        containerProps.transform = `translate(${margin.left},${margin.top})`
    } else {
        wrapperTag = 'div'
        containerTag = 'div'

        wrapperProps.style = {
            position: 'relative',
            width: outerWidth,
            height: outerHeight,
        }
        containerProps.style = Object.assign({}, margin, {
            position: 'absolute',
        })
    }

    if (!animate) {
        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) =>
                    React.createElement(
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
                                }),
                                { showTooltip, hideTooltip }
                            )
                        )
                    )}
            </Container>
        )
    }

    const motionProps = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) =>
                React.createElement(
                    wrapperTag,
                    wrapperProps,
                    <TransitionMotion
                        willEnter={nodeWillEnter}
                        willLeave={nodeWillLeave}
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
                                        const { colorR, colorG, colorB } = interpolatedStyle.style
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

BubblePlaceholders.propTypes = _.omit(bubblePropTypes, ignoreProps)

export const BubblePlaceholdersDefaultProps = _.omit(bubbleDefaultProps, ignoreProps)

BubblePlaceholders.defaultProps = BubblePlaceholdersDefaultProps

const enhance = compose(
    withHierarchy(),
    withDimensions(),
    withTheme(),
    withMotion(),
    withColors({
        defaultColorBy: 'depth',
    }),
    withPropsOnChange(['identity'], ({ identity }) => ({
        getIdentity: getAccessorFor(identity),
    })),
    pure
)

export default enhance(BubblePlaceholders)
