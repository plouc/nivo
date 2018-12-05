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
import { Defs } from './defs'
import { themePropType, Theme } from '../theming'

export interface SvgWrapperProps {
    width: number
    height: number
    margin: {
        top?: number
        right?: number
        left?: number
        bottom?: number
    }
    defs?: any[]
    children: React.ReactNode | React.ReactNodeArray
    theme: Partial<Theme>
}

const SvgWrapper: React.SFC<SvgWrapperProps> = ({
    width,
    height,
    margin,
    defs,
    children,
    theme,
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" width={width} height={height}>
        <Defs defs={defs} />
        <rect width={width} height={height} fill={theme.background} />
        <g transform={`translate(${margin.left},${margin.top})`}>{children}</g>
    </svg>
)

SvgWrapper.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.shape({
        top: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
        bottom: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }).isRequired,
    defs: PropTypes.array,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    theme: themePropType.isRequired,
}

export default SvgWrapper
