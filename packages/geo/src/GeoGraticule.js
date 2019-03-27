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

const GeoGraticule = memo(({ path, graticule, lineWidth, lineColor }) => {
    return <path fill="none" strokeWidth={lineWidth} stroke={lineColor} d={path(graticule())} />
})

GeoGraticule.propTypes = {
    path: PropTypes.func.isRequired,
    graticule: PropTypes.func.isRequired,
    lineWidth: PropTypes.number.isRequired,
    lineColor: PropTypes.string.isRequired,
}

GeoGraticule.displayName = 'GeoGraticule'

export default GeoGraticule
