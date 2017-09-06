/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { generateGroupedBars, generateStackedBars } from '../../../lib/charts/bar'
import enhance from './enhance'
import { BarPropTypes } from './props'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import Grid from '../../axes/Grid'
import CartesianMarkers from '../../cartesian/markers/CartesianMarkers'
import Axes from '../../axes/Axes'
import BarItem from './BarItem'
import BarItemLabel from './BarItemLabel'

const barWillEnterHorizontal = ({ style }) => ({
    x: style.x.val,
    y: style.y.val,
    width: 0,
    height: style.height.val,
})

const barWillEnterVertical = ({ style }) => ({
    x: style.x.val,
    y: style.y.val + style.height.val,
    width: style.width.val,
    height: 0,
})

const barWillLeaveHorizontal = springConfig => ({ style }) => ({
    x: style.x,
    y: style.y,
    width: spring(0, springConfig),
    height: style.height,
})

const barWillLeaveVertical = springConfig => ({ style }) => ({
    x: style.x,
    y: spring(style.y.val + style.height.val, springConfig),
    width: style.width,
    height: spring(0, springConfig),
})

const Bar = ({
    data,
    getIndex,
    keys,

    groupMode,
    layout,
    minValue,
    maxValue,

    margin,
    width,
    height,
    outerWidth,
    outerHeight,
    padding,

    // axes & grid
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX,
    enableGridY,

    // labels
    enableLabels,
    getLabelsLinkColor,
    getLabelsTextColor,

    // markers
    markers,

    // theming
    theme,
    getColor,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
}) => {
    const options = {
        layout,
        data,
        getIndex,
        keys,
        minValue,
        maxValue,
        width,
        height,
        getColor,
        padding,
    }

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    const springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    const result =
        groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options)
    let willEnter = layout === 'vertical' ? barWillEnterVertical : barWillEnterHorizontal
    let willLeave =
        layout === 'vertical'
            ? barWillLeaveVertical(springConfig)
            : barWillLeaveHorizontal(springConfig)

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => {
                let bars
                if (animate === true) {
                    bars = (
                        <TransitionMotion
                            willEnter={willEnter}
                            willLeave={willLeave}
                            styles={result.bars.map(bar => {
                                return {
                                    key: bar.key,
                                    data: bar,
                                    style: {
                                        x: spring(bar.x, motionProps),
                                        y: spring(bar.y, motionProps),
                                        width: spring(bar.width, motionProps),
                                        height: spring(bar.height, motionProps),
                                    },
                                }
                            })}
                        >
                            {interpolatedStyles => (
                                <g>
                                    {interpolatedStyles.map(({ key, style, data }) => (
                                        <BarItem
                                            key={key}
                                            {...data}
                                            {...style}
                                            width={Math.max(style.width, 0)}
                                            height={Math.max(style.height, 0)}
                                            showTooltip={showTooltip}
                                            hideTooltip={hideTooltip}
                                            theme={theme}
                                        />
                                    ))}
                                </g>
                            )}
                        </TransitionMotion>
                    )
                } else {
                    bars = result.bars.map(d => (
                        <BarItem
                            key={d.key}
                            {...d}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            theme={theme}
                        />
                    ))
                }

                return (
                    <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                        <Grid
                            theme={theme}
                            width={width}
                            height={height}
                            xScale={enableGridX ? result.xScale : null}
                            yScale={enableGridY ? result.yScale : null}
                            {...motionProps}
                        />
                        <CartesianMarkers
                            markers={markers}
                            width={width}
                            height={height}
                            xScale={result.xScale}
                            yScale={result.yScale}
                            theme={theme}
                        />
                        <Axes
                            xScale={result.xScale}
                            yScale={result.yScale}
                            width={width}
                            height={height}
                            theme={theme}
                            top={axisTop}
                            right={axisRight}
                            bottom={axisBottom}
                            left={axisLeft}
                            {...motionProps}
                        />
                        {bars}
                        {enableLabels &&
                            result.bars.map(d => (
                                <BarItemLabel
                                    {...d}
                                    textColor={getLabelsTextColor(d, theme)}
                                    linkColor={getLabelsLinkColor(d, theme)}
                                />
                            ))}
                    </SvgWrapper>
                )
            }}
        </Container>
    )
}

Bar.propTypes = BarPropTypes

export default enhance(Bar)
