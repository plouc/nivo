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
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'
import { scaleQuantize } from 'd3-scale'
import { withTheme, withDimensions } from '@nivo/core'
import { CalendarDefaultProps } from './props'

export default Component =>
    compose(
        defaultProps(CalendarDefaultProps),
        withTheme(),
        withDimensions(),
        withPropsOnChange(['data', 'domain', 'colors'], ({ data, domain, colors }) => {
            let colorDomain
            if (domain === 'auto') {
                if (data.length === 0) {
                    colorDomain = [0, 0]
                } else {
                    colorDomain = [minBy(data, 'value').value, maxBy(data, 'value').value]
                }        
            } else {
                colorDomain = [...domain]
            }

            const colorScale = scaleQuantize()
                .domain(colorDomain)
                .range(colors)

            return { colorScale }
        }),
        pure
    )(Component)
