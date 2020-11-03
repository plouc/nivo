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

export const PieTooltip = ({ datum }) => (
    <BasicTooltip
        id={datum.label || datum.id}
        value={datum.formattedValue}
        enableChip={true}
        color={datum.color}
    />
)

PieTooltip.propTypes = {
    datum: PropTypes.object.isRequired,
}

export default PieTooltip
