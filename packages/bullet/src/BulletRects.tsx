import React, { useMemo } from 'react'
import { useTransition, animated, to } from 'react-spring'
// @ts-ignore
import { useMotionConfig } from '@nivo/core'
import { computeRects } from './compute'
import { BulletRectsProps, BulletRectComputedRect, BulletRectAnimatedProps } from './types'

export const BulletRects = ({
    animatedProps,
    data,
    layout,
    y,
    component,
    reverse,
    scale,
    height,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: BulletRectsProps) => {
    const rects = useMemo(
        () =>
            computeRects({
                data,
                layout,
                reverse,
                scale,
                height,
            }),
        [data, layout, reverse, scale, height]
    )

    const getTransform = (value: number) =>
        `translate(${layout === 'horizontal' ? 0 : value},${layout === 'horizontal' ? value : 0})`

    const transform = animatedProps ? to(animatedProps.measuresY, getTransform) : getTransform(y)

    const { animate, config: springConfig } = useMotionConfig()
    const transition = useTransition<BulletRectComputedRect, BulletRectAnimatedProps>(rects, {
        key: rect => `${rect.data.index}`,
        enter: rect => ({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            color: rect.data.color,
        }),
        update: rect => ({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            color: rect.data.color,
        }),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.g transform={transform}>
            {transition((props, rect) =>
                React.createElement(component, {
                    key: rect.data.index,
                    index: rect.data.index,
                    animatedProps: props,
                    data: rect.data,
                    x: props.x.get(),
                    y: props.y.get(),
                    width: to(props.width, value => Math.max(value, 0)).get(),
                    height: to(props.height, value => Math.max(value, 0)).get(),
                    color: props.color.get(),
                    onMouseEnter,
                    onMouseMove: onMouseEnter,
                    onMouseLeave,
                    onClick,
                })
            )}
        </animated.g>
    )
}
