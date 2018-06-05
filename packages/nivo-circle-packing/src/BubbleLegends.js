/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import omit from 'lodash/omit'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import setDisplayName from 'recompose/setDisplayName'
import PropTypes from 'prop-types'
import { BoxStackedSizeLegendSvg } from '@nivo/legends'

class BubbleLegends extends Component {
    static propTypes = {
        containerWidth: PropTypes.number.isRequired,
        containerHeight: PropTypes.number.isRequired,
        sizeScale: PropTypes.func.isRequired,
        legends: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.shape({
                    type: PropTypes.oneOf(['stackedSize']).isRequired,
                    anchor: PropTypes.string.isRequired,
                    itemCount: PropTypes.number,
                    values: PropTypes.arrayOf(PropTypes.number),
                    clampSizes: PropTypes.arrayOf(PropTypes.number),
                    data: PropTypes.arrayOf(
                        PropTypes.shape({
                            value: PropTypes.number.isRequired,
                            size: PropTypes.number.isRequired,
                            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                                .isRequired,
                        })
                    ),
                }),
            ])
        ).isRequired,
    }

    render() {
        const { containerWidth, containerHeight, legends } = this.props

        if (legends.length === 0) return null

        return (
            <Fragment>
                {legends.map((legend, i) => {
                    if (legend.type === 'stackedSize') {
                        return (
                            <BoxStackedSizeLegendSvg
                                key={i}
                                containerWidth={containerWidth}
                                containerHeight={containerHeight}
                                {...omit(legend, ['type', 'itemCount', 'values', 'clampSizes'])}
                            />
                        )
                    }

                    return null
                })}
            </Fragment>
        )
    }
}

export const enhance = Component =>
    compose(
        defaultProps({
            legends: [],
        }),
        withPropsOnChange(['legends', 'sizeScale'], ({ legends, sizeScale }) => ({
            legends: legends.map(legend => {
                if (legend.type === 'stackedSize') {
                    // user defined data
                    if (legend.data !== undefined) {
                        return legend
                    }

                    // auto compute data using itemCount without clamping size
                    if (legend.itemCount !== undefined && legend.clampSizes === undefined) {
                        const data = sizeScale.ticks(legend.itemCount).map(value => ({
                            value,
                            size: sizeScale(value),
                            label: value,
                        }))

                        return { ...legend, data }
                    }

                    // auto compute data using itemCount with size clamping
                    if (legend.itemCount !== undefined && legend.clampSizes !== undefined) {
                        const minValue = sizeScale.invert(legend.clampSizes[0])
                        const maxValue = sizeScale.invert(legend.clampSizes[1])
                        const clampedScale = sizeScale
                            .copy()
                            .domain([minValue, maxValue])
                            .rangeRound([legend.clampSizes[0], legend.clampSizes[1]])

                        const data = clampedScale.ticks(legend.itemCount).map(value => ({
                            value,
                            size: clampedScale(value),
                            label: value,
                        }))

                        return { ...legend, data }
                    }

                    // compute data using user provided values
                    if (legend.values !== undefined) {
                        const data = legend.values.map(value => ({
                            value,
                            size: sizeScale(value),
                            label: value,
                        }))

                        return { ...legend, data }
                    }

                    throw new Error(
                        `Unable to determine 'stackedSize' legend, please define one of 'data', 'itemCount', 'values'.`
                    )
                }

                return legend
            }),
        })),
        pure
    )(Component)

export default setDisplayName('BubbleLegends')(enhance(BubbleLegends))
