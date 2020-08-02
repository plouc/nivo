/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import setDisplayName from 'recompose/setDisplayName'
import { themePropType } from '@nivo/core'
import { LegendPropShape, BoxLegendSvg } from '@nivo/legends'
import { arcPropType } from './props'

class PieLegends extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        arcs: PropTypes.arrayOf(arcPropType).isRequired,
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
        theme: themePropType.isRequired,
    }

    render() {
        const { width, height, legends, data, theme } = this.props

        return legends.map((legend, i) => (
            <BoxLegendSvg
                key={i}
                {...legend}
                containerWidth={width}
                containerHeight={height}
                data={data}
                theme={theme}
            />
        ))
    }
}

export const enhance = Component =>
    compose(
        withPropsOnChange(['arcs'], ({ arcs }) => ({
            data: arcs.map(({ color, data: { id, label }, fill }) => ({
                id: id,
                label: label || id,
                color,
                fill,
            })),
        })),
        pure
    )(Component)

export default setDisplayName('PieLegends')(enhance(PieLegends))
