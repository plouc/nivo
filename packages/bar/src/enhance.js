/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *d
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { compose } from 'recompose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import {
    withTheme,
    withDimensions,
    withMotion,
    getInheritedColorGenerator,
    getAccessorFor,
    getLabelGenerator,
} from '@nivo/core'
import { getOrdinalColorScale } from '@nivo/colors'
import { BarDefaultProps } from './props'

export default Component =>
    compose(
        defaultProps(BarDefaultProps),
        withTheme(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['colors'], ({ colors }) => ({
            getColor: getOrdinalColorScale(colors, 'id'),
        })),
        withPropsOnChange(['indexBy'], ({ indexBy }) => ({
            getIndex: getAccessorFor(indexBy),
        })),
        withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
            getLabelTextColor: getInheritedColorGenerator(labelTextColor, 'axis.ticks.text.fill'),
        })),
        withPropsOnChange(['labelLinkColor'], ({ labelLinkColor }) => ({
            getLabelLinkColor: getInheritedColorGenerator(labelLinkColor, 'axis.ticks.line.stroke'),
        })),
        withPropsOnChange(['label', 'labelFormat'], ({ label, labelFormat }) => ({
            getLabel: getLabelGenerator(label, labelFormat),
        })),
        withPropsOnChange(['borderColor'], ({ borderColor }) => ({
            getBorderColor: getInheritedColorGenerator(borderColor),
        })),
        withPropsOnChange(['tooltipLabel'], ({ tooltipLabel }) => {
            let getTooltipLabel = d => `${d.id} - ${d.indexValue}`
            if (typeof tooltipLabel === 'function') {
                getTooltipLabel = tooltipLabel
            }

            return { getTooltipLabel }
        }),
        pure
    )(Component)
