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
import { useSpring, animated, config } from 'react-spring'

export const Part = ({ part, areaGenerator, borderGenerator, setCurrentPartId }) => {
    const animatedProps = useSpring({
        areaPath: areaGenerator(part.areaPoints),
        areaColor: part.color,
        borderPath: borderGenerator(part.borderPoints),
        borderColor: part.borderColor,
        config: config.wobbly,
    })

    return (
        <>
            {part.borderWidth > 0 && (
                <animated.path
                    d={animatedProps.borderPath}
                    stroke={animatedProps.borderColor}
                    strokeWidth={part.borderWidth}
                    strokeOpacity={part.borderOpacity}
                    fill="none"
                />
            )}
            <animated.path
                d={animatedProps.areaPath}
                fill={animatedProps.areaColor}
                fillOpacity={part.fillOpacity}
                onMouseEnter={() => {
                    setCurrentPartId(part.data.id)
                }}
                onMouseLeave={() => {
                    setCurrentPartId(null)
                }}
            />
        </>
    )
}

Part.propTypes = {
    part: PropTypes.shape({
        areaPoints: PropTypes.array.isRequired,
        borderPoints: PropTypes.array.isRequired,
        color: PropTypes.string.isRequired,
        fillOpacity: PropTypes.number.isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.string.isRequired,
        borderOpacity: PropTypes.number.isRequired,
    }).isRequired,
    areaGenerator: PropTypes.func.isRequired,
    borderGenerator: PropTypes.func.isRequired,
}
