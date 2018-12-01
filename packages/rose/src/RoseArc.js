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

const RoseArc = ({ arc, arcGenerator, borderWidth }) => {
    return (
        <path
            key={arc.id}
            d={arcGenerator(arc)}
            fill={arc.color}
            stroke={'white'}
            strokeWidth={borderWidth}
            onClick={() => {
                console.log(arc)
            }}
        />
    )
}

RoseArc.propTypes = {
    arc: PropTypes.shape({
        color: PropTypes.string.isRequired,
    }).isRequired,
    arcGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
}

export default RoseArc
