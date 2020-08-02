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
import { BasicTooltip } from '@nivo/tooltip'

const ScatterPlotTooltip = ({ point: { data }, color, format, theme, tooltip }) => (
    <BasicTooltip
        id={data.serie.id}
        value={`x: ${data.x}, y: ${data.y}`}
        enableChip={true}
        color={color}
        theme={theme}
        format={format}
        renderContent={
            typeof tooltip === 'function' ? tooltip.bind(null, { color, ...data }) : null
        }
    />
)

ScatterPlotTooltip.propTypes = {
    point: PropTypes.shape({
        data: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
                .isRequired,
            y: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
                .isRequired,
            serie: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }).isRequired,
        }).isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    color: PropTypes.string.isRequired,
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    tooltip: PropTypes.func,
    theme: PropTypes.object.isRequired,
}

export default ScatterPlotTooltip
