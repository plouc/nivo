import React from 'react'
import {
    LegendSvgItem,
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_TOP_TO_BOTTOM,
    DIRECTION_BOTTOM_TO_TOP,
} from '@nivo/legends'
import theme from '../../../nivoTheme'

const itemDirections = [
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_TOP_TO_BOTTOM,
    DIRECTION_BOTTOM_TO_TOP,
]

const itemsProps = {
    x: 0,
    y: 0,
    width: 160,
    height: 40,
    data: {
        id: 'demo',
        color: '#dc5a32',
    },
    theme,
}

export default () => (
    <div>
        <h2>Legend item direction</h2>
        <p>
            The <code>itemDirection</code> property defines how symbol and label are positioned.
            <br />
            You have 4 available directives:
        </p>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {itemDirections.map(dir => (
                <div
                    key={dir}
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
                                label: dir,
                            }}
                            direction={dir}
                        />
                    </svg>
                </div>
            ))}
        </div>
        <p>
            The behavior is slightly different if you set <code>justify</code> to <code>true</code>{' '}
            as the label will be positioned at the opposite of the symbol, filling up the whole
            width/height of the legend's item.
        </p>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {itemDirections.map(dir => (
                <div
                    key={dir}
                    style={{
                        background: 'white',
                        padding: '9px 12px',
                        display: 'flex',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <svg key={dir} width={itemsProps.width} height={itemsProps.height}>
                        <LegendSvgItem
                            {...itemsProps}
                            data={{
                                ...itemsProps.data,
                                label: dir,
                            }}
                            direction={dir}
                            justify={true}
                        />
                    </svg>
                </div>
            ))}
        </div>
    </div>
)
