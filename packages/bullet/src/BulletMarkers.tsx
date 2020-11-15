import React, { useMemo } from 'react'
import { useTransition } from 'react-spring'
// @ts-ignore
import { useMotionConfig } from '@nivo/core'
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
    const getPosition = useMemo(
        () => getPositionGenerator({ layout, reverse, scale, height, markerSize }),
        [layout, reverse, scale, height, markerSize]
    )

    const { animate, config: springConfig } = useMotionConfig()
    const transition = useTransition<MarkerWithPosition, PositionWithColor>(
        markers.map(marker => ({ ...marker, position: getPosition(marker) })),
        {
            key: marker => `${marker.index}`,
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
        }
    )

    return (
        <>
            {transition((props, { position, ...marker }) =>
                React.createElement(component, {
                    key: marker.index,
                    ...marker,
                    ...position,
                    animatedProps: props,
                    data: marker,
                    onMouseEnter,
                    onMouseMove: onMouseEnter,
                    onMouseLeave,
                    onClick,
                })
            )}
        </>
    )
}
