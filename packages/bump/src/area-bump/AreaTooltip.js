import { memo } from 'react'
import PropTypes from 'prop-types'
import { BasicTooltip } from '@nivo/tooltip'

const AreaTooltip = ({ serie }) => {
    return <BasicTooltip id={serie.id} enableChip={true} color={serie.color} />
}

AreaTooltip.propTypes = {
    serie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }),
}

export default memo(AreaTooltip)
