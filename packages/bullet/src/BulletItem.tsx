import React, { useMemo } from 'react'
import { useSpring, animated } from 'react-spring'
import { Axis } from '@nivo/axes'
// @ts-ignore
import { getColorScale, useMotionConfig, useTheme } from '@nivo/core'
import { BasicTooltip, useTooltip } from '@nivo/tooltip'
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

    title = id,
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
}: BulletItemProps) => {
    const theme = useTheme()
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const computedRanges = useMemo(() => {
        const rangeColorScale = getColorScale(rangeColors, scale, true)

        return stackValues(ranges, rangeColorScale)
    }, [rangeColors, ranges, scale])

    const computedMeasures = useMemo(() => {
        const measureColorScale = getColorScale(measureColors, scale)

        return stackValues(measures, measureColorScale)
    }, [measureColors, measures, scale])

    const computedMarkers = useMemo(() => {
        const markerColorScale = getColorScale(markerColors, scale)

        return markers.map((marker: number, index: number) => ({
            value: marker,
            index,
            color: markerColorScale(
                markerColorScale.type === 'sequential' ? marker : index
            ) as string,
        }))
    }, [markerColors, markers, scale])

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
                showTooltipFromEvent(
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
                showTooltipFromEvent(
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

    const axisX = layout === 'vertical' && axisPosition === 'after' ? height : 0
    const axisY = layout === 'horizontal' && axisPosition === 'after' ? height : 0

    const axis = (
        <g transform={`translate(${axisX},${axisY})`}>
            <Axis
                axis={layout === 'horizontal' ? 'x' : 'y'}
                length={layout === 'horizontal' ? width : height}
                scale={scale}
                ticksPosition={axisPosition}
            />
        </g>
    )

    const titleX =
        layout === 'horizontal'
            ? titlePosition === 'before'
                ? titleOffsetX
                : width + titleOffsetX
            : height / 2 + titleOffsetX
    const titleY =
        layout === 'horizontal'
            ? height / 2 + titleOffsetY
            : titlePosition === 'before'
            ? titleOffsetY
            : width + titleOffsetY

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
    })

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
                    showTooltipFromEvent(
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
