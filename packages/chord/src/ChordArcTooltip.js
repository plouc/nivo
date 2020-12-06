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
