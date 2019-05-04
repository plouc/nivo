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

const Link = ({ sourceX, sourceY, targetX, targetY, thickness, color }) => {
    return (
        <line
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            x1={sourceX}
            y1={sourceY}
            x2={targetX}
            y2={targetY}
        />
    )
}

Link.propTypes = {
    link: PropTypes.object.isRequired,
    sourceX: PropTypes.number.isRequired,
    sourceY: PropTypes.number.isRequired,
    targetX: PropTypes.number.isRequired,
    targetY: PropTypes.number.isRequired,
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
}

export default memo(Link)
