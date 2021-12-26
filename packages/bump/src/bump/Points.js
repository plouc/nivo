import { createElement, memo } from 'react'
import PropTypes from 'prop-types'

const Points = ({ pointComponent, points }) => {
    return points.map(point => {
        return createElement(pointComponent, {
            key: point.id,
            data: point.data,
            x: point.x,
            y: point.y,
            isActive: point.isActive,
            isInactive: point.isInactive,
            size: point.style.size,
            color: point.color,
            borderColor: point.borderColor,
            borderWidth: point.style.borderWidth,
        })
    })
}

Points.propTypes = {
    pointComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    points: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.object.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            isActive: PropTypes.bool.isRequired,
            isInactive: PropTypes.bool.isRequired,
            color: PropTypes.string.isRequired,
            borderColor: PropTypes.string.isRequired,
            style: PropTypes.shape({
                size: PropTypes.number.isRequired,
                borderWidth: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
}

export default memo(Points)
