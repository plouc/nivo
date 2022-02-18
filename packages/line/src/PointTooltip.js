import { memo } from 'react'
import PropTypes from 'prop-types'
import { BasicTooltip } from '@nivo/tooltip'

const LinePointTooltip = ({ point }) => {
    return (
        <BasicTooltip
            id={
                <span>
                    x: <strong>{point.data.xFormatted}</strong>, y:{' '}
                    <strong>{point.data.yFormatted}</strong>
                </span>
            }
            enableChip={true}
            color={point.serieColor}
        />
    )
}

LinePointTooltip.propTypes = {
    point: PropTypes.object.isRequired,
}

export default memo(LinePointTooltip)
