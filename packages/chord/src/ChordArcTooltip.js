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

const ChordArcTooltip = memo(({ arc }) => {
    return (
        <BasicTooltip
            id={arc.label}
            value={arc.formattedValue}
            color={arc.color}
            enableChip={true}
        />
    )
})

ChordArcTooltip.displayName = 'ChordArcTooltip'
ChordArcTooltip.propTypes = {
    arc: PropTypes.object.isRequired,
}

export default ChordArcTooltip
