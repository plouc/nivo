/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import {
    getLabelGenerator,
    Container,
    SvgWrapper,
    bindDefs,
    usePartialTheme,
    useDimensions,
} from '@nivo/core'
import { getInheritedColorGenerator } from '@nivo/colors'
import { PieSvgDefaultProps, PieSvgPropTypes } from './props'
import PieSlice from './PieSlice'
import PieRadialLabels from './PieRadialLabels'
import PieSlicesLabels from './PieSlicesLabels'
import PieLegends from './PieLegends'
import { useNormalizedData, usePieFromBox } from './hooks'

export default function Pie(props) {
    const {
        data,
        id,
        value,
        valueFormat,
        sortByValue,

        startAngle,
        endAngle,
        padAngle,
        fit,
        innerRadius: innerRadiusRatio,
        cornerRadius,

        // dimensions
        margin: _margin,
        width: _width,
        height: _height,

        colors,

        // border
        borderWidth,
        borderColor: _borderColor,

        // radial labels
        radialLabel,
        enableRadialLabels,
        radialLabelsSkipAngle,
        radialLabelsLinkOffset,
        radialLabelsLinkDiagonalLength,
        radialLabelsLinkHorizontalLength,
        radialLabelsLinkStrokeWidth,
        radialLabelsTextXOffset,
        radialLabelsTextColor,
        radialLabelsLinkColor,

        // slices labels
        sliceLabel,
        enableSlicesLabels,
        slicesLabelsSkipAngle,
        slicesLabelsTextColor,

        // styling
        theme: partialTheme,
        defs,
        fill,

        // interactivity
        isInteractive,
        onClick,
        onMouseEnter,
        onMouseLeave,
        tooltipFormat,
        tooltip,

        legends,
        role,
    } = props

    const theme = usePartialTheme(partialTheme)

    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        _width,
        _height,
        _margin
    )

    const normalizedData = useNormalizedData({
        data,
        id,
        value,
        valueFormat,
        colors,
    })

    const { dataWithArc, arcGenerator, centerX, centerY, radius, innerRadius } = usePieFromBox({
        data: normalizedData,
        width: innerWidth,
        height: innerHeight,
        fit,
        innerRadius: innerRadiusRatio,
        startAngle,
        endAngle,
        padAngle,
        sortByValue,
        cornerRadius,
    })

    const getRadialLabel = React.useMemo(() => getLabelGenerator(radialLabel), [radialLabel])

    const getSliceLabel = React.useMemo(() => getLabelGenerator(sliceLabel), [sliceLabel])

    const borderColor = getInheritedColorGenerator(_borderColor, theme)

    const boundDefs = bindDefs(defs, dataWithArc, fill)

    return (
        <Container isInteractive={isInteractive} theme={theme} animate={false}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper
                    width={outerWidth}
                    height={outerHeight}
                    margin={margin}
                    defs={boundDefs}
                    theme={theme}
                    role={role}
                >
                    <g transform={`translate(${centerX},${centerY})`}>
                        {dataWithArc.map(arc => (
                            <PieSlice
                                key={arc.id}
                                data={arc}
                                path={arcGenerator(arc.arc)}
                                color={arc.color}
                                fill={arc.fill ? arc.fill : arc.color}
                                borderWidth={borderWidth}
                                borderColor={borderColor(arc)}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                tooltipFormat={tooltipFormat}
                                tooltip={tooltip}
                                onClick={onClick}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                theme={theme}
                            />
                        ))}
                        {enableRadialLabels && (
                            <PieRadialLabels
                                arcs={dataWithArc}
                                radius={radius}
                                label={getRadialLabel}
                                skipAngle={radialLabelsSkipAngle}
                                linkOffset={radialLabelsLinkOffset}
                                linkDiagonalLength={radialLabelsLinkDiagonalLength}
                                linkHorizontalLength={radialLabelsLinkHorizontalLength}
                                linkStrokeWidth={radialLabelsLinkStrokeWidth}
                                textXOffset={radialLabelsTextXOffset}
                                textColor={getInheritedColorGenerator(radialLabelsTextColor, theme)}
                                linkColor={getInheritedColorGenerator(radialLabelsLinkColor, theme)}
                                theme={theme}
                            />
                        )}
                        {enableSlicesLabels && (
                            <PieSlicesLabels
                                arcs={dataWithArc}
                                radius={radius}
                                innerRadius={innerRadius}
                                theme={theme}
                                label={getSliceLabel}
                                skipAngle={slicesLabelsSkipAngle}
                                textColor={getInheritedColorGenerator(slicesLabelsTextColor, theme)}
                            />
                        )}
                    </g>
                    <PieLegends
                        width={innerWidth}
                        height={innerHeight}
                        arcs={dataWithArc}
                        legends={legends}
                        theme={theme}
                    />
                </SvgWrapper>
            )}
        </Container>
    )
}

Pie.displayName = 'Pie'
Pie.propTypes = PieSvgPropTypes
Pie.defaultProps = PieSvgDefaultProps
