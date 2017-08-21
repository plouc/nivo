/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { withTheme, withColors, withDimensions, withMotion } from '../../../hocs'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import { generateGroupedBars, generateStackedBars } from '../../../lib/charts/bar'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import Grid from '../../axes/Grid'
import CartesianMarkers from '../../cartesian/markers/CartesianMarkers'
import Axes from '../../axes/Axes'
import BarItem from './BarItem'
import BarItemLabel from './BarItemLabel'

const Bar = ({
    data,
    getIndex,
    keys,

    groupMode,
    layout,

    margin,
    width,
    height,
    outerWidth,
    outerHeight,
    xPadding,

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
    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    let result
    if (groupMode === 'grouped') {
        result = generateGroupedBars(layout, data, getIndex, keys, width, height, getColor, {
            xPadding,
        })
    } else if (groupMode === 'stacked') {
        result = generateStackedBars(layout, data, getIndex, keys, width, height, getColor, {
            xPadding,
        })
    }

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => {
                let bars
                if (animate === true) {
                    bars = (
                        <TransitionMotion
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
                            {interpolatedStyles =>
                                <g>
                                    {interpolatedStyles.map(({ key, style, data }) =>
                                        <BarItem
                                            key={key}
                                            {...data}
                                            {...style}
                                            showTooltip={showTooltip}
                                            hideTooltip={hideTooltip}
                                        />
                                    )}
                                </g>}
                        </TransitionMotion>
                    )
                } else {
                    bars = result.bars.map(d =>
                        <BarItem
                            key={d.key}
                            {...d}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                        />
                    )
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
                            result.bars.map(d =>
                                <BarItemLabel
                                    {...d}
                                    textColor={getLabelsTextColor(d, theme)}
                                    linkColor={getLabelsLinkColor(d, theme)}
                                />
                            )}
                    </SvgWrapper>
                )
            }}
        </Container>
    )
}

Bar.propTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,

    xPadding: PropTypes.number.isRequired,

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // labels
    enableLabels: PropTypes.bool.isRequired,
    labelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelsTextColor: PropTypes.func.isRequired, // computed
    labelsLinkColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelsLinkColor: PropTypes.func.isRequired, // computed

    // interactions
    onClick: PropTypes.func,

    // theming
    getColor: PropTypes.func.isRequired,

    // interactivity
    isInteractive: PropTypes.bool,
}

export const BarDefaultProps = {
    indexBy: 'id',
    keys: ['value'],

    groupMode: 'stacked',
    layout: 'vertical',

    xPadding: 0.1,

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,

    // labels
    enableLabels: true,
    labelsLinkColor: 'theme',
    labelsTextColor: 'theme',

    // interactivity
    isInteractive: true,
}

Bar.defaultProps = BarDefaultProps

const enhance = compose(
    defaultProps(BarDefaultProps),
    withTheme(),
    withColors(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['indexBy'], ({ indexBy }) => ({
        getIndex: getAccessorFor(indexBy),
    })),
    withPropsOnChange(['labelsTextColor'], ({ labelsTextColor }) => ({
        getLabelsTextColor: getInheritedColorGenerator(labelsTextColor, 'axis.textColor'),
    })),
    withPropsOnChange(['labelsLinkColor'], ({ labelsLinkColor }) => ({
        getLabelsLinkColor: getInheritedColorGenerator(labelsLinkColor, 'axis.tickColor'),
    })),
    pure
)

export default enhance(Bar)
