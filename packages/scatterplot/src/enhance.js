/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { withTheme, withColors, withDimensions, withMotion } from '@nivo/core'
import { computeXYScalesForSeries } from '@nivo/scales'
import { getAccessorOrValue } from '@nivo/core'
import { ScatterPlotDefaultProps } from './props'

export default Component =>
    compose(
        defaultProps(ScatterPlotDefaultProps),
        withTheme(),
        withColors(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['symbolSize'], ({ symbolSize }) => ({
            getSymbolSize: getAccessorOrValue(symbolSize),
        })),
        withPropsOnChange(
            ['data', 'xScale', 'yScale', 'width', 'height'],
            ({ data, xScale, yScale, width, height }) => ({
                computedData: computeXYScalesForSeries(data, xScale, yScale, width, height),
            })
        ),
        pure
    )(Component)
