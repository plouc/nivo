/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import {
    /*colorMotionSpring, getInterpolatedColor,*/ Grid,
    Container,
    SvgWrapper,
} from '@nivo/core'
import { Axes } from '@nivo/axes'
import { BeeSwarmPropTypes } from './props'
import { enhance } from './enhance'

const BeeSwarmSvg = props => {
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
        // nodeComponent,
        margin,
        width,
        height,
        outerWidth,
        outerHeight,
        getColor,
        theme,
        borderWidth,
        getBorderColor,
        defs,
        animate,
        motionStiffness,
        motionDamping,
        isInteractive,
        // onClick,
        // tooltipFormat,
        // tooltip,
    } = props

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {(/*{ showTooltip, hideTooltip }*/) => {
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
                                data: node,
                                style: {
                                    x: spring(node.x, springConfig),
                                    y: spring(node.y, springConfig),
                                    size: spring(nodeSize, springConfig),
                                },
                            }))}
                        >
                            {interpolatedStyles => (
                                <Fragment>
                                    {interpolatedStyles.map(({ key, style, data: node }) => (
                                        <circle
                                            key={key}
                                            r={style.size / 2}
                                            cx={style.x}
                                            cy={style.y}
                                            fill={getColor(node)}
                                            strokeWidth={borderWidth}
                                            stroke={getBorderColor({
                                                ...node,
                                                color: getColor(node),
                                            })}
                                        />
                                    ))}
                                </Fragment>
                            )}
                        </TransitionMotion>
                    )
                } else {
                    layerById.nodes = (
                        <Fragment>
                            {rawNodes.map(node => (
                                <circle
                                    key={node.id}
                                    r={nodeSize / 2}
                                    cx={node.x}
                                    cy={node.y}
                                    fill={getColor(node)}
                                    strokeWidth={getBorderColor({ ...node, color: getColor(node) })}
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
                                return <Fragment key={i}>{layer({ ...props })}</Fragment>
                            }
                            return layerById[layer]
                        })}
                    </SvgWrapper>
                )
            }}
        </Container>
    )
}

BeeSwarmSvg.displayName = 'BeeSwarm'
BeeSwarmSvg.propTypes = BeeSwarmPropTypes

export const BeeSwarm = enhance(BeeSwarmSvg)
