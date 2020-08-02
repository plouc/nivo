/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isString from 'lodash/isString'
import { Motion, spring } from 'react-motion'
import partial from 'lodash/partial'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { Axis } from '@nivo/axes'
import { getColorScale, withMotion, themePropType, noop } from '@nivo/core'
import { BasicTooltip } from '@nivo/tooltip'
import { stackValues } from './compute'
import BulletMarkers from './BulletMarkers'
import BulletRects from './BulletRects'
import BulletRectsItem from './BulletRectsItem'
import BulletMarkersItem from './BulletMarkersItem'

class BulletItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        scale: PropTypes.func.isRequired,
        ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
        computedRanges: PropTypes.arrayOf(
            PropTypes.shape({
                index: PropTypes.number.isRequired,
                v0: PropTypes.number.isRequired,
                v1: PropTypes.number.isRequired,
                color: PropTypes.string.isRequired,
            })
        ).isRequired,
        measures: PropTypes.arrayOf(PropTypes.number).isRequired,
        computedMeasures: PropTypes.arrayOf(
            PropTypes.shape({
                index: PropTypes.number.isRequired,
                v0: PropTypes.number.isRequired,
                v1: PropTypes.number.isRequired,
                color: PropTypes.string.isRequired,
            })
        ).isRequired,
        markers: PropTypes.arrayOf(PropTypes.number).isRequired,
        computedMarkers: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                index: PropTypes.number.isRequired,
                color: PropTypes.string.isRequired,
            })
        ).isRequired,
        layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
        reverse: PropTypes.bool.isRequired,
        axisPosition: PropTypes.oneOf(['before', 'after']).isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,

        title: PropTypes.node,
        titlePosition: PropTypes.oneOf(['before', 'after']).isRequired,
        titleAlign: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
        titleOffsetX: PropTypes.number.isRequired,
        titleOffsetY: PropTypes.number.isRequired,
        titleRotation: PropTypes.number.isRequired,

        rangeComponent: PropTypes.func.isRequired,
        rangeColors: PropTypes.any.isRequired,
        rangeColorScale: PropTypes.func.isRequired,
        onRangeClick: PropTypes.func.isRequired,

        measureHeight: PropTypes.number.isRequired,
        measureComponent: PropTypes.func.isRequired,
        measureColors: PropTypes.any.isRequired,
        measureColorScale: PropTypes.func.isRequired,
        onMeasureClick: PropTypes.func.isRequired,

        markerHeight: PropTypes.number.isRequired,
        markerComponent: PropTypes.func.isRequired,
        markerColors: PropTypes.any.isRequired,
        markerColorScale: PropTypes.func.isRequired,
        onMarkerClick: PropTypes.func.isRequired,

        theme: themePropType.isRequired,
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
    }

    handleRangeTooltip = (showTooltip, range, event) => {
        const { theme } = this.props
        showTooltip(
            <BasicTooltip
                id={
                    <span>
                        <strong>{range.v0}</strong> to <strong>{range.v1}</strong>
                    </span>
                }
                enableChip={true}
                color={range.color}
                theme={theme}
                //format={format}
                //renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
            />,
            event
        )
    }

    handleMeasureTooltip = (showTooltip, measure, event) => {
        const { theme } = this.props
        showTooltip(
            <BasicTooltip
                id={<strong>{measure.v1}</strong>}
                enableChip={true}
                color={measure.color}
                theme={theme}
                //format={format}
                //renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
            />,
            event
        )
    }

    handleMarkerTooltip = (showTooltip, marker, event) => {
        const { theme } = this.props
        showTooltip(
            <BasicTooltip
                id={<strong>{marker.value}</strong>}
                enableChip={true}
                color={marker.color}
                theme={theme}
                //format={format}
                //renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
            />,
            event
        )
    }

    handleRangeClick = (range, event) => {
        const { id, onRangeClick } = this.props
        onRangeClick({ id, ...range }, event)
    }

    handleMeasureClick = (measure, event) => {
        const { id, onMeasureClick } = this.props
        onMeasureClick({ id, ...measure }, event)
    }

    handleMarkerClick = (marker, event) => {
        const { id, onMarkerClick } = this.props
        onMarkerClick({ id, ...marker }, event)
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

            animate, // eslint-disable-line react/prop-types
            motionStiffness, // eslint-disable-line react/prop-types
            motionDamping, // eslint-disable-line react/prop-types
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
                            ...theme.labels.text,
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
    defaultProps({
        layout: 'horizontal',
        reverse: false,
        axisPosition: 'after',
        titlePosition: 'before',
        titleAlign: 'middle',
        titleRotation: 0,
        titleOffsetX: 0,
        titleOffsetY: 0,
        rangeComponent: BulletRectsItem,
        rangeColors: 'seq:cool',
        onRangeClick: noop,
        measureComponent: BulletRectsItem,
        measureColors: 'seq:red_purple',
        onMeasureClick: noop,
        markers: [],
        markerComponent: BulletMarkersItem,
        markerColors: 'seq:red_purple',
        onMarkerClick: noop,
        showTooltip: noop,
        hideTooltip: noop,
    }),
    withMotion(),
    withPropsOnChange(['rangeColors', 'scale'], ({ rangeColors, scale }) => ({
        rangeColorScale: getColorScale(rangeColors, scale, true),
    })),
    withPropsOnChange(['ranges', 'rangeColorScale'], ({ ranges, rangeColorScale }) => ({
        computedRanges: stackValues(ranges, rangeColorScale),
    })),
    withPropsOnChange(['measureColors', 'scale'], ({ measureColors, scale }) => ({
        measureColorScale: getColorScale(measureColors, scale),
    })),
    withPropsOnChange(['measures', 'measureColorScale'], ({ measures, measureColorScale }) => ({
        computedMeasures: stackValues(measures, measureColorScale),
    })),
    withPropsOnChange(['markerColors', 'scale'], ({ markerColors, scale }) => ({
        markerColorScale: getColorScale(markerColors, scale),
    })),
    withPropsOnChange(['markers', 'markerColorScale'], ({ markers, markerColorScale }) => ({
        computedMarkers: markers.map((marker, index) => ({
            value: marker,
            index,
            color: markerColorScale(markerColorScale.type === 'sequential' ? marker : index),
        })),
    })),
    pure
)(BulletItem)

EnhancedBulletItem.displayName = 'BulletItem'

export default EnhancedBulletItem
