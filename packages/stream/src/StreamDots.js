/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '@nivo/core'

const getDotY = (datum, position) => {
    let y = datum.y2
    if (position === 'center') {
        y = datum.y1 + (datum.y2 - datum.y1) / 2
    } else if (position === 'start') {
        y = datum.y1
    }

    return y
}

const StreamDots = ({
    id,
    color,
    data,

    renderDot,

    position,
    getSize,
    getColor,
    getBorderWidth,
    getBorderColor,

    animate,
    motionStiffness,
    motionDamping,
}) => {
    if (animate !== true) {
        return data.map((d, i) => {
            const datum = { ...d, key: id, color }

            return (
                <Fragment key={i}>
                    {renderDot({
                        data: datum,
                        x: datum.x,
                        y: getDotY(datum, position),
                        size: getSize(datum),
                        color: getColor(datum),
                        borderWidth: getBorderWidth(datum),
                    })}
                </Fragment>
            )
        })
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <TransitionMotion
            styles={data.map((d, i) => {
                const datum = { ...d, key: id, color }

                return {
                    key: `${i}`,
                    data: datum,
                    style: {
                        x: spring(datum.x, springConfig),
                        y: spring(getDotY(datum, position), springConfig),
                        size: spring(getSize(datum), springConfig),
                        borderWidth: spring(getBorderWidth(datum), springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <Fragment>
                    {interpolatedStyles.map(({ key, style, data: datum }) => (
                        <Fragment key={key}>
                            {renderDot({
                                data: datum,
                                x: style.x,
                                y: style.y,
                                size: style.size,
                                color: getColor(datum),
                                borderWidth: style.borderWidth,
                                borderColor: getBorderColor(datum),
                            })}
                        </Fragment>
                    ))}
                </Fragment>
            )}
        </TransitionMotion>
    )
}

StreamDots.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y1: PropTypes.number.isRequired,
            y2: PropTypes.number.isRequired,
        })
    ).isRequired,
    renderDot: PropTypes.func.isRequired,
    position: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
    getSize: PropTypes.func.isRequired,
    getColor: PropTypes.func.isRequired,
    getBorderWidth: PropTypes.func.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    ...motionPropTypes,
}

const enhance = compose(pure)

export default enhance(StreamDots)
