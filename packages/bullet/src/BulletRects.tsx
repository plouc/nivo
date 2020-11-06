import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
// @ts-ignore
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import { computeRects } from './compute'
import { BulletRectsProps, ComputedRangeDatum } from './types'

type MouseEventWithDatum = (
    datum: ComputedRangeDatum,
    event: React.MouseEvent<SVGRectElement, MouseEvent>
) => void

type EventHandlers = Record<'onMouseEnter' | 'onMouseLeave' | 'onClick', MouseEventWithDatum>

export const BulletRects = ({
    data,
    layout,
    y,
    component,
    animate,
    motionStiffness,
    motionDamping,
    reverse,
    scale,
    height,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: BulletRectsProps & EventHandlers) => {
    const rects = computeRects({
        data,
        layout,
        reverse,
        scale,
        height,
    })

    const transform = `translate(${layout === 'horizontal' ? 0 : y},${
        layout === 'horizontal' ? y : 0
    })`

    if (animate !== true) {
        return (
            <g transform={transform}>
                {rects.map(rect =>
                    React.createElement(component, {
                        key: rect.data.index,
                        index: rect.data.index,
                        color: rect.data.color,
                        ...rect,
                        onMouseEnter: event => onMouseEnter(rect.data, event),
                        onMouseMove: event => onMouseEnter(rect.data, event),
                        onMouseLeave: event => onMouseLeave(rect.data, event),
                        onClick: event => onClick(rect.data, event),
                    })
                )}
            </g>
        )
    }

    const springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    return (
        <g transform={transform}>
            <TransitionMotion
                styles={rects.map(rect => ({
                    key: `${rect.data.index}`,
                    data: rect.data,
                    style: {
                        x: spring(rect.x, springConfig),
                        y: spring(rect.y, springConfig),
                        width: spring(rect.width, springConfig),
                        height: spring(rect.height, springConfig),
                        ...interpolateColor(rect.data.color, springConfig),
                    },
                }))}
            >
                {interpolatedStyles => (
                    <>
                        {interpolatedStyles.map(({ key, style, data }) => {
                            const color = getInterpolatedColor(style)

                            return React.createElement(component, {
                                key,
                                index: Number(key),
                                data,
                                x: style.x,
                                y: style.y,
                                width: Math.max(style.width, 0),
                                height: Math.max(style.height, 0),
                                color,
                                onMouseEnter: event => onMouseEnter(data, event),
                                onMouseMove: event => onMouseEnter(data, event),
                                onMouseLeave: event => onMouseLeave(data, event),
                                onClick: event => onClick(data, event),
                            })
                        })}
                    </>
                )}
            </TransitionMotion>
        </g>
    )
}
