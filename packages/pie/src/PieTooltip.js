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
import pure from 'recompose/pure'
import { BasicTooltip } from '@nivo/tooltip'

const PieTooltip = ({ data, color, tooltipFormat, tooltip, theme }) => {
    return (
        <BasicTooltip
            id={data.label}
            value={data.value}
            enableChip={true}
            color={color}
            theme={theme}
            format={tooltipFormat}
            renderContent={
                typeof tooltip === 'function' ? tooltip.bind(null, { color, ...data }) : null
            }
        />
    )
}

PieTooltip.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,
    color: PropTypes.string.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,
    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired,
    }).isRequired,
}

export default pure(PieTooltip)
