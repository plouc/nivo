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
import { LegendPropShape, BoxLegendSvg } from '@nivo/legends'
import { arcPropType } from './props'

class PieLegends extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        arcs: PropTypes.arrayOf(arcPropType).isRequired,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                color: PropTypes.string.isRequired,
                fill: PropTypes.string,
            })
        ).isRequired,
        legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
    }

    render() {
        const { width, height, legends, data } = this.props

        return legends.map((legend, i) => (
            <BoxLegendSvg
                key={i}
                {...legend}
                containerWidth={width}
                containerHeight={height}
                data={data}
            />
        ))
    }
}

export const enhance = Component =>
    compose(
        withPropsOnChange(['arcs'], ({ arcs }) => ({
            data: arcs.map(arc => ({
                id: arc.data.id,
                label: arc.data.id,
                color: arc.color,
                fill: arc.fill,
            })),
        })),
        pure
    )(Component)

export default setDisplayName('PieLegends')(enhance(PieLegends))
