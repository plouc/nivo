/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { BasicTooltip } from '@nivo/tooltip'

const ChoroplethTooltip = memo(({ feature }) => {
    if (feature.data === undefined) return null

    return (
        <BasicTooltip
            id={feature.label}
            color={feature.color}
            enableChip={true}
            value={feature.formattedValue}
        />
    )
})

ChoroplethTooltip.propTypes = {
    feature: PropTypes.object.isRequired,
}

ChoroplethTooltip.displayName = 'ChoroplethTooltip'

export default ChoroplethTooltip
