import React from 'react'
import { arc as Arc } from 'd3-shape'
import { degreesToRadians } from '@nivo/core'
import sunburstLightNeutralImg from '../../assets/icons/sunburst-grey.png'
import sunburstLightColoredImg from '../../assets/icons/sunburst-red.png'
import sunburstDarkNeutralImg from '../../assets/icons/sunburst-dark-neutral.png'
import sunburstDarkColoredImg from '../../assets/icons/sunburst-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const arc = Arc().padAngle(degreesToRadians(2))

const SunburstIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`sunburst-${type}`} type={type}>
        <svg width={ICON_SIZE} height={ICON_SIZE}>
            <g transform={`translate(${ICON_SIZE / 2},${ICON_SIZE / 2})`}>
                <path
                    fill={colors[type].colors[4]}
                    d={
                        arc({
                            innerRadius: ICON_SIZE * 0.26,
                            outerRadius: ICON_SIZE * 0.36,
                            startAngle: 0,
                            endAngle: degreesToRadians(120),
                        })!
                    }
                />
                <path
                    fill={colors[type].colors[4]}
                    d={
                        arc({
                            innerRadius: ICON_SIZE * 0.38,
                            outerRadius: ICON_SIZE * 0.48,
                            startAngle: 0,
                            endAngle: degreesToRadians(40),
                        })!
                    }
                />
                <path
                    fill={colors[type].colors[4]}
                    d={
                        arc({
                            innerRadius: ICON_SIZE * 0.38,
                            outerRadius: ICON_SIZE * 0.48,
                            startAngle: degreesToRadians(40),
                            endAngle: degreesToRadians(120),
                        })!
                    }
                />
                <path
                    fill={colors[type].colors[2]}
                    d={
                        arc({
                            innerRadius: ICON_SIZE * 0.26,
                            outerRadius: ICON_SIZE * 0.36,
                            startAngle: degreesToRadians(120),
                            endAngle: degreesToRadians(240),
                        })!
                    }
                />
                <path
                    fill={colors[type].colors[2]}
                    d={
                        arc({
                            innerRadius: ICON_SIZE * 0.38,
                            outerRadius: ICON_SIZE * 0.48,
                            startAngle: degreesToRadians(120),
                            endAngle: degreesToRadians(160),
                        })!
                    }
                />
                <path
                    fill={colors[type].colors[2]}
                    d={
                        arc({
                            innerRadius: ICON_SIZE * 0.38,
                            outerRadius: ICON_SIZE * 0.48,
                            startAngle: degreesToRadians(160),
                            endAngle: degreesToRadians(240),
                        })!
                    }
                />
                <path
                    fill={colors[type].colors[1]}
                    d={
                        arc({
                            innerRadius: ICON_SIZE * 0.26,
                            outerRadius: ICON_SIZE * 0.36,
                            startAngle: degreesToRadians(240),
                            endAngle: degreesToRadians(360),
                        })!
                    }
                />
                <path
                    fill={colors[type].colors[1]}
                    d={
                        arc({
                            innerRadius: ICON_SIZE * 0.38,
                            outerRadius: ICON_SIZE * 0.48,
                            startAngle: degreesToRadians(240),
                            endAngle: degreesToRadians(300),
                        })!
                    }
                />
                <path
                    fill={colors[type].colors[1]}
                    d={
                        arc({
                            innerRadius: ICON_SIZE * 0.38,
                            outerRadius: ICON_SIZE * 0.48,
                            startAngle: degreesToRadians(300),
                            endAngle: degreesToRadians(360),
                        })!
                    }
                />
            </g>
        </svg>
    </Icon>
)

export const SunburstIcon = () => (
    <>
        <SunburstIconItem type="lightNeutral" />
        <IconImg url={sunburstLightNeutralImg} />
        <SunburstIconItem type="lightColored" />
        <IconImg url={sunburstLightColoredImg} />
        <SunburstIconItem type="darkNeutral" />
        <IconImg url={sunburstDarkNeutralImg} />
        <SunburstIconItem type="darkColored" />
        <IconImg url={sunburstDarkColoredImg} />
    </>
)
