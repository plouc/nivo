import React, { Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'
// @ts-ignore
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import { partial } from 'lodash'
import { BulletMarkersProps, ComputedMarkersDatum } from './types'

type MouseEventWithDatum = (
    datum: ComputedMarkersDatum,
    event: React.MouseEvent<SVGLineElement, MouseEvent>
) => void

type EventHandlers = Record<'onMouseEnter' | 'onMouseLeave' | 'onClick', MouseEventWithDatum>

const getPositionGenerator = ({
    layout,
    reverse,
    scale,
    height,
    markerSize,
}: Pick<BulletMarkersProps, 'layout' | 'reverse' | 'scale' | 'height' | 'markerSize'>) => {
    if (layout === 'horizontal') {
        return (marker: ComputedMarkersDatum) => {
            const x = scale(marker.value)
            const y = height / 2
            const rotation = reverse === true ? 180 : 0

            return { x, y, size: markerSize, rotation }
        }
    }

    return (marker: ComputedMarkersDatum) => {
        const x = height / 2
        const y = scale(marker.value)
        const rotation = reverse === true ? 270 : 90

        return { x, y, size: markerSize, rotation }
    }
}

export default class BulletMarkers extends Component<BulletMarkersProps & EventHandlers> {
    handleMouseEnter: MouseEventWithDatum = (data, event) => {
        this.props.onMouseEnter(data, event)
    }

    handleMouseLeave: MouseEventWithDatum = (data, event) => {
        this.props.onMouseLeave(data, event)
    }

    handleClick: MouseEventWithDatum = (data, event) => {
        this.props.onClick(data, event)
    }

    render() {
        const {
            scale,
            layout,
            reverse,
            markers,
            height,
            markerSize,
            component,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const getPosition = getPositionGenerator({ layout, reverse, scale, height, markerSize })

        if (animate !== true) {
            return (
                <>
                    {markers.map(marker =>
                        React.createElement(component, {
                            key: marker.index,
                            ...marker,
                            ...getPosition(marker),
                            data: marker,
                            onMouseEnter: partial(this.handleMouseEnter, marker),
                            onMouseMove: partial(this.handleMouseEnter, marker),
                            onMouseLeave: partial(this.handleMouseLeave, marker),
                            onClick: partial(this.handleClick, marker),
                        })
                    )}
                </>
            )
        }

        const springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
        }

        return (
            <TransitionMotion
                styles={markers.map((marker, i) => {
                    const position = getPosition(marker)

                    return {
                        key: `${i}`,
                        data: marker,
                        style: {
                            x: spring(position.x, springConfig),
                            y: spring(position.y, springConfig),
                            size: spring(position.size, springConfig),
                            rotation: spring(position.rotation, springConfig),
                            ...interpolateColor(marker.color, springConfig),
                        },
                    }
                })}
            >
                {interpolatedStyles => (
                    <>
                        {interpolatedStyles.map(({ key, style, data: marker }) => {
                            const color = getInterpolatedColor(style)

                            return React.createElement(component, {
                                key,
                                ...marker,
                                ...style,
                                color,
                                data: marker,
                                onMouseEnter: partial(this.handleMouseEnter, marker),
                                onMouseMove: partial(this.handleMouseEnter, marker),
                                onMouseLeave: partial(this.handleMouseLeave, marker),
                                onClick: partial(this.handleClick, marker),
                            })
                        })}
                    </>
                )}
            </TransitionMotion>
        )
    }
}
