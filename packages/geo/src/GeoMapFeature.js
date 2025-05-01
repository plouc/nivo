import { memo } from 'react'

/**
 * GeoMapFeature.propTypes = {
 *     feature: PropTypes.shape({
 *         id: PropTypes.string.isRequired,
 *         type: PropTypes.oneOf(['Feature']).isRequired,
 *         properties: PropTypes.object,
 *         geometry: PropTypes.object.isRequired,
 *     }).isRequired,
 *     path: PropTypes.func.isRequired,
 *
 *     fillColor: PropTypes.string.isRequired,
 *     borderWidth: PropTypes.number.isRequired,
 *     borderColor: PropTypes.string.isRequired,
 *
 *     onMouseEnter: PropTypes.func.isRequired,
 *     onMouseMove: PropTypes.func.isRequired,
 *     onMouseLeave: PropTypes.func.isRequired,
 *     onClick: PropTypes.func.isRequired,
 * }
 */
const GeoMapFeature = memo(
    ({
        feature,
        path,
        fillColor,
        borderWidth,
        borderColor,
        onClick,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
    }) => {
        return (
            <path
                key={feature.id}
                fill={feature?.fill ?? fillColor}
                strokeWidth={borderWidth}
                stroke={borderColor}
                strokeLinejoin="bevel"
                d={path(feature)}
                onMouseEnter={event => onMouseEnter(feature, event)}
                onMouseMove={event => onMouseMove(feature, event)}
                onMouseLeave={event => onMouseLeave(feature, event)}
                onClick={event => onClick(feature, event)}
            />
        )
    }
)

export default GeoMapFeature
