/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import treemapLightNeutralImg from '../../assets/icons/treemap-light-neutral.png'
import treemapLightColoredImg from '../../assets/icons/treemap-light-colored.png'
import treemapDarkNeutralImg from '../../assets/icons/treemap-dark-neutral.png'
import treemapDarkColoredImg from '../../assets/icons/treemap-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const width = ICON_SIZE
const height = ICON_SIZE * 0.7
const spacing = 2

const TreeMapIconItem = ({ type }) => (
    <Icon id={`treemap-${type}`} type={type}>
        <svg width={ICON_SIZE} height={ICON_SIZE}>
            <g transform={`translate(${(ICON_SIZE - width) / 2},${(ICON_SIZE - height) / 2})`}>
                <rect
                    width={width * 0.5 - spacing / 2}
                    height={height * 0.8 - spacing / 2}
                    rx={3}
                    ry={3}
                    fill={colors[type].colors[1]}
                />
                <rect
                    y={height * 0.8 + spacing / 2}
                    width={width * 0.5 - spacing / 2}
                    height={height * 0.2 - spacing / 2}
                    rx={3}
                    ry={3}
                    fill={colors[type].colors[3]}
                />
                <rect
                    x={width * 0.5 + spacing / 2}
                    width={width * 0.25 - spacing * 0.75}
                    height={height * 0.4 - spacing / 2}
                    rx={3}
                    ry={3}
                    fill={colors[type].colors[2]}
                />
                <rect
                    x={width * 0.5 + spacing / 2}
                    y={height * 0.4 + spacing / 2}
                    width={width * 0.25 - spacing * 0.75}
                    height={height * 0.6 - spacing / 2}
                    rx={3}
                    ry={3}
                    fill={colors[type].colors[4]}
                />
                <rect
                    x={width * 0.75 + spacing * 0.75}
                    width={width * 0.25 - spacing * 0.75}
                    height={height * 0.6 - spacing / 2}
                    rx={3}
                    ry={3}
                    fill={colors[type].colors[2]}
                />
                <rect
                    x={width * 0.75 + spacing * 0.75}
                    y={height * 0.6 + spacing / 2}
                    width={width * 0.25 - spacing * 0.75}
                    height={height * 0.4 - spacing / 2}
                    rx={3}
                    ry={3}
                    fill={colors[type].colors[3]}
                />
            </g>
        </svg>
    </Icon>
)

const TreeMapIcon = () => (
    <>
        <TreeMapIconItem type="lightNeutral" />
        <IconImg url={treemapLightNeutralImg} />
        <TreeMapIconItem type="lightColored" />
        <IconImg url={treemapLightColoredImg} />
        <TreeMapIconItem type="darkNeutral" />
        <IconImg url={treemapDarkNeutralImg} />
        <TreeMapIconItem type="darkColored" />
        <IconImg url={treemapDarkColoredImg} />
    </>
)

export default TreeMapIcon
