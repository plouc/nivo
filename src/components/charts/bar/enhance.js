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
import { withTheme, withColors, withDimensions, withMotion } from '../../../hocs'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import { BarDefaultProps } from './props'

export default Component =>
    compose(
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
    )(Component)
