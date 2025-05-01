import { memo } from 'react'

/**
 * GeoGraticule.propTypes = {
 *     path: PropTypes.func.isRequired,
 *     graticule: PropTypes.func.isRequired,
 *     lineWidth: PropTypes.number.isRequired,
 *     lineColor: PropTypes.string.isRequired,
 * }
 */
const GeoGraticule = memo(({ path, graticule, lineWidth, lineColor }) => {
    return <path fill="none" strokeWidth={lineWidth} stroke={lineColor} d={path(graticule())} />
})

export default GeoGraticule
