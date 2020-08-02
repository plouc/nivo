/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import styled from 'styled-components'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'

const boxWidth = 80
const boxHeight = 50
const boxPadding = 10
const outlineRadius = 8

const anchors = [
    ['center', boxWidth / 2, boxHeight / 2],
    ['top-left', 0, 0],
    ['top', boxWidth / 2, 0],
    ['top-right', boxWidth, 0],
    ['right', boxWidth, boxHeight / 2],
    ['bottom-right', boxWidth, boxHeight],
    ['bottom', boxWidth / 2, boxHeight],
    ['bottom-left', 0, boxHeight],
    ['left', 0, boxHeight / 2],
]

const Row = styled.div`
    display: flex;
    align-items: center;
`

const Rect = styled.rect`
    fill: none;
    stroke: ${({ theme }) => theme.colors.textLight};
    stroke-width: 2px;
    stroke-opacity: 0.6;
`

const Dot = styled.circle`
    fill: ${({ isSelected, theme }) => (isSelected ? theme.colors.accent : theme.colors.textLight)};
`

const DotOutline = styled.circle`
    fill: red;
    fill-opacity: 0;
    stroke-width: 2px;
    stroke: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.accent : theme.colors.textLight};
    stroke-opacity: ${({ isSelected }) => (isSelected ? 1 : 0)};

    &:hover {
        stroke-opacity: 1;
    }
`

const Value = styled.span`
    margin-left: 20px;
`

const BoxAnchorControl = ({ id, property, flavors, currentFlavor, value, onChange }) => {
    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} />
            <Row>
                <svg width={boxWidth + boxPadding * 2} height={boxHeight + boxPadding * 2}>
                    <g transform={`translate(${boxPadding},${boxPadding})`}>
                        <Rect width={boxWidth} height={boxHeight} />
                        {anchors.map(anchor => {
                            const isSelected = value === anchor[0]

                            return (
                                <g
                                    key={anchor[0]}
                                    transform={`translate(${anchor[1]},${anchor[2]})`}
                                >
                                    <Dot isSelected={isSelected} r={isSelected ? 3 : 2} />
                                    <DotOutline
                                        isSelected={isSelected}
                                        r={outlineRadius}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            onChange(anchor[0])
                                        }}
                                    />
                                </g>
                            )
                        })}
                    </g>
                </svg>
                <Value>{value}</Value>
            </Row>
            <Help>{property.help}</Help>
        </Control>
    )
}

export default BoxAnchorControl
