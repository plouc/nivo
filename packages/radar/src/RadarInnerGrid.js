import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { arc as d3Arc } from 'd3-shape'
import RadarInnerGridItem from './RadarInnerGridItem'

const RadarInnerGrid = memo(({ data, getIndex, radius, angleStep }) => {
    const arc = d3Arc()
        .outerRadius(radius)
        .innerRadius(0)

    const halfAngleStep = angleStep * 0.5
    let rootStartAngle = -halfAngleStep

    return (
        <g>
            {data.map(d => {
                const index = getIndex(d)
                const startAngle = rootStartAngle
                const endAngle = startAngle + angleStep

                rootStartAngle += angleStep

                return (
                    <RadarInnerGridItem
                        key={index}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        radius={radius}
                        arcGenerator={arc}
                    />
                )
            })}
        </g>
    )
})

RadarInnerGrid.displayName = 'RadarInnerGrid'
RadarInnerGrid.propTypes = {
    data: PropTypes.array.isRequired,
    getIndex: PropTypes.func.isRequired,

    radius: PropTypes.number.isRequired,
    angleStep: PropTypes.number.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export default RadarInnerGrid
