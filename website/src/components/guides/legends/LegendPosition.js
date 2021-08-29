import React from 'react'
import omit from 'lodash/omit'
import { BoxLegendSvg } from '@nivo/legends'
import { useTheme } from '../../../theming/context'

const anchors = [
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
    'center',
]

const translateExamples = [
    {
        anchor: 'top',
        translateX: -160,
        translateY: -30,
    },
    {
        anchor: 'left',
        translateX: -30,
        translateY: 50,
    },
    {
        anchor: 'right',
        translateX: -30,
        translateY: -60,
    },
    {
        anchor: 'bottom',
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
