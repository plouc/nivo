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
import { themePropType } from '@nivo/core'
import { LegendPropShape, BoxLegendSvg } from '@nivo/legends'
import { arcPropType } from './props'

export default function PieLegends(props) {
    const { width, height, legends, theme, arcs } = props

    const data = React.useMemo(
        () =>
            arcs.map(({ color, data, fill }) => {
                const { id, label } = data

                return {
                    id: id,
                    label: label || id,
                    color,
                    fill,
                    data,
                }
            }),
        [arcs]
    )

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

PieLegends.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    arcs: PropTypes.arrayOf(arcPropType).isRequired,
    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
    theme: themePropType.isRequired,
}
