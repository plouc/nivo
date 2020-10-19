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
import { animated } from 'react-spring'
import { useTheme } from '@nivo/core'

const GridLine = ({ animatedProps }) => {
    const theme = useTheme()

    return <animated.line {...animatedProps} {...theme.grid.line} />
}

GridLine.propTypes = {
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
    animatedProps: PropTypes.object.isRequired,
}
GridLine.defaultProps = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
}

export default memo(GridLine)
