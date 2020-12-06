import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import { useMotionConfig } from '@nivo/core'
import ChordArc from './ChordArc'

const ChordArcs = memo(
    ({
        arcs,
        borderWidth,
        getBorderColor,
        getOpacity,
        arcGenerator,
        setCurrent,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    }) => {
        const { animate, springConfig: _springConfig } = useMotionConfig()

        if (animate !== true) {
            return arcs.map(arc => {
                return (
                    <ChordArc
                        key={arc.id}
                        arc={arc}
                        arcGenerator={arcGenerator}
                        startAngle={arc.startAngle}
                        endAngle={arc.endAngle}
                        color={arc.color}
                        opacity={getOpacity(arc)}
                        borderWidth={borderWidth}
                        getBorderColor={getBorderColor}
                        getOpacity={getOpacity}
                        isInteractive={isInteractive}
                        setCurrent={setCurrent}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        onClick={onClick}
                        tooltip={tooltip}
                    />
                )
            })
        }

        const springConfig = {
            ..._springConfig,
            precision: 0.001,
        }

        return (
            <TransitionMotion
                styles={arcs.map(arc => {
                    return {
                        key: arc.id,
                        data: arc,
                        style: {
                            startAngle: spring(arc.startAngle, springConfig),
                            endAngle: spring(arc.endAngle, springConfig),
                            opacity: spring(getOpacity(arc), springConfig),
                            ...interpolateColor(arc.color, springConfig),
                        },
                    }
                })}
            >
                {interpolatedStyles => (
                    <>
                        {interpolatedStyles.map(({ key, style, data: arc }) => {
                            const color = getInterpolatedColor(style)

                            return (
                                <ChordArc
                                    key={key}
                                    arc={arc}
                                    arcGenerator={arcGenerator}
                                    startAngle={style.startAngle}
                                    endAngle={style.endAngle}
                                    color={color}
                                    opacity={style.opacity}
                                    borderWidth={borderWidth}
                                    getBorderColor={getBorderColor}
                                    getOpacity={getOpacity}
                                    isInteractive={isInteractive}
                                    setCurrent={setCurrent}
                                    onMouseEnter={onMouseEnter}
                                    onMouseMove={onMouseMove}
                                    onMouseLeave={onMouseLeave}
                                    onClick={onClick}
                                    tooltip={tooltip}
                                />
                            )
                        })}
                    </>
                )}
            </TransitionMotion>
        )
    }
)

ChordArcs.displayName = 'ChordArcs'
ChordArcs.propTypes = {
    arcs: PropTypes.array.isRequired,
    arcGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    getOpacity: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
}

export default ChordArcs
