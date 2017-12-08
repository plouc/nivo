/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *d
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLinear } from 'd3-scale'
import { minBy, maxBy } from 'lodash'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { withTheme, withColors, withDimensions, withMotion } from '@nivo/core'
import { ScatterPlotDefaultProps } from './props'

export const computeScales = ({ data, width, height, scales: _scales }) => {
    const scales = _scales.map(scaleConfig => {
        const { id, axis, domain: [min, max] } = scaleConfig

        let minValue = min
        let maxValue = max

        data.forEach(serie => {
            if (min === 'auto') {
                if (minValue === 'auto') minValue = minBy(serie.data, axis)[axis]
                else minValue = Math.min(minBy(serie.data, axis)[axis], minValue)
            }
            if (max === 'auto') {
                if (maxValue === 'auto') maxValue = maxBy(serie.data, axis)[axis]
                else maxValue = Math.max(maxBy(serie.data, axis)[axis], maxValue)
            }
        })

        const scale = scaleLinear().domain([minValue, maxValue])

        // add `id` property to able to target this scale later
        scale.id = id

        if (axis === 'x') scale.range([0, width])
        else scale.range([height, 0])

        return scale
    })

    return {
        xScale: scales.find(s => s.id === 'x'),
        yScale: scales.find(s => s.id === 'y'),
    }
}

export default Component =>
    compose(
        defaultProps(ScatterPlotDefaultProps),
        withTheme(),
        withColors(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['data', 'width', 'height', 'scales'], computeScales),
        pure
    )(Component)
