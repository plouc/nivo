import React from 'react'
import dedent from 'dedent-js'
import { LegendSvgItem, DIRECTION_LEFT_TO_RIGHT } from '@nivo/legends'
import theme from '../../../nivoTheme'

const shapes = ['square', 'circle', 'triangle', 'diamond']

const itemsProps = {
    x: 0,
    y: 0,
    width: 160,
    height: 40,
    data: {
        id: 'demo',
        color: '#dc5a32',
    },
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
                            data={{
                                ...itemsProps.data,
                                label: shape,
                            }}
                            direction={DIRECTION_LEFT_TO_RIGHT}
                            symbolShape={shape}
                            theme={theme}
                        />
                    </svg>
                </div>
            ))}
        </div>
        <p>
            You can also use a custom shape passing a component to <code>symbolShape</code>:
        </p>
        <pre className="code-block guide__code">
            {dedent`const CustomSymbolShape = ({
                x, y, size, fill, borderWidth, borderColor
            }) => (
                <rect
                    x={x}
                    y={y}
                    transform={\`rotate(45 \${size/2} \${size/2})\`}
                    fill={fill}
                    strokeWidth={borderWidth}
                    stroke={borderColor}
                    width={size}
                    height={size}
                    style={{ pointerEvents: 'none' }}
                />
            )`}
        </pre>
    </div>
)
