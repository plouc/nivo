import React from 'react'
import { AnimatedValue, useSpring, animated } from 'react-spring'
import { Axis } from '@nivo/axes'
// @ts-ignore
import { getColorScale, defaultTheme, extendDefaultTheme, useMotionConfig } from '@nivo/core'
import { BasicTooltip } from '@nivo/tooltip'
import { stackValues } from './compute'
import { BulletMarkers } from './BulletMarkers'
import { BulletRects } from './BulletRects'
import { BulletItemProps } from './types'

export const BulletItem = ({
    id,

    scale,
    layout,
    reverse,
    axisPosition,
    x,
    y,
    width,
    height,

    title: _title,
    titlePosition,
    titleAlign,
    titleOffsetX,
    titleOffsetY,
    titleRotation,

    rangeComponent,
    rangeColors,
    ranges,

    measureComponent,
    measureHeight,
    measureColors,
    measures,

    markerComponent,
    markerColors,
    markerHeight,
    markers = [],

    onRangeClick,
    onMeasureClick,
    onMarkerClick,

    theme: _theme,

    showTooltip,
    hideTooltip,
}: BulletItemProps) => {
    const theme = extendDefaultTheme(defaultTheme, _theme)

    const rangeColorScale = getColorScale(rangeColors, scale, true)
    const computedRanges = stackValues(ranges, rangeColorScale)

    const measureColorScale = getColorScale(measureColors, scale)
    const computedMeasures = stackValues(measures, measureColorScale)

    const markerColorScale = getColorScale(markerColors, scale)
    const computedMarkers = markers.map((marker: number, index: number) => ({
        value: marker,
        index,
        color: markerColorScale(markerColorScale.type === 'sequential' ? marker : index) as string,
    }))

    const rangeNodes = (
        <BulletRects
            data={computedRanges}
            scale={scale}
            layout={layout}
            reverse={reverse}
            x={0}
            y={0}
            width={width}
            height={height}
            component={rangeComponent}
            onMouseEnter={(range, event) => {
                showTooltip(
                    <BasicTooltip
                        id={
                            <span>
                                <strong>{range.v0}</strong> to <strong>{range.v1}</strong>
                            </span>
                        }
                        enableChip={true}
                        color={range.color}
                    />,
                    event
                )
            }}
            onMouseLeave={hideTooltip}
            onClick={(range, event) => {
                onRangeClick?.({ id, ...range }, event)
            }}
        />
    )

    const markerNodes = (
        <BulletMarkers
            markers={computedMarkers}
            scale={scale}
            layout={layout}
            reverse={reverse}
            height={height}
            markerSize={markerHeight}
            component={markerComponent}
            onMouseEnter={(marker, event) => {
                showTooltip(
                    <BasicTooltip
                        id={<strong>{marker.value}</strong>}
                        enableChip={true}
                        color={marker.color}
                    />,
                    event
                )
            }}
            onMouseLeave={hideTooltip}
            onClick={(marker, event) => {
                onMarkerClick?.({ id, ...marker }, event)
            }}
        />
    )

    let axisX = 0
    let axisY = 0
    if (layout === 'horizontal' && axisPosition === 'after') {
        axisY = height
    } else if (layout === 'vertical' && axisPosition === 'after') {
        axisX = height
    }

    const axis = (
        <g transform={`translate(${axisX},${axisY})`}>
            <Axis
                // @ts-ignore
                axis={layout === 'horizontal' ? 'x' : 'y'}
                length={layout === 'horizontal' ? width : height}
                scale={scale}
                ticksPosition={axisPosition}
            />
        </g>
    )

    const title = _title || id
    let titleX
    let titleY
    if (layout === 'horizontal') {
        titleX = titlePosition === 'before' ? titleOffsetX : width + titleOffsetX
        titleY = height / 2 + titleOffsetY
    } else {
        titleX = height / 2 + titleOffsetX
        titleY = titlePosition === 'before' ? titleOffsetY : width + titleOffsetY
    }

    const titleNode = (
        <g transform={`translate(${titleX},${titleY}) rotate(${titleRotation})`}>
            {typeof title === 'string' ? (
                <text
                    style={{
                        ...theme?.labels?.text,
                        dominantBaseline: 'central',
                        textAnchor: titleAlign,
                    }}
                >
                    {title}
                </text>
            ) : (
                title
            )}
        </g>
    )

    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        measuresY: (height - measureHeight) / 2,
        transform: `translate(${x},${y})`,
        config: springConfig,
        immediate: !animate,
    }) as AnimatedValue<{
        measuresY: number;
        transform: string;
    }>

    return (
        <animated.g transform={animatedProps.transform}>
            {rangeNodes}
            <BulletRects
                animatedProps={animatedProps}
                data={computedMeasures}
                scale={scale}
                layout={layout}
                reverse={reverse}
                x={0}
                y={0}
                width={width}
                height={measureHeight}
                component={measureComponent}
                onMouseEnter={(measure, event) => {
                    showTooltip(
                        <BasicTooltip
                            id={<strong>{measure.v1}</strong>}
                            enableChip={true}
                            color={measure.color}
                        />,
                        event
                    )
                }}
                onMouseLeave={hideTooltip}
                onClick={(measure, event) => {
                    onMeasureClick?.({ id, ...measure }, event)
                }}
            />
            {axis}
            {markerNodes}
            {titleNode}
        </animated.g>
    )
}
