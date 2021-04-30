/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { useSpring, animated } from 'react-spring'
import { useMotionConfig } from '@bitbloom/nivo-core'
=======
import { animated } from 'react-spring'
import { useAnimatedPath } from '@bitbloom/nivo-core'
>>>>>>> 53b9c1cc7b439d550e8c2084bbd420c334082881

const LinesItem = ({ lineGenerator, points, color, thickness }) => {
    const path = useMemo(() => lineGenerator(points), [lineGenerator, points])
    const animatedPath = useAnimatedPath(path)

    return <animated.path d={animatedPath} fill="none" strokeWidth={thickness} stroke={color} />
}

LinesItem.propTypes = {
    points: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    lineGenerator: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    thickness: PropTypes.number.isRequired,
}

export default memo(LinesItem)
