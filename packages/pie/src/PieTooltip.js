/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { datumWithArcPropType, PiePropTypes } from './props'

export const PieTooltip = ({ datum, tooltipFormat, tooltip }) => {
    return (
        <BasicTooltip
            id={datum.label || datum.id}
            value={datum.formattedValue}
            enableChip={true}
            color={datum.color}
            format={tooltipFormat}
            renderContent={typeof tooltip === 'function' ? tooltip.bind(null, datum) : null}
        />
    )
}

PieTooltip.propTypes = {
    datum: datumWithArcPropType.isRequired,
    tooltipFormat: PiePropTypes.tooltipFormat,
    tooltip: PiePropTypes.tooltip,
}

export default PieTooltip
