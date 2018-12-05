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
import { ArcPropType } from './props'
import { Arc, InterpolatedArc } from './definitions'

interface RoseArcProps {
    arc: Arc
    interpolated?: InterpolatedArc
    isAnimated: boolean
    arcGenerator: any
    borderWidth: number
}

const RoseArc: React.SFC<RoseArcProps> = ({
    arc,
    interpolated,
    isAnimated,
    arcGenerator,
    borderWidth,
}) => {
    const arcProps = isAnimated ? interpolated : arc

    return (
        <path
            key={arc.id}
            d={arcGenerator(arcProps)}
            fill={arc.color}
            stroke={'white'}
            strokeWidth={borderWidth}
            onClick={() => {
                console.log(arc)
            }}
        />
    )
}

RoseArc.propTypes = {
    isAnimated: PropTypes.bool.isRequired,
    arc: ArcPropType.isRequired,
    interpolated: PropTypes.shape({
        startAngle: PropTypes.number.isRequired,
        endAngle: PropTypes.number.isRequired,
        innerRadius: PropTypes.number.isRequired,
        outerRadius: PropTypes.number.isRequired,
    }),
    arcGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
}

export default RoseArc
