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
import theme from '../../../nivoTheme'

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

export default () => (
    <div>
        <h2>Legend position</h2>
        <p>
            The legend can be positioned in your chart area using the <code>anchor</code> property.
            <br />
            You have 9 available directives:
        </p>
        <svg
            width={legendProps.containerWidth + margin * 2}
            height={legendProps.containerHeight + margin * 2}
            style={{
                background: '#eee',
            }}
        >
            <text
                x={legendProps.containerWidth / 2 + margin}
                y={margin / 2}
                textAnchor="middle"
                style={{
                    alignmentBaseline: 'middle',
                    fill: '#999',
                    fontSize: '14px',
                }}
            >
                margin
            </text>
            <g transform={`translate(${margin},${margin})`}>
                <rect
                    fill="#f7fafb"
                    width={legendProps.containerWidth}
                    height={legendProps.containerHeight}
                />
                {anchors.map(anchor => (
                    <BoxLegendSvg
                        {...legendProps}
                        key={anchor}
                        anchor={anchor}
                        data={[
                            { id: 'a', label: anchor, color: '#dc5a32' },
                            { id: 'b', label: '...', color: '#dc5a32' },
                            { id: 'c', label: '...', color: '#dc5a32' },
                        ]}
                        theme={theme}
                    />
                ))}
            </g>
        </svg>
        <p>
            The legend's anchor is relative to the inner chart area (with margin applied), but
            depending on the chart type, you'll probably want to move it outside of this area.
            <br />
            That's where <code>translateX</code> & <code>translateY</code> come into play, allowing
            to adjust the legend position from its original anchor.
        </p>
        <svg
            width={legendProps.containerWidth + margin * 2}
            height={legendProps.containerHeight + margin * 2}
            style={{
                background: '#eee',
            }}
        >
            <text
                x={legendProps.containerWidth / 2 + margin}
                y={margin / 2}
                textAnchor="middle"
                style={{
                    alignmentBaseline: 'middle',
                    fill: '#999',
                    fontSize: '14px',
                }}
            >
                margin
            </text>
            <g transform={`translate(${margin},${margin})`}>
                <rect
                    fill="#f7fafb"
                    width={legendProps.containerWidth}
                    height={legendProps.containerHeight}
                />
                {translateExamples.map((example, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legendProps}
                        {...omit(example, ['translateX', 'translateY'])}
                        data={[
                            {
                                id: example.anchor,
                                label: `${example.anchor} (regular)`,
                                color: 'rgb(232, 193, 160)',
                            },
                        ]}
                        theme={theme}
                    />
                ))}
                {translateExamples.map((example, i) => (
                    <BoxLegendSvg
                        key={i}
                        {...legendProps}
                        {...example}
                        data={[
                            {
                                id: 'a',
                                label: `${example.anchor} (translated)`,
                                color: '#dc5a32',
                            },
                            {
                                id: 'b',
                                label: `translateX: ${example.translateX}`,
                                color: '#dc5a32',
                            },
                            {
                                id: 'c',
                                label: `translateY: ${example.translateY}`,
                                color: '#dc5a32',
                            },
                        ]}
                        theme={theme}
                    />
                ))}
            </g>
        </svg>
    </div>
)
