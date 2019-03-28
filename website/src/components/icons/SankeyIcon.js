/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { sankeyLinkHorizontal } from 'd3-sankey'
import sankeyLightNeutralImg from '../../assets/icons/sankey-light-neutral.png'
import sankeyLightColoredImg from '../../assets/icons/sankey-light-colored.png'
import sankeyDarkNeutralImg from '../../assets/icons/sankey-dark-neutral.png'
import sankeyDarkColoredImg from '../../assets/icons/sankey-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const nodeWidth = 6
const spacing = 2
const link = sankeyLinkHorizontal()

const SankeyIconItem = ({ type }) => (
    <Icon id={`sankey-${type}`} type={type}>
        <svg width={ICON_SIZE} height={ICON_SIZE}>
            <rect
                x={ICON_SIZE * 0.15}
                y={ICON_SIZE * 0.2}
                width={nodeWidth}
                height={ICON_SIZE * 0.1}
                fill={colors[type].colors[4]}
            />
            <rect
                y={ICON_SIZE * 0.6}
                width={nodeWidth}
                height={ICON_SIZE * 0.3}
                fill={colors[type].colors[4]}
            />
            <rect
                x={ICON_SIZE * 0.5 - nodeWidth * 0.5}
                y={ICON_SIZE * 0.3}
                width={nodeWidth}
                height={ICON_SIZE * 0.4}
                fill={colors[type].colors[4]}
            />
            <rect
                x={ICON_SIZE - nodeWidth}
                y={ICON_SIZE * 0.1}
                width={nodeWidth}
                height={ICON_SIZE * 0.25}
                fill={colors[type].colors[4]}
            />
            <rect
                x={ICON_SIZE * 0.9}
                y={ICON_SIZE * 0.7}
                width={nodeWidth}
                height={ICON_SIZE * 0.15}
                fill={colors[type].colors[4]}
            />
            <path
                fill="none"
                stroke={colors[type].colors[0]}
                strokeWidth={ICON_SIZE * 0.1}
                d={link({
                    y0: ICON_SIZE * 0.25,
                    y1: ICON_SIZE * 0.35,
                    source: {
                        x1: ICON_SIZE * 0.15 + nodeWidth + spacing,
                    },
                    target: {
                        x0: ICON_SIZE * 0.5 - nodeWidth * 0.5 - spacing,
                    },
                })}
            />
            <path
                fill="none"
                stroke={colors[type].colors[1]}
                strokeWidth={ICON_SIZE * 0.3}
                d={link({
                    y0: ICON_SIZE * 0.75,
                    y1: ICON_SIZE * 0.55,
                    source: {
                        x1: nodeWidth + spacing,
                    },
                    target: {
                        x0: ICON_SIZE * 0.5 - nodeWidth * 0.5 - spacing,
                    },
                })}
            />
            <path
                fill="none"
                stroke={colors[type].colors[2]}
                strokeWidth={ICON_SIZE * 0.25}
                d={link({
                    y0: ICON_SIZE * 0.425,
                    y1: ICON_SIZE * 0.225,
                    source: {
                        x1: ICON_SIZE * 0.5 + nodeWidth * 0.5 + spacing,
                    },
                    target: {
                        x0: ICON_SIZE - nodeWidth - spacing,
                    },
                })}
            />
            <path
                fill="none"
                stroke={colors[type].colors[0]}
                strokeWidth={ICON_SIZE * 0.15}
                d={link({
                    y0: ICON_SIZE * 0.625,
                    y1: ICON_SIZE * 0.775,
                    source: {
                        x1: ICON_SIZE * 0.5 + nodeWidth * 0.5 + spacing,
                    },
                    target: {
                        x0: ICON_SIZE * 0.9 - spacing,
                    },
                })}
            />
        </svg>
    </Icon>
)

const SankeyIcon = () => (
    <>
        <SankeyIconItem type="lightNeutral" />
        <IconImg url={sankeyLightNeutralImg} />
        <SankeyIconItem type="lightColored" />
        <IconImg url={sankeyLightColoredImg} />
        <SankeyIconItem type="darkNeutral" />
        <IconImg url={sankeyDarkNeutralImg} />
        <SankeyIconItem type="darkColored" />
        <IconImg url={sankeyDarkColoredImg} />
    </>
)

export default SankeyIcon
