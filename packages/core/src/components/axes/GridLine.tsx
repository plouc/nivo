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

export interface GridLineProps {
    x1?: number
    x2?: number
    y1?: number
    y2?: number
    [key: string]: any
}

export const GridLine: React.SFC<any> = React.memo(
    ({ x1 = 0, x2 = 0, y1 = 0, y2 = 0, ...rest }) => (
        <line x1={x1} x2={x2} y1={y1} y2={y2} {...rest} />
    )
)

GridLine.propTypes = {
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
}
