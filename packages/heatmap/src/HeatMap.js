/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import partial from 'lodash/partial'
import { TransitionMotion } from 'react-motion'
import { colorMotionSpring, getInterpolatedColor, Container, SvgWrapper, Grid } from '@nivo/core'
import { Axes } from '@nivo/axes'
import setDisplayName from 'recompose/setDisplayName'
import { HeatMapPropTypes } from './props'
import computeNodes from './computeNodes'
import enhance from './enhance'
import HeatMapCellRect from './HeatMapCellRect'
import HeatMapCellCircle from './HeatMapCellCircle'
import HeatMapCellTooltip from './HeatMapCellTooltip'

class HeatMap extends Component {
    static propTypes = HeatMapPropTypes

    handleNodeHover = (showTooltip, node, event) => {
        const { setCurrentNode, theme, tooltipFormat, tooltip } = this.props
        setCurrentNode(node)
        showTooltip(
            <HeatMapCellTooltip
                node={node}
                theme={theme}
                format={tooltipFormat}
                tooltip={tooltip}
            />,
            event
        )
    }

    handleNodeLeave = hideTooltip => {
        this.props.setCurrentNode(null)
        hideTooltip()
    }

    render() {
        const {
            xScale,
            yScale,
            offsetX,
            offsetY,

            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            // cells
            cellShape,
            cellBorderWidth,
            getCellBorderColor,

            // axes & grid
            axisTop,
            axisRight,
            axisBottom,
            axisLeft,
            enableGridX,
            enableGridY,

            // labels
            enableLabels,
            getLabelTextColor,

            // theming
            theme,

            // motion
            animate,
            motionStiffness,
            motionDamping,
            boundSpring,

            // interactivity
            isInteractive,
            onClick,
        } = this.props

        let Cell
        if (cellShape === 'rect') {
            Cell = HeatMapCellRect
        } else if (cellShape === 'circle') {
            Cell = HeatMapCellCircle
        } else {
            Cell = cellShape
        }

        const nodes = computeNodes(this.props)

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => {
                    const onHover = partial(this.handleNodeHover, showTooltip)
                    const onLeave = partial(this.handleNodeLeave, hideTooltip)

                    return (
                        <SvgWrapper
                            width={outerWidth}
                            height={outerHeight}
                            margin={Object.assign({}, margin, {
                                top: margin.top + offsetY,
                                left: margin.left + offsetX,
                            })}
                            theme={theme}
                        >
                            <Grid
                                theme={theme}
                                width={width - offsetX * 2}
                                height={height - offsetY * 2}
                                xScale={enableGridX ? xScale : null}
                                yScale={enableGridY ? yScale : null}
                                {...motionProps}
                            />
                            <Axes
                                xScale={xScale}
                                yScale={yScale}
                                width={width}
                                height={height}
                                theme={theme}
                                top={axisTop}
                                right={axisRight}
                                bottom={axisBottom}
                                left={axisLeft}
                                {...motionProps}
                            />
                            {!animate &&
                                nodes.map(node =>
                                    React.createElement(Cell, {
                                        key: node.key,
                                        data: node,
                                        value: node.value,
                                        x: node.x,
                                        y: node.y,
                                        width: node.width,
                                        height: node.height,
                                        color: node.color,
                                        opacity: node.opacity,
                                        borderWidth: cellBorderWidth,
                                        borderColor: getCellBorderColor(node),
                                        enableLabel: enableLabels,
                                        textColor: getLabelTextColor(node),
                                        onHover: partial(onHover, node),
                                        onLeave,
                                        onClick,
                                        theme,
                                    })
                                )}

                            {animate === true && (
                                <TransitionMotion
                                    styles={nodes.map(node => {
                                        return {
                                            key: node.key,
                                            data: node,
                                            style: {
                                                x: boundSpring(node.x),
                                                y: boundSpring(node.y),
                                                width: boundSpring(node.width),
                                                height: boundSpring(node.height),
                                                opacity: boundSpring(node.opacity),
                                                ...colorMotionSpring(node.color, {
                                                    damping: motionDamping,
                                                    stiffness: motionStiffness,
                                                }),
                                            },
                                        }
                                    })}
                                >
                                    {interpolatedStyles => {
                                        return (
                                            <g>
                                                {interpolatedStyles.map(
                                                    ({ key, style, data: node }) => {
                                                        const color = getInterpolatedColor(style)

                                                        return React.createElement(Cell, {
                                                            key,
                                                            data: node,
                                                            value: node.value,
                                                            x: style.x,
                                                            y: style.y,
                                                            width: Math.max(style.width, 0),
                                                            height: Math.max(style.height, 0),
                                                            color,
                                                            opacity: style.opacity,
                                                            borderWidth: cellBorderWidth,
                                                            borderColor: getCellBorderColor({
                                                                ...node,
                                                                color,
                                                            }),
                                                            enableLabel: enableLabels,
                                                            textColor: getLabelTextColor({
                                                                ...node,
                                                                color,
                                                            }),
                                                            onHover: partial(onHover, node),
                                                            onLeave,
                                                            onClick,
                                                            theme,
                                                        })
                                                    }
                                                )}
                                            </g>
                                        )
                                    }}
                                </TransitionMotion>
                            )}
                        </SvgWrapper>
                    )
                }}
            </Container>
        )
    }
}

export default setDisplayName('HeatMap')(enhance(HeatMap))
