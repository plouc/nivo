import React, { Component } from 'react'
import isString from 'lodash/isString'
import { Motion, spring } from 'react-motion'
import partial from 'lodash/partial'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { Axis } from '@nivo/axes'
// @ts-ignore
import { getColorScale, withMotion, themePropType, noop } from '@nivo/core'
import { BasicTooltip } from '@nivo/tooltip'
import { stackValues } from './compute'
import BulletMarkers from './BulletMarkers'
import BulletRects from './BulletRects'
import { BulletItemProps, ComputedRangeDatum, ComputedMarkersDatum, TooltipHandlers } from './types'

type TooltipEvent<Datum, Element> = (
    showTooltip: TooltipHandlers<Element>['showTooltip'],
    datum: Datum,
    event: React.MouseEvent<Element, MouseEvent>
) => void

type MouseEventWithDatum<Datum, Element> = (
    datum: Datum,
    event: React.MouseEvent<Element, MouseEvent>
) => void

class BulletItem extends Component<BulletItemProps> {
    handleRangeTooltip: TooltipEvent<ComputedRangeDatum, SVGRectElement> = (
        showTooltip,
        range,
        event
    ) => {
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
    }

    handleMeasureTooltip: TooltipEvent<ComputedRangeDatum, SVGRectElement> = (
        showTooltip,
        measure,
        event
    ) => {
        showTooltip(
            <BasicTooltip
                id={<strong>{measure.v1}</strong>}
                enableChip={true}
                color={measure.color}
            />,
            event
        )
    }

    handleMarkerTooltip: TooltipEvent<ComputedMarkersDatum, SVGLineElement> = (
        showTooltip,
        marker,
        event
    ) => {
        showTooltip(
            <BasicTooltip
                id={<strong>{marker.value}</strong>}
                enableChip={true}
                color={marker.color}
            />,
            event
        )
    }

    handleRangeClick: MouseEventWithDatum<ComputedRangeDatum, SVGRectElement> = (range, event) => {
        const { id, onRangeClick } = this.props
        onRangeClick?.({ id, ...range }, event)
    }

    handleMeasureClick: MouseEventWithDatum<ComputedRangeDatum, SVGRectElement> = (
        measure,
        event
    ) => {
        const { id, onMeasureClick } = this.props
        onMeasureClick?.({ id, ...measure }, event)
    }

    handleMarkerClick: MouseEventWithDatum<ComputedMarkersDatum, SVGLineElement> = (
        marker,
        event
    ) => {
        const { id, onMarkerClick } = this.props
        onMarkerClick?.({ id, ...marker }, event)
    }

    render() {
        const {
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

            computedRanges,
            rangeComponent,

            computedMeasures,
            measureComponent,
            measureHeight,

            computedMarkers,
            markerComponent,
            markerHeight,

            theme,

            showTooltip,
            hideTooltip,

            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const motionProps = {
            animate,
            motionStiffness,
            motionDamping,
        }

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
                onMouseEnter={partial(this.handleRangeTooltip, showTooltip)}
                onMouseLeave={hideTooltip}
                onClick={this.handleRangeClick}
                {...motionProps}
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
                onMouseEnter={partial(this.handleMarkerTooltip, showTooltip)}
                onMouseLeave={hideTooltip}
                onClick={this.handleMarkerClick}
                {...motionProps}
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
                {isString(title) ? (
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

        if (animate !== true) {
            return (
                <g transform={`translate(${x},${y})`}>
                    {rangeNodes}
                    <BulletRects
                        data={computedMeasures}
                        scale={scale}
                        layout={layout}
                        reverse={reverse}
                        x={0}
                        y={(height - measureHeight) / 2}
                        width={width}
                        height={measureHeight}
                        component={measureComponent}
                        onMouseEnter={partial(this.handleMeasureTooltip, showTooltip)}
                        onMouseLeave={hideTooltip}
                        onClick={this.handleMeasureClick}
                        {...motionProps}
                    />
                    {axis}
                    {markerNodes}
                    {titleNode}
                </g>
            )
        }

        const springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
        }

        return (
            <Motion
                style={{
                    x: spring(x, springConfig),
                    y: spring(y, springConfig),
                    measuresY: spring((height - measureHeight) / 2, springConfig),
                }}
            >
                {values => (
                    <g transform={`translate(${values.x},${values.y})`}>
                        {rangeNodes}
                        <BulletRects
                            data={computedMeasures}
                            scale={scale}
                            layout={layout}
                            reverse={reverse}
                            x={0}
                            y={values.measuresY}
                            width={width}
                            height={measureHeight}
                            component={measureComponent}
                            onMouseEnter={partial(this.handleMeasureTooltip, showTooltip)}
                            onMouseLeave={hideTooltip}
                            onClick={this.handleMeasureClick}
                            {...motionProps}
                        />
                        {axis}
                        {markerNodes}
                        {titleNode}
                    </g>
                )}
            </Motion>
        )
    }
}

const EnhancedBulletItem = compose(
    withMotion(),
    withPropsOnChange<any, any>(['rangeColors', 'scale'], ({ rangeColors, scale }) => ({
        rangeColorScale: getColorScale(rangeColors, scale, true),
    })),
    withPropsOnChange<any, any>(['ranges', 'rangeColorScale'], ({ ranges, rangeColorScale }) => ({
        computedRanges: stackValues(ranges, rangeColorScale),
    })),
    withPropsOnChange<any, any>(['measureColors', 'scale'], ({ measureColors, scale }) => ({
        measureColorScale: getColorScale(measureColors, scale),
    })),
    withPropsOnChange<any, any>(
        ['measures', 'measureColorScale'],
        ({ measures, measureColorScale }) => ({
            computedMeasures: stackValues(measures, measureColorScale),
        })
    ),
    withPropsOnChange<any, any>(['markerColors', 'scale'], ({ markerColors, scale }) => ({
        markerColorScale: getColorScale(markerColors, scale),
    })),
    withPropsOnChange<any, any>(
        ['markers', 'markerColorScale'],
        ({ markers, markerColorScale }) => ({
            computedMarkers: markers.map((marker: number, index: number) => ({
                value: marker,
                index,
                color: markerColorScale(markerColorScale.type === 'sequential' ? marker : index),
            })),
        })
    ),
    pure
)(BulletItem as any) as React.ComponentType<
    Omit<
        BulletItemProps,
        | 'computedRanges'
        | 'rangeColorScale'
        | 'computedMeasures'
        | 'measureColorScale'
        | 'computedMarkers'
        | 'markerColorScale'
    >
>

EnhancedBulletItem.displayName = 'BulletItem'

export default EnhancedBulletItem
