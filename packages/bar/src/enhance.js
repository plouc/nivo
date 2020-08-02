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
    getAccessorFor,
    getLabelGenerator,
} from '@nivo/core'
import { getOrdinalColorScale, getInheritedColorGenerator } from '@nivo/colors'
import { BarDefaultProps } from './props'

export default Component =>
    compose(
        defaultProps(BarDefaultProps),
        withTheme(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['colors', 'colorBy'], ({ colors, colorBy }) => ({
            getColor: getOrdinalColorScale(colors, colorBy),
        })),
        withPropsOnChange(['indexBy'], ({ indexBy }) => ({
            getIndex: getAccessorFor(indexBy),
        })),
        withPropsOnChange(['labelTextColor', 'theme'], ({ labelTextColor, theme }) => ({
            getLabelTextColor: getInheritedColorGenerator(labelTextColor, theme),
        })),
        withPropsOnChange(['labelLinkColor', 'theme'], ({ labelLinkColor, theme }) => ({
            getLabelLinkColor: getInheritedColorGenerator(labelLinkColor, theme),
        })),
        withPropsOnChange(['label', 'labelFormat'], ({ label, labelFormat }) => ({
            getLabel: getLabelGenerator(label, labelFormat),
        })),
        withPropsOnChange(['borderColor', 'theme'], ({ borderColor, theme }) => ({
            getBorderColor: getInheritedColorGenerator(borderColor, theme),
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
