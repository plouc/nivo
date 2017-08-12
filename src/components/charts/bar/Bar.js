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
import pure from 'recompose/pure'
import defaultProps from 'recompose/defaultProps'
import compose from 'recompose/compose'
import { withTheme, withColors, withDimensions, withMotion } from '../../../hocs'
import { getInheritedColorGenerator } from '../../../lib/colorUtils'
import { generateGroupedBars, generateStackedBars } from '../../../lib/charts/bar'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import BarItem from './BarItem'
import BarItemLabel from './BarItemLabel'

const Bar = ({
    data,
    groupMode,

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
    labelsLinkColor: _labelsLinkColor,
    labelsTextColor: _labelsTextColor,

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
    const labelsLinkColor = getInheritedColorGenerator(_labelsLinkColor, 'axis.tickColor')
    const labelsTextColor = getInheritedColorGenerator(_labelsTextColor, 'axis.textColor')

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    let result
    if (groupMode === 'grouped') {
        result = generateGroupedBars(data, width, height, getColor, {
            xPadding,
        })
    } else if (groupMode === 'stacked') {
        result = generateStackedBars(data, width, height, getColor, {
            xPadding,
        })
    }

    return (
        <Container isInteractive={isInteractive}>
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
                                    key={d.key}
                                    linkColor={labelsLinkColor(d, theme)}
                                    textColor={labelsTextColor(d, theme)}
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
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,

    groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,

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

    // interactions
    onClick: PropTypes.func,

    // theming
    colors: PropTypes.any.isRequired,
    colorBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getColor: PropTypes.func.isRequired,

    // interactivity
    isInteractive: PropTypes.bool,
}

export const BarDefaultProps = {
    groupMode: 'stacked',
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

    // theming
    colors: 'nivo',
    colorBy: 'serie.id',

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
    pure
)

export default enhance(Bar)
