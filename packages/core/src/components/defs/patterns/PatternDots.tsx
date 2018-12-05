/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'

export interface PatternDotsProps {
    id: string
    color?: string
    background: string
    size?: number
    padding?: number
    stagger?: boolean
}

export const PatternDots: React.SFC<PatternDotsProps> = React.memo(
    ({ id, background, color = '#000000', size = 4, padding = 4, stagger = false }) => {
        let fullSize = size + padding
        const radius = size / 2
        const halfPadding = padding / 2
        if (stagger === true) {
            fullSize = size * 2 + padding * 2
        }

        return (
            <pattern id={id} width={fullSize} height={fullSize} patternUnits="userSpaceOnUse">
                <rect width={fullSize} height={fullSize} fill={background} />
                <circle
                    cx={halfPadding + radius}
                    cy={halfPadding + radius}
                    r={radius}
                    fill={color}
                />
                {stagger && (
                    <circle
                        cx={padding * 1.5 + size + radius}
                        cy={padding * 1.5 + size + radius}
                        r={radius}
                        fill={color}
                    />
                )}
            </pattern>
        )
    }
)

PatternDots.propTypes = {
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,
    stagger: PropTypes.bool.isRequired,
}

export const patternDotsDef = (id, options = {}) => ({
    id,
    type: 'patternDots',
    ...options,
})
