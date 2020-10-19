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

const PartTooltip = memo(({ part }) => {
    return (
        <BasicTooltip
            id={part.data.label}
            value={part.formattedValue}
            color={part.color}
            enableChip={true}
        />
    )
})

PartTooltip.displayName = 'ChordArcTooltip'
PartTooltip.propTypes = {
    part: PropTypes.object.isRequired,
}

export default PartTooltip
