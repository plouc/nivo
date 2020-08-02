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

const SankeyLinkGradient = memo(({ id, layout, startColor, endColor }) => {
    const gradientProps = {}
    if (layout === 'horizontal') {
        gradientProps.x1 = '0%'
        gradientProps.x2 = '100%'
        gradientProps.y1 = '0%'
        gradientProps.y2 = '0%'
    } else {
        gradientProps.x1 = '0%'
        gradientProps.x2 = '0%'
        gradientProps.y1 = '0%'
        gradientProps.y2 = '100%'
    }

    return (
        <linearGradient id={id} spreadMethod="pad" {...gradientProps}>
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
        </linearGradient>
    )
})

SankeyLinkGradient.propTypes = {
    id: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    startColor: PropTypes.string.isRequired,
    endColor: PropTypes.string.isRequired,
}

SankeyLinkGradient.displayName = 'SankeyLinkGradient'

export default SankeyLinkGradient
