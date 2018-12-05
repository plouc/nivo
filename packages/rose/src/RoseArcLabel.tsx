import * as React from 'react'
import * as PropTypes from 'prop-types'
import { radiansToDegrees } from '@nivo/core'
import { ArcPropType } from './props'
import { Arc, InterpolatedArc } from './definitions'

export interface RoseArcLabelProps {
    arc: Arc
    interpolated?: InterpolatedArc
    isAnimated: boolean
    rotate: boolean
    arcGenerator: any
    x: number
    y: number
}

const RoseArcLabel: React.SFC<RoseArcLabelProps> = ({
    isAnimated,
    arc,
    rotate,
    interpolated,
    arcGenerator,
    x,
    y,
}) => {
    let rotation = 0
    if (rotate === true) {
        rotation = radiansToDegrees(arc.midAngle)
    }

    return (
        <g transform={`translate(${x},${y}) rotate(${rotation})`}>
            <text alignmentBaseline="middle" textAnchor="middle">
                {arc.value}
            </text>
        </g>
    )
}

RoseArcLabel.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    rotate: PropTypes.bool.isRequired,
    isAnimated: PropTypes.bool.isRequired,
    arc: ArcPropType.isRequired,
    interpolated: PropTypes.shape({
        startAngle: PropTypes.number.isRequired,
        endAngle: PropTypes.number.isRequired,
        innerRadius: PropTypes.number.isRequired,
        outerRadius: PropTypes.number.isRequired,
    }),
    arcGenerator: PropTypes.func.isRequired,
}

export default RoseArcLabel
