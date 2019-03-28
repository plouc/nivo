/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Chord } from '@nivo/chord'
import styled from 'styled-components'
import chordLightNeutralImg from '../../assets/icons/chord-light-neutral.png'
import chordLightColoredImg from '../../assets/icons/chord-light-colored.png'
import chordDarkNeutralImg from '../../assets/icons/chord-dark-neutral.png'
import chordDarkColoredImg from '../../assets/icons/chord-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const Wrapper = styled.div`
    & svg > g > g > g:first-child path:nth-child(1),
    & svg > g > g > g:first-child path:nth-child(3) {
        fill: none;
    }
    & svg > g > g > g:first-child path:nth-child(2),
    & svg > g > g > g:first-child path:nth-child(4),
    & svg > g > g > g:first-child path:nth-child(5) {
        fill: ${({ ribbonColor }) => ribbonColor};
        fill-opacity: 1;
    }
`

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    keys: ['A', 'B', 'C', 'D'],
    matrix: [
        [0, 2, 3, 0], // A
        [2, 0, 0, 2], // B
        [4, 0, 4, 4], // C
        [0, 2, 3, 0], // D
    ],
    margin: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
    },
    innerRadiusRatio: 0.84,
    innerRadiusOffset: 0,
    padAngle: 0.05,
    arcBorderWidth: 0,
    ribbonBorderWidth: 0,
    enableLabel: false,
    isInteractive: false,
    animate: false,
}

const ChordIconItem = ({ type }) => (
    <Icon id={`chord-${type}`} type={type}>
        <Wrapper ribbonColor={colors[type].colors[1]}>
            <Chord {...chartProps} colors={[colors[type].colors[4]]} />
        </Wrapper>
    </Icon>
)

const ChordIcon = () => (
    <>
        <ChordIconItem type="lightNeutral" />
        <IconImg url={chordLightNeutralImg} />
        <ChordIconItem type="lightColored" />
        <IconImg url={chordLightColoredImg} />
        <ChordIconItem type="darkNeutral" />
        <IconImg url={chordDarkNeutralImg} />
        <ChordIconItem type="darkColored" />
        <IconImg url={chordDarkColoredImg} />
    </>
)

export default ChordIcon
