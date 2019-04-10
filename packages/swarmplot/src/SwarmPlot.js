/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { SvgWrapper, withContainer, useDimensions, useTheme, useTooltip, Grid } from '@nivo/core'
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import { Axes } from '@nivo/axes'
import { SwarmPlotPropTypes, SwarmPlotDefaultProps } from './props'
import { useSwarmPlot } from './hooks'
import AnimatedSwarmPlotNodes from './AnimatedSwarmPlotNodes'

const SwarmPlot = memo(
    ({
        width,
        height,
        margin: partialMargin,
        colors,
        data,
        layout,
        forceStrength,
        simulationIterations,
        scale,
        gap,
        nodeSize,
        nodePadding,
        borderWidth,

        enableGridX,
        enableGridY,
        axisTop,
        axisRight,
        axisBottom,
        axisLeft,

        animate,
        motionStiffness,
        motionDamping,
    }) => {
        const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
            width,
            height,
            partialMargin
        )
        const theme = useTheme()
        const [showTooltip, hideTooltip] = useTooltip()

        const { nodes, xScale, yScale } = useSwarmPlot({
            width: innerWidth,
            height: innerHeight,
            data,
            layout,
            scale,
            gap,
            nodeSize,
            nodePadding,
            colors,
            forceStrength,
            simulationIterations,
        })

        return (
            <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
                <Grid
                    theme={theme}
                    width={innerWidth}
                    height={innerHeight}
                    xScale={xScale}
                    yScale={yScale}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDaming={motionDamping}
                />
                <Axes
                    key="axes"
                    xScale={xScale}
                    yScale={yScale}
                    width={innerWidth}
                    height={innerHeight}
                    theme={theme}
                    top={axisTop}
                    right={axisRight}
                    bottom={axisBottom}
                    left={axisLeft}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
                {animate && (
                    <AnimatedSwarmPlotNodes
                        nodes={nodes}
                        nodeSize={nodeSize}
                        borderWidth={borderWidth}
                        motionStiffness={motionStiffness}
                        motionDamping={motionDamping}
                    />
                )}
            </SvgWrapper>
        )
    }
)

SwarmPlot.displayName = 'SwarmPlot'
SwarmPlot.propTypes = SwarmPlotPropTypes
SwarmPlot.defaultProps = SwarmPlotDefaultProps

export default withContainer(SwarmPlot)
