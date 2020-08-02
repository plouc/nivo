/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import omit from 'lodash/omit'
import {
    BoxLegendSvg,
    ANCHOR_TOP_LEFT,
    ANCHOR_TOP,
    ANCHOR_TOP_RIGHT,
    ANCHOR_RIGHT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_LEFT,
    ANCHOR_CENTER,
} from '@nivo/legends'
import { useTheme } from '../../../theming/context'

const anchors = [
    ANCHOR_TOP_LEFT,
    ANCHOR_TOP,
    ANCHOR_TOP_RIGHT,
    ANCHOR_RIGHT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_LEFT,
    ANCHOR_CENTER,
]

const translateExamples = [
    {
        anchor: ANCHOR_TOP,
        translateX: -160,
        translateY: -30,
    },
    {
        anchor: ANCHOR_LEFT,
        translateX: -30,
        translateY: 50,
    },
    {
        anchor: ANCHOR_RIGHT,
        translateX: -30,
        translateY: -60,
    },
    {
        anchor: ANCHOR_BOTTOM,
        translateX: 160,
        translateY: 30,
    },
]

const margin = 30
const legendProps = {
    containerWidth: 800 - margin * 2,
    containerHeight: 300 - margin * 2,
    itemWidth: 120,
    itemHeight: 16,
    itemsSpacing: 4,
    direction: 'column',
}

const LegendPosition = () => {
    const theme = useTheme()

    return (
        <div>
            <h2>Legend position</h2>
            <p>
                The legend can be positioned in your chart area using the <code>anchor</code>{' '}
                property.
                <br />
                You have 9 available directives:
            </p>
            <svg
                width={legendProps.containerWidth + margin * 2}
                height={legendProps.containerHeight + margin * 2}
                style={{
                    background: theme.colors.cardBackground,
                }}
            >
                <text
                    x={legendProps.containerWidth / 2 + margin}
                    y={margin / 2}
                    textAnchor="middle"
                    style={{
                        alignmentBaseline: 'middle',
                        fill: theme.colors.textLight,
                        fontSize: '14px',
                    }}
                >
                    margin
                </text>
                <g transform={`translate(${margin},${margin})`}>
                    <rect
                        fill={theme.colors.background}
                        width={legendProps.containerWidth}
                        height={legendProps.containerHeight}
                    />
                    {anchors.map(anchor => (
                        <BoxLegendSvg
                            {...legendProps}
                            itemTextColor={theme.colors.text}
                            key={anchor}
                            anchor={anchor}
                            data={[
                                { id: 'a', label: anchor, color: theme.colors.accent },
                                { id: 'b', label: '...', color: theme.colors.accent },
                                { id: 'c', label: '...', color: theme.colors.accent },
                            ]}
                        />
                    ))}
                </g>
            </svg>
            <p>
                The legend's anchor is relative to the inner chart area (with margin applied), but
                depending on the chart type, you'll probably want to move it outside of this area.
                <br />
                That's where <code>translateX</code> & <code>translateY</code> come into play,
                allowing to adjust the legend position from its original anchor.
            </p>
            <svg
                width={legendProps.containerWidth + margin * 2}
                height={legendProps.containerHeight + margin * 2}
                style={{
                    background: theme.colors.cardBackground,
                }}
            >
                <text
                    x={legendProps.containerWidth / 2 + margin}
                    y={margin / 2}
                    textAnchor="middle"
                    style={{
                        alignmentBaseline: 'middle',
                        fill: theme.colors.textLight,
                        fontSize: '14px',
                    }}
                >
                    margin
                </text>
                <g transform={`translate(${margin},${margin})`}>
                    <rect
                        fill={theme.colors.background}
                        width={legendProps.containerWidth}
                        height={legendProps.containerHeight}
                    />
                    {translateExamples.map((example, i) => (
                        <BoxLegendSvg
                            key={i}
                            {...legendProps}
                            {...omit(example, ['translateX', 'translateY'])}
                            itemTextColor={theme.colors.text}
                            data={[
                                {
                                    id: example.anchor,
                                    label: `${example.anchor} (regular)`,
                                    color: theme.colors.text,
                                },
                            ]}
                        />
                    ))}
                    {translateExamples.map((example, i) => (
                        <BoxLegendSvg
                            key={i}
                            {...legendProps}
                            {...example}
                            itemTextColor={theme.colors.text}
                            data={[
                                {
                                    id: 'a',
                                    label: `${example.anchor} (translated)`,
                                    color: theme.colors.accent,
                                },
                                {
                                    id: 'b',
                                    label: `translateX: ${example.translateX}`,
                                    color: theme.colors.accent,
                                },
                                {
                                    id: 'c',
                                    label: `translateY: ${example.translateY}`,
                                    color: theme.colors.accent,
                                },
                            ]}
                        />
                    ))}
                </g>
            </svg>
        </div>
    )
}

export default LegendPosition
