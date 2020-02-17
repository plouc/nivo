import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { arc as d3Arc } from 'd3-shape'
import RadarInnerGridItem from './RadarInnerGridItem'

const RadarInnerGrid = memo(
    ({ data, keys, getIndex, colorByKey, radius, angleStep, tooltipFormat }) => {
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
                            datum={d}
                            keys={keys}
                            index={index}
                            colorByKey={colorByKey}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            radius={radius}
                            arcGenerator={arc}
                            tooltipFormat={tooltipFormat}
                        />
                    )
                })}
            </g>
        )
    }
)

RadarInnerGrid.displayName = 'RadarTooltip'
RadarInnerGrid.propTypes = {
    data: PropTypes.array.isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    getIndex: PropTypes.func.isRequired,
    colorByKey: PropTypes.object.isRequired,

    radius: PropTypes.number.isRequired,
    angleStep: PropTypes.number.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export default RadarInnerGrid
