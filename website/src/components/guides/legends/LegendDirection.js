import React from 'react'
import { BoxLegendSvg } from '@nivo/legends'

const legendProps = {
    containerWidth: 800,
    containerHeight: 90,
    itemWidth: 70,
    itemHeight: 24,
}

export default () => (
    <div>
        <h2>Legend direction</h2>
        <p>
            Legends support two directions, using the <code>direction</code> property,{' '}
            <code>column</code> or <code>row</code>.
        </p>
        <svg width={legendProps.containerWidth} height={legendProps.containerHeight}>
            <BoxLegendSvg
                {...legendProps}
                anchor="left"
                direction="column"
                data={[
                    { label: `column`, fill: '#dc5a32' },
                    { label: `column`, fill: '#dc5a32' },
                    { label: `column`, fill: '#dc5a32' },
                ]}
            />
            <BoxLegendSvg
                {...legendProps}
                anchor="left"
                translateX={260}
                direction="row"
                data={[
                    { label: `row`, fill: '#dc5a32' },
                    { label: `row`, fill: '#dc5a32' },
                    { label: `row`, fill: '#dc5a32' },
                ]}
            />
        </svg>
    </div>
)
