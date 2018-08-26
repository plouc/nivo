/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { motionPropTypes } from '@nivo/core'
import { positionFromAngle } from '@nivo/core'
import RadialGridLabels from './RadarGridLabels'
import RadarGridLevels from './RadarGridLevels'

const RadarGrid = ({
    indices,
    shape,
    radius,
    radii,
    angles,
    angleStep,
    label,
    labelOffset,
    theme,
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    return (
        <g>
            {angles.map((angle, i) => {
                const position = positionFromAngle(angle, radius)
                return (
                    <line
                        key={`axis.${i}`}
                        x1={0}
                        y1={0}
                        x2={position.x}
                        y2={position.y}
                        {...theme.grid}
                    />
                )
            })}
            <RadarGridLevels
                shape={shape}
                radii={radii}
                angleStep={angleStep}
                dataLength={indices.length}
                theme={theme}
                {...motionProps}
            />
            <RadialGridLabels
                radius={radius}
                angles={angles}
                indices={indices}
                labelOffset={labelOffset}
                theme={theme}
                label={label}
                {...motionProps}
            />
        </g>
    )
}

RadarGrid.propTypes = {
    indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        .isRequired,
    shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
    radius: PropTypes.number.isRequired,
    angleStep: PropTypes.number.isRequired,
    label: PropTypes.func,
    labelOffset: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    ...motionPropTypes,
}

const enhance = compose(
    withPropsOnChange(['indices', 'levels', 'radius', 'angleStep'], props => ({
        radii: range(props.levels)
            .map(i => (props.radius / props.levels) * (i + 1))
            .reverse(),
        angles: range(props.indices.length).map(i => i * props.angleStep - Math.PI / 2),
    })),
    pure
)

export default enhance(RadarGrid)
