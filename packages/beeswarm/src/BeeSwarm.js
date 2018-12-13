/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, Fragment } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { Grid, Container, SvgWrapper } from '@nivo/core'
import { Axes } from '@nivo/axes'
import { BeeSwarmPropTypes } from './props'
import { enhance } from './enhance'
import { BeeSwarmNode } from './BeeSwarmNode'
import { BeeSwarmTooltip } from './BeeSwarmTooltip'

class BeeSwarmSvg extends Component {
    static propTypes = BeeSwarmPropTypes

    showTooltip = (showTooltip, node, event) => {
        const { tooltipFormat, tooltip, theme } = this.props

        showTooltip(<BeeSwarmTooltip node={node} theme={theme} />, event)
    }

    handleMouseEnter = showTooltip => node => event => {
        const { isInteractive, onMouseEnter } = this.props
        if (!isInteractive) return

        onMouseEnter && onMouseEnter(node, event)
        this.showTooltip(showTooltip, node, event)
    }

    handleMouseMove = showTooltip => node => event => {
        const { isInteractive, onMouseMove } = this.props
        if (!isInteractive) return

        onMouseMove && onMouseMove(node, event)
        this.showTooltip(showTooltip, node, event)
    }

    handleMouseLeave = hideTooltip => node => event => {
        const { isInteractive, onMouseLeave } = this.props
        if (!isInteractive) return

        onMouseLeave && onMouseLeave(node, event)
        hideTooltip()
    }

    handleClick = node => event => {
        const { isInteractive, onClick } = this.props
        if (!isInteractive || onClick === undefined) return

        onClick(node, event)
    }

    render() {
        const {
            nodes: rawNodes,
            nodeSize,
            xScale,
            yScale,
            layers,
            axisTop,
            axisRight,
            axisBottom,
            axisLeft,
            enableGridX,
            enableGridY,
            margin,
            width,
            height,
            outerWidth,
            outerHeight,
            theme,
            borderWidth,
            getBorderColor,
            defs,
            animate,
            motionStiffness,
            motionDamping,
            isInteractive,
        } = this.props

        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => {
                    const onMouseEnter = this.handleMouseEnter(showTooltip)
                    const onMouseMove = this.handleMouseMove(showTooltip)
                    const onMouseLeave = this.handleMouseLeave(hideTooltip)

                    const layerById = {
                        grid: (
                            <Grid
                                key="grid"
                                theme={theme}
                                width={width}
                                height={height}
                                xScale={enableGridX ? xScale : null}
                                yScale={enableGridY ? yScale : null}
                                animate={animate}
                                motionStiffness={motionStiffness}
                                motionDamping={motionDamping}
                            />
                        ),
                        axes: (
                            <Axes
                                key="axes"
                                xScale={xScale}
                                yScale={yScale}
                                width={width}
                                height={height}
                                theme={theme}
                                top={axisTop}
                                right={axisRight}
                                bottom={axisBottom}
                                left={axisLeft}
                                animate={animate}
                                motionStiffness={motionStiffness}
                                motionDamping={motionDamping}
                            />
                        ),
                    }

                    if (animate === true) {
                        layerById.nodes = (
                            <TransitionMotion
                                key="nodes"
                                styles={rawNodes.map(node => ({
                                    key: node.id,
                                    data: {
                                        node,
                                        onMouseEnter: onMouseEnter(node),
                                        onMouseMove: onMouseMove(node),
                                        onMouseLeave: onMouseLeave(node),
                                        onClick: this.handleClick(node),
                                    },
                                    style: {
                                        x: spring(node.x, springConfig),
                                        y: spring(node.y, springConfig),
                                        size: spring(nodeSize, springConfig),
                                    },
                                }))}
                            >
                                {interpolatedStyles => (
                                    <Fragment>
                                        {interpolatedStyles.map(({ key, style, data }) => (
                                            <BeeSwarmNode
                                                key={key}
                                                x={style.x}
                                                y={style.y}
                                                size={style.size}
                                                color={data.node.color}
                                                borderWidth={borderWidth}
                                                borderColor={getBorderColor(data.node)}
                                                {...data}
                                            />
                                        ))}
                                    </Fragment>
                                )}
                            </TransitionMotion>
                        )
                    } else {
                        layerById.nodes = (
                            <Fragment key="nodes">
                                {rawNodes.map(node => (
                                    <BeeSwarmNode
                                        key={node.id}
                                        node={node}
                                        x={node.x}
                                        y={node.y}
                                        size={nodeSize}
                                        color={node.color}
                                        borderWidth={borderWidth}
                                        borderColor={getBorderColor(node)}
                                        onMouseEnter={onMouseEnter(node)}
                                        onMouseMove={onMouseMove(node)}
                                        onMouseLeave={onMouseLeave(node)}
                                        onClick={this.handleClick(node)}
                                    />
                                ))}
                            </Fragment>
                        )
                    }

                    return (
                        <SvgWrapper
                            width={outerWidth}
                            height={outerHeight}
                            margin={margin}
                            defs={defs}
                            theme={theme}
                        >
                            {layers.map((layer, i) => {
                                if (typeof layer === 'function') {
                                    return <Fragment key={i}>{layer({ ...this.props })}</Fragment>
                                }
                                return layerById[layer]
                            })}
                        </SvgWrapper>
                    )
                }}
            </Container>
        )
    }
}

BeeSwarmSvg.displayName = 'BeeSwarm'

export const BeeSwarm = enhance(BeeSwarmSvg)
