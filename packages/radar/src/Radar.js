/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import {
    withContainer,
    useTheme,
    useCurveInterpolation,
    useDimensions,
    getAccessorFor,
    SvgWrapper,
} from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { BoxLegendSvg } from '@nivo/legends'
import RadarShapes from './RadarShapes'
import RadarGrid from './RadarGrid'
import RadarTooltip from './RadarTooltip'
import RadarDots from './RadarDots'
import { RadarDefaultProps, RadarPropTypes } from './props'

const Radar = memo(
    ({
        data,
        keys,
        indexBy,
        maxValue,
        curve,
        margin: partialMargin,
        width,
        height,
        borderWidth,
        borderColor,
        gridLevels,
        gridShape,
        gridLabel,
        gridLabelOffset,
        enableDots,
        dotSymbol,
        dotSize,
        dotColor,
        dotBorderWidth,
        dotBorderColor,
        enableDotLabel,
        dotLabel,
        dotLabelFormat,
        dotLabelYOffset,
        colors,
        fillOpacity,
        blendMode,
        isInteractive,
        tooltipFormat,
        legends,
    }) => {
        const getIndex = useMemo(() => getAccessorFor(indexBy), [indexBy])
        const indices = useMemo(() => data.map(getIndex), [data, getIndex])

        const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
            width,
            height,
            partialMargin
        )
        const theme = useTheme()

        const getColor = useOrdinalColorScale(colors, 'key')
        const colorByKey = useMemo(
            () =>
                keys.reduce((mapping, key, index) => {
                    mapping[key] = getColor({ key, index })
                    return mapping
                }, {}),
            [keys, getColor]
        )

        const { radius, radiusScale, centerX, centerY, angleStep } = useMemo(() => {
            const computedMaxValue =
                maxValue !== 'auto'
                    ? maxValue
                    : Math.max(...data.reduce((acc, d) => [...acc, ...keys.map(key => d[key])], []))

            const radius = Math.min(innerWidth, innerHeight) / 2
            const radiusScale = scaleLinear().range([0, radius]).domain([0, computedMaxValue])

            return {
                radius,
                radiusScale,
                centerX: innerWidth / 2,
                centerY: innerHeight / 2,
                angleStep: (Math.PI * 2) / data.length,
            }
        }, [keys, indexBy, data, maxValue, innerWidth, innerHeight])

        const legendData = keys.map(key => ({
            id: key,
            label: key,
            color: colorByKey[key],
        }))

        const curveInterpolator = useCurveInterpolation(curve)

        return (
            <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
                <g transform={`translate(${centerX}, ${centerY})`}>
                    <RadarGrid
                        levels={gridLevels}
                        shape={gridShape}
                        radius={radius}
                        angleStep={angleStep}
                        indices={indices}
                        label={gridLabel}
                        labelOffset={gridLabelOffset}
                    />
                    <RadarShapes
                        data={data}
                        keys={keys}
                        colorByKey={colorByKey}
                        radiusScale={radiusScale}
                        angleStep={angleStep}
                        curveInterpolator={curveInterpolator}
                        borderWidth={borderWidth}
                        borderColor={borderColor}
                        fillOpacity={fillOpacity}
                        blendMode={blendMode}
                    />
                    {isInteractive && (
                        <RadarTooltip
                            data={data}
                            keys={keys}
                            getIndex={getIndex}
                            colorByKey={colorByKey}
                            radius={radius}
                            angleStep={angleStep}
                            tooltipFormat={tooltipFormat}
                        />
                    )}
                    {enableDots && (
                        <RadarDots
                            data={data}
                            keys={keys}
                            getIndex={getIndex}
                            radiusScale={radiusScale}
                            angleStep={angleStep}
                            symbol={dotSymbol}
                            size={dotSize}
                            colorByKey={colorByKey}
                            color={dotColor}
                            borderWidth={dotBorderWidth}
                            borderColor={dotBorderColor}
                            enableLabel={enableDotLabel}
                            label={dotLabel}
                            labelFormat={dotLabelFormat}
                            labelYOffset={dotLabelYOffset}
                        />
                    )}
                </g>
                {legends.map((legend, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={width}
                        containerHeight={height}
                        data={legendData}
                        theme={theme}
                    />
                ))}
            </SvgWrapper>
        )
    }
)

Radar.displayName = 'Radar'
Radar.propTypes = RadarPropTypes
Radar.defaultProps = RadarDefaultProps

export default withContainer(Radar)
