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
import { TableTooltip } from '@nivo/tooltips'

const Chip = ({ color }) => (
    <span style={{ display: 'block', width: '12px', height: '12px', background: color }} />
)

const StackedTooltip = ({ points, theme }) => {
    console.log(points)
    return (
        <TableTooltip
            theme={theme}
            rows={points.map(p => [
                    <Chip color={p.color} />,
                    p.id,
                    format ? format(p.value) : p.value,
                ])}
        />
    )
}

StackedTooltip.propTypes = {
    theme: PropTypes.object.isRequired,
}

export default StackedTooltip
