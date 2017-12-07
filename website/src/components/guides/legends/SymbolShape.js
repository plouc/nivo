import React from 'react'
import { LegendSvgItem, DIRECTION_LEFT_TO_RIGHT } from '@nivo/legends'

const shapes = ['square', 'circle', 'triangle', 'diamond']

const itemsProps = {
    x: 0,
    y: 0,
    width: 160,
    height: 40,
    fill: '#dc5a32',
}

export default () => (
    <div>
        <h2>Symbol shape</h2>
        <p>
            You can customize symbols using <code>symbolShape</code> property.
        </p>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {shapes.map(shape => (
                <div
                    key={shape}
                    style={{
                        background: 'white',
                        padding: '10px 15px',
                        borderRadius: 2,
                        display: 'flex',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <svg width={itemsProps.width} height={itemsProps.height}>
                        <LegendSvgItem
                            {...itemsProps}
                            label={shape}
                            direction={DIRECTION_LEFT_TO_RIGHT}
                            symbolShape={shape}
                        />
                    </svg>
                </div>
            ))}
        </div>
    </div>
)
