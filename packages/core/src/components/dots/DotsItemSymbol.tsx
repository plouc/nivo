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

export interface DotsItemSymbolProps {
    size: number
    color: string
    borderWidth: number
    borderColor: string
}

const DotsItemSymbol: React.SFC<DotsItemSymbolProps> = React.memo(
    ({ size, color, borderWidth, borderColor }) => (
        <circle
            r={size / 2}
            fill={color}
            stroke={borderColor}
            strokeWidth={borderWidth}
            style={{ pointerEvents: 'none' }}
        />
    )
)

export default DotsItemSymbol

DotsItemSymbol.propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
}
