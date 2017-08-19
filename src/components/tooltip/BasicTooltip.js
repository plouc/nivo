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
import pure from 'recompose/pure'
import Chip from './Chip'

const tooltipStyle = {
    display: 'flex',
    alignItems: 'center',
}

const textStyle = {
    whiteSpace: 'pre',
    marginLeft: 7,
}

const BasicTooltip = ({ id, value, enableChip, color }) =>
    <div style={tooltipStyle}>
        {enableChip && <Chip color={color} />}
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
