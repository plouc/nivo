/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import setDisplayName from 'recompose/setDisplayName'
import { Container, SvgWrapper } from '@nivo/core'
import { enhanceSvg } from './enhance'
import { RosePropTypes } from './props'
import RoseArc from './RoseArc'

class Rose extends Component {
    static propTypes = RosePropTypes

    handleMouseEnter = showTooltip => (point, event) => {
        const { isInteractive, onMouseEnter } = this.props

        if (!isInteractive) return

        onMouseEnter && onMouseEnter(point, event)
        this.showTooltip(showTooltip, point, event)
    }

    handleMouseMove = showTooltip => (point, event) => {
        const { isInteractive, onMouseMove } = this.props

        if (!isInteractive) return

        onMouseMove && onMouseMove(point, event)
        this.showTooltip(showTooltip, point, event)
    }

    handleMouseLeave = hideTooltip => (point, event) => {
        const { isInteractive, onMouseLeave } = this.props

        if (!isInteractive) return

        onMouseLeave && onMouseLeave(point, event)
        hideTooltip()
    }

    handleClick = (point, event) => {
        const { isInteractive, onClick } = this.props
        if (!isInteractive || onClick === undefined) return

        onClick(point.data, event)
    }

    render() {
        const {
            arcs,
            arcGenerator,
            centerX,
            centerY,

            borderWidth,

            margin,
            outerWidth,
            outerHeight,

            theme,
            //getColor,

            animate,
            motionStiffness,
            motionDamping,

            isInteractive,
        } = this.props

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }
        const springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness,
        }

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => {
                    const onMouseEnter = this.handleMouseEnter(showTooltip)
                    const onMouseMove = this.handleMouseMove(showTooltip)
                    const onMouseLeave = this.handleMouseLeave(hideTooltip)

                    return (
                        <SvgWrapper
                            width={outerWidth}
                            height={outerHeight}
                            margin={margin}
                            theme={theme}
                        >
                            <g transform={`translate(${centerX}, ${centerY})`}>
                                {arcs.map(arc => {
                                    return (
                                        <RoseArc
                                            key={arc.id}
                                            arc={arc}
                                            arcGenerator={arcGenerator}
                                            borderWidth={borderWidth}
                                        />
                                    )
                                })}
                            </g>
                        </SvgWrapper>
                    )
                }}
            </Container>
        )
    }
}

export default setDisplayName('Rose')(enhanceSvg(Rose))
