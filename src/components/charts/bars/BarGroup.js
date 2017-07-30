/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import ResponsiveWrapper from '../ResponsiveWrapper'
import SvgWrapper from '../SvgWrapper'
import Nivo, { defaultTheme } from '../../../Nivo'
import { margin as marginPropType } from '../../../PropTypes'
import { getColorRange } from '../../../ColorUtils'
import Bar from './Bars'
import { scalesPropType, scalesFromObject } from '../../../lib/scale'

const MODE_GROUPED = 'group'
const MODE_STACKED = 'stack'

export default class BarGroup extends Component {
    static propTypes = {
        scales: scalesPropType,
        data: PropTypes.arrayOf(PropTypes.object),
        keys: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        ).isRequired,
        mode: PropTypes.oneOf([MODE_GROUPED, MODE_STACKED]).isRequired,
        colors: PropTypes.any.isRequired,
        children: PropTypes.func.isRequired,
        margin: marginPropType,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        mode: 'stack',
        colors: Nivo.defaults.colorRange,
        theme: {},
        children: () => null,
    }

    render() {
        return (
            <ResponsiveWrapper>
                {({ width: _width, height: _height }) => {
                    const {
                        data,
                        margin: _margin,
                        keys,
                        xScale,
                        x,
                        yScale,
                        scales: _scales,
                        colors,
                        children,
                        theme: _theme,
                    } = this.props

                    const margin = Object.assign(
                        {},
                        Nivo.defaults.margin,
                        _margin
                    )
                    const width = _width - margin.left - margin.right
                    const height = _height - margin.top - margin.bottom

                    const theme = _.merge({}, defaultTheme, _theme)
                    const scales = scalesFromObject(
                        _scales,
                        width,
                        height,
                        data
                    )
                    const getColor = getColorRange(colors)

                    const barData = data.map(d =>
                        keys.reduce((acc, key, index) => {
                            let y0 = 0
                            let y1 = d[key]
                            if (index > 0) {
                                y0 = acc[keys[index - 1]][1]
                                y1 += y0
                            }

                            return Object.assign(acc, {
                                [key]: [y0, y1],
                            })
                        }, d)
                    )

                    return (
                        <SvgWrapper
                            width={_width}
                            height={_height}
                            margin={margin}
                        >
                            {children({
                                data,
                                barData,
                                scales,
                                width,
                                height,
                                theme,
                            })}
                            <g className="bar_group">
                                {keys.map(key =>
                                    <Bar
                                        key={key}
                                        data={barData}
                                        xScale={xScale}
                                        x={x}
                                        yScale={yScale}
                                        y={key}
                                        colors={getColor(key)}
                                        scales={scales}
                                        width={width}
                                        height={height}
                                    />
                                )}
                            </g>
                        </SvgWrapper>
                    )
                }}
            </ResponsiveWrapper>
        )
    }
}
