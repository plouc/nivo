/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { Container, SvgWrapper } from '@nivo/core'
import { enhanceSvg } from './enhance'
import { RosePropTypes } from './props'
import RoseArc from './RoseArc'
import RoseArcLabel from './RoseArcLabel'
import { RoseProps, RoseLayerId } from './definitions'

class Rose<Datum> extends React.Component<RoseProps<Datum>> {
    public static propTypes = RosePropTypes

    /*
    private handleMouseEnter = showTooltip => (point, event) => {
        const { isInteractive, onMouseEnter } = this.props

        if (!isInteractive) return

        onMouseEnter && onMouseEnter(point, event)
        this.showTooltip(showTooltip, point, event)
    }

    private handleMouseMove = showTooltip => (point, event) => {
        const { isInteractive, onMouseMove } = this.props

        if (!isInteractive) return

        onMouseMove && onMouseMove(point, event)
        this.showTooltip(showTooltip, point, event)
    }

    private handleMouseLeave = hideTooltip => (point, event) => {
        const { isInteractive, onMouseLeave } = this.props

        if (!isInteractive) return

        onMouseLeave && onMouseLeave(point, event)
        hideTooltip()
    }

    private handleClick = (point, event) => {
        const { isInteractive, onClick } = this.props
        if (!isInteractive || onClick === undefined) return

        onClick(point.data, event)
    }
    */

    public render() {
        const {
            arcs,
            arcGenerator,
            centerX,
            centerY,

            layers,

            borderWidth,

            margin,
            outerWidth,
            outerHeight,

            theme,
            // getColor,

            enableArcLabel,
            rotateArcLabel,

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
                {(/*{ showTooltip, hideTooltip }*/) => {
                    /*
                    const onMouseEnter = this.handleMouseEnter(showTooltip)
                    const onMouseMove = this.handleMouseMove(showTooltip)
                    const onMouseLeave = this.handleMouseLeave(hideTooltip)
                    */

                    const commonProps = {
                        arcs,
                    }

                    const layerById: { [key in RoseLayerId]?: null | React.ReactNode } = {
                        arcLabels: null,
                    }

                    if (animate === true) {
                        layerById.arcs = (
                            <TransitionMotion
                                key="arcs"
                                styles={arcs.map(arc => ({
                                    key: arc.id,
                                    data: arc,
                                    style: {
                                        startAngle: spring(arc.startAngle, springConfig),
                                        endAngle: spring(arc.endAngle, springConfig),
                                        innerRadius: spring(arc.innerRadius, springConfig),
                                        outerRadius: spring(arc.outerRadius, springConfig),
                                    },
                                }))}
                            >
                                {interpolatedStyles => (
                                    <React.Fragment>
                                        {interpolatedStyles.map(({ key, style, data: arc }) => (
                                            <RoseArc
                                                key={key}
                                                isAnimated={true}
                                                arc={arc}
                                                interpolated={style}
                                                arcGenerator={arcGenerator}
                                                borderWidth={borderWidth}
                                            />
                                        ))}
                                    </React.Fragment>
                                )}
                            </TransitionMotion>
                        )

                        if (enableArcLabel === true) {
                            layerById.arcLabels = (
                                <TransitionMotion
                                    key="arcLabels"
                                    styles={arcs.map(arc => ({
                                        key: arc.id,
                                        data: arc,
                                        style: {
                                            startAngle: spring(arc.startAngle, springConfig),
                                            endAngle: spring(arc.endAngle, springConfig),
                                            innerRadius: spring(arc.innerRadius, springConfig),
                                            outerRadius: spring(arc.outerRadius, springConfig),
                                        },
                                    }))}
                                >
                                    {interpolatedStyles => (
                                        <React.Fragment>
                                            {interpolatedStyles.map(({ key, style, data: arc }) => {
                                                const centroid = arcGenerator.centroid(style)

                                                return (
                                                    <RoseArcLabel
                                                        key={key}
                                                        arc={arc}
                                                        arcGenerator={arcGenerator}
                                                        isAnimated={true}
                                                        x={centroid[0]}
                                                        y={centroid[1]}
                                                        rotate={rotateArcLabel}
                                                        interpolated={style}
                                                    />
                                                )
                                            })}
                                        </React.Fragment>
                                    )}
                                </TransitionMotion>
                            )
                        }
                    } else {
                        layerById.arcs = (
                            <React.Fragment key="arcs">
                                {arcs.map(arc => (
                                    <RoseArc
                                        key={arc.id}
                                        isAnimated={false}
                                        arc={arc}
                                        arcGenerator={arcGenerator}
                                        borderWidth={borderWidth}
                                    />
                                ))}
                            </React.Fragment>
                        )

                        if (enableArcLabel === true) {
                            layerById.arcLabels = (
                                <React.Fragment key="arcLabels">
                                    {arcs.map(arc => {
                                        const centroid = arcGenerator.centroid(arc)

                                        return (
                                            <RoseArcLabel
                                                key={arc.id}
                                                isAnimated={false}
                                                arc={arc}
                                                arcGenerator={arcGenerator}
                                                x={centroid[0]}
                                                y={centroid[1]}
                                                rotate={rotateArcLabel}
                                            />
                                        )
                                    })}
                                </React.Fragment>
                            )
                        }
                    }

                    return (
                        <SvgWrapper
                            width={outerWidth}
                            height={outerHeight}
                            margin={margin}
                            theme={theme}
                        >
                            <g transform={`translate(${centerX}, ${centerY})`}>
                                {layers.map((layer, i) => {
                                    if (typeof layer === 'function') {
                                        return (
                                            <React.Fragment key={i}>
                                                {layer({ ...commonProps })}
                                            </React.Fragment>
                                        )
                                    }
                                    return layerById[layer]
                                })}
                            </g>
                        </SvgWrapper>
                    )
                }}
            </Container>
        )
    }
}

export default enhanceSvg(Rose)
