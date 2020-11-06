import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { partial, isString } from 'lodash'
import { Axis } from '@nivo/axes'
// @ts-ignore
import { getColorScale, defaultTheme, extendDefaultTheme } from '@nivo/core'
import { BasicTooltip } from '@nivo/tooltip'
import { stackValues } from './compute'
import { defaultProps } from './props'
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

            theme: _theme,

            showTooltip,
            hideTooltip,

            animate = defaultProps.animate,
            motionStiffness = defaultProps.motionStiffness,
            motionDamping = defaultProps.motionDamping,
        } = this.props

        const theme = extendDefaultTheme(defaultTheme, _theme)

        const rangeColorScale = getColorScale(rangeColors, scale, true)
        const computedRanges = stackValues(ranges, rangeColorScale)

        const measureColorScale = getColorScale(measureColors, scale)
        const computedMeasures = stackValues(measures, measureColorScale)

        const markerColorScale = getColorScale(markerColors, scale)
        const computedMarkers = markers.map((marker: number, index: number) => ({
            value: marker,
            index,
            color: markerColorScale(
                markerColorScale.type === 'sequential' ? marker : index
            ) as string,
        }))

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

export default BulletItem
