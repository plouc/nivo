import { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { animated } from '@react-spring/web'
import { useAnimatedPath } from '@nivo/core'

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
