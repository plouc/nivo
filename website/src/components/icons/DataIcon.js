/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import dataLightNeutralImg from '../../assets/icons/data-light-neutral.png'
import dataLightColoredImg from '../../assets/icons/data-light-colored.png'
import dataDarkNeutralImg from '../../assets/icons/data-dark-neutral.png'
import dataDarkColoredImg from '../../assets/icons/data-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const DataIconItem = ({ type }) => (
    <Icon id={`data-${type}`} type={type}>
        <svg width={ICON_SIZE} height={ICON_SIZE}>
            <g transform={`translate(${ICON_SIZE / 2},${ICON_SIZE / 2})`}>
                <circle r={ICON_SIZE * 0.49} fill={colors[type].colors[3]} />
                <text
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fill="white"
                    dy={-6}
                    style={{
                        fontSize: '58px',
                        fontFamily: `Courier, monospace`,
                        fontWeight: '800',
                        letterSpacing: '-5px',
                    }}
                >
                    {`{…}`}
                </text>
            </g>
        </svg>
    </Icon>
)

const DataIcon = () => (
    <>
        <DataIconItem type="lightNeutral" />
        <IconImg url={dataLightNeutralImg} />
        <DataIconItem type="lightColored" />
        <IconImg url={dataLightColoredImg} />
        <DataIconItem type="darkNeutral" />
        <IconImg url={dataDarkNeutralImg} />
        <DataIconItem type="darkColored" />
        <IconImg url={dataDarkColoredImg} />
    </>
)

export default DataIcon
