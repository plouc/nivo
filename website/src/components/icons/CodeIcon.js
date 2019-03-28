/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import codeLightNeutralImg from '../../assets/icons/code-light-neutral.png'
import codeLightColoredImg from '../../assets/icons/code-light-colored.png'
import codeDarkNeutralImg from '../../assets/icons/data-dark-neutral.png'
import codeDarkColoredImg from '../../assets/icons/data-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const CodeIconItem = ({ type }) => (
    <Icon id={`code-${type}`} type={type}>
        <svg width={ICON_SIZE} height={ICON_SIZE}>
            <g transform={`translate(${ICON_SIZE / 2},${ICON_SIZE / 2})`}>
                <circle r={ICON_SIZE * 0.49} fill={colors[type].colors[3]} />
                <text
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fill="white"
                    dy={-5}
                    style={{
                        fontSize: '50px',
                        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
                        fontWeight: '700',
                    }}
                >
                    {`</>`}
                </text>
            </g>
        </svg>
    </Icon>
)

const CodeIcon = () => (
    <>
        <CodeIconItem type="lightNeutral" />
        <IconImg url={codeLightNeutralImg} />
        <CodeIconItem type="lightColored" />
        <IconImg url={codeLightColoredImg} />
        <CodeIconItem type="darkNeutral" />
        <IconImg url={codeDarkNeutralImg} />
        <CodeIconItem type="darkColored" />
        <IconImg url={codeDarkColoredImg} />
    </>
)

export default CodeIcon
