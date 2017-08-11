import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

const tooltipStyle = {
    display: 'flex',
    alignItems: 'center',
}

const chipStyle = {
    display: 'block',
    width: '16px',
    height: '16px',
    marginRight: '9px',
    borderRadius: '2px',
}

const textStyle = {
    whiteSpace: 'pre',
}

const BasicTooltip = ({ id, value, enableChip, color }) =>
    <div style={tooltipStyle}>
        {enableChip && <span style={{ ...chipStyle, background: color }} />}
        {value !== undefined
            ? <span style={textStyle}>
                  {id}: <strong>{value}</strong>
              </span>
            : <span style={textStyle}>
                  {id}
              </span>}
    </div>

BasicTooltip.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    enableChip: PropTypes.bool.isRequired,
    color: PropTypes.string,
}

BasicTooltip.defaultProps = {
    enableChip: false,
}

export default pure(BasicTooltip)
