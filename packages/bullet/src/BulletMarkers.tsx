import React from 'react'
import { useTransition } from 'react-spring'
// @ts-ignore
import { useMotionConfig } from '@nivo/core'
// @ts-ignore
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import {
    BulletMarkersProps,
    ComputedMarkersDatum,
    MarkerWithPosition,
    PositionWithColor,
} from './types'

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

export const BulletMarkers = ({
    scale,
    layout,
    reverse,
    markers,
    height,
    markerSize,
    component,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: BulletMarkersProps & EventHandlers) => {
    const getPosition = getPositionGenerator({ layout, reverse, scale, height, markerSize })

    const { animate, config: springConfig } = useMotionConfig()
    const transitions = useTransition<MarkerWithPosition, PositionWithColor>(
        markers.map(marker => ({ ...marker, position: getPosition(marker) })),
        markers.map(marker => `${marker.index}`),
        {
            enter: ({ color, position }: MarkerWithPosition) => ({
                color,
                transform: `rotate(${position.rotation}, ${position.x}, ${position.y})`,
                x: position.x,
                y1: position.y - position.size / 2,
                y2: position.y + position.size / 2,
            }),
            update: ({ color, position }: MarkerWithPosition) => ({
                color,
                transform: `rotate(${position.rotation}, ${position.x}, ${position.y})`,
                x: position.x,
                y1: position.y - position.size / 2,
                y2: position.y + position.size / 2,
            }),
            config: springConfig,
            immediate: !animate,
        } as any
    )

    return (
        <>
            {transitions.map(({ item: { position, ...marker }, props, key }) =>
                React.createElement(component, {
                    key,
                    ...marker,
                    ...position,
                    animatedProps: props,
                    data: marker,
                    onMouseEnter: event => onMouseEnter(marker, event),
                    onMouseMove: event => onMouseEnter(marker, event),
                    onMouseLeave: event => onMouseLeave(marker, event),
                    onClick: event => onClick(marker, event),
                })
            )}
        </>
    )
}
