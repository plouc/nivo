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

const StaticLine = ({
    serie,
    lineGenerator,
    yStep,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}) => {
    const path = useMemo(() => lineGenerator(serie.linePoints), [lineGenerator, serie.linePoints])

    return (
        <>
            <path
                fill="none"
                d={path}
                stroke={serie.color}
                strokeWidth={serie.style.lineWidth}
                strokeLinecap="round"
                strokeOpacity={serie.style.opacity}
                style={{ pointerEvents: 'none' }}
            />
            {isInteractive && (
                <path
                    fill="none"
                    stroke="red"
                    strokeOpacity={0}
                    strokeWidth={yStep}
                    d={path}
                    strokeLinecap="butt"
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                />
            )}
        </>
    )
}

StaticLine.propTypes = {
    serie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        style: PropTypes.shape({
            lineWidth: PropTypes.number.isRequired,
            opacity: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    lineGenerator: PropTypes.func.isRequired,
    yStep: PropTypes.number.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default memo(StaticLine)
