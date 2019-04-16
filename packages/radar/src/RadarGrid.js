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
import range from 'lodash/range'
import { motionPropTypes, positionFromAngle, useTheme } from '@nivo/core'
import RadialGridLabels from './RadarGridLabels'
import RadarGridLevels from './RadarGridLevels'

const RadarGrid = memo(
    ({
        indices,
        levels,
        shape,
        radius,
        angleStep,
        label,
        labelOffset,
        animate,
        motionStiffness,
        motionDamping,
    }) => {
        const theme = useTheme()
        const { radii, angles } = useMemo(() => {
            return {
                radii: range(levels)
                    .map(i => (radius / levels) * (i + 1))
                    .reverse(),
                angles: range(indices.length).map(i => i * angleStep - Math.PI / 2),
            }
        }, [indices, levels, radius, angleStep])

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
)

RadarGrid.displayName = 'RadarGrid'
RadarGrid.propTypes = {
    indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        .isRequired,
    shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
    radius: PropTypes.number.isRequired,
    angleStep: PropTypes.number.isRequired,
    label: PropTypes.func,
    labelOffset: PropTypes.number.isRequired,
    ...motionPropTypes,
}

export default RadarGrid
