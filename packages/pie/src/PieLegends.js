/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { LegendPropShape, BoxLegendSvg } from '@nivo/legends'
import { datumWithArcPropType } from './props'

export default function PieLegends(props) {
    const { width, height, legends, dataWithArc } = props

    return legends.map((legend, i) => (
        <BoxLegendSvg
            key={i}
            {...legend}
            containerWidth={width}
            containerHeight={height}
            data={dataWithArc}
        />
    ))
}

PieLegends.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    dataWithArc: PropTypes.arrayOf(datumWithArcPropType).isRequired,
    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}
