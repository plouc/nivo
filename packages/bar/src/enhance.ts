/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *d
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { compose, defaultProps, withPropsOnChange, pure, setDisplayName } from 'recompose'
import {
    withTheme,
    withColors,
    withDimensions,
    withMotion,
    getInheritedColorGenerator,
    getAccessorFor,
    getLabelGenerator,
} from '@nivo/core'
import { BarDefaultProps, BarOuterProps, BarProps } from './props'

export default <Datum>(Component): React.ComponentClass<BarOuterProps<Datum>> =>
    compose<BarOuterProps<Datum>, BarProps<Datum>>(
        defaultProps(BarDefaultProps),
        withTheme(),
        withColors(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['indexBy'], ({ indexBy }) => ({
            getIndex: getAccessorFor(indexBy),
        })),
        withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
            getLabelTextColor: getInheritedColorGenerator(labelTextColor, 'axis.ticks.text.fill'),
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
        pure,
        setDisplayName(Component.displayName)
    )(Component)
