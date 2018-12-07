/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as PropTypes from 'prop-types'

export interface SymbolProps {
    x: number
    y: number
    size: number
    fill: string
    borderWidth?: number
    borderColor?: string
}

export const symbolPropTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
}

export const symbolDefaultProps = {
    borderWidth: 0,
    borderColor: 'transparent',
}
