// /*
//  * This file is part of the nivo project.
//  *
//  * Copyright 2016-present, Raphaël Benitte.
//  *
//  * For the full copyright and license information, please view the LICENSE
//  * file that was distributed with this source code.
//  */
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
import PieLayout from './PieLayout'
import PieLegends from './PieLegends'

export default function Pie(props) {
    const {
        data,
        sortByValue,

        startAngle,
        endAngle,
        padAngle,
        fit,
        innerRadius,
        cornerRadius,

        // dimensions
        margin: _margin,
        width: _width,
        height: _height,

        colors,
        colorBy,

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
        // theme,
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

    const theme = usePartialTheme()

    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        _width,
        _height,
        _margin
    )

    const getRadialLabel = React.useMemo(() => getLabelGenerator(radialLabel), [radialLabel])

    const getSliceLabel = React.useMemo(() => getLabelGenerator(sliceLabel), [sliceLabel])

    const borderColor = getInheritedColorGenerator(_borderColor, theme)

    return (
        <PieLayout
            width={innerWidth}
            height={innerHeight}
            data={data}
            sortByValue={sortByValue}
            startAngle={startAngle}
            endAngle={endAngle}
            fit={fit}
            padAngle={padAngle}
            innerRadius={innerRadius}
            cornerRadius={cornerRadius}
            colors={colors}
            colorBy={colorBy}
        >
            {({ centerX, centerY, radius, innerRadius, arcs, arcGenerator }) => {
                const boundDefs = bindDefs(defs, arcs, fill, {
                    dataKey: 'data',
                })

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
                                    {arcs.map(arc => (
                                        <PieSlice
                                            key={arc.data.id}
                                            data={arc.data}
                                            path={arcGenerator(arc)}
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
                                            arcs={arcs}
                                            radius={radius}
                                            label={getRadialLabel}
                                            skipAngle={radialLabelsSkipAngle}
                                            linkOffset={radialLabelsLinkOffset}
                                            linkDiagonalLength={radialLabelsLinkDiagonalLength}
                                            linkHorizontalLength={radialLabelsLinkHorizontalLength}
                                            linkStrokeWidth={radialLabelsLinkStrokeWidth}
                                            textXOffset={radialLabelsTextXOffset}
                                            textColor={getInheritedColorGenerator(
                                                radialLabelsTextColor,
                                                theme
                                            )}
                                            linkColor={getInheritedColorGenerator(
                                                radialLabelsLinkColor,
                                                theme
                                            )}
                                            theme={theme}
                                        />
                                    )}
                                    {enableSlicesLabels && (
                                        <PieSlicesLabels
                                            arcs={arcs}
                                            radius={radius}
                                            innerRadius={innerRadius}
                                            theme={theme}
                                            label={getSliceLabel}
                                            skipAngle={slicesLabelsSkipAngle}
                                            textColor={getInheritedColorGenerator(
                                                slicesLabelsTextColor,
                                                theme
                                            )}
                                        />
                                    )}
                                </g>
                                <PieLegends
                                    width={innerWidth}
                                    height={innerHeight}
                                    arcs={arcs}
                                    legends={legends}
                                    theme={theme}
                                />
                            </SvgWrapper>
                        )}
                    </Container>
                )
            }}
        </PieLayout>
    )
}

Pie.displayName = 'Pie'
Pie.propTypes = PieSvgPropTypes
Pie.defaultProps = PieSvgDefaultProps
