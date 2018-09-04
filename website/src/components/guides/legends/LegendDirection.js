import React from 'react'
import { BoxLegendSvg } from '@nivo/legends'
import theme from '../../../nivoTheme'

const legendProps = {
    containerWidth: 800,
    containerHeight: 90,
    itemWidth: 70,
    itemHeight: 24,
    theme,
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
                    { id: 'a', label: `column`, color: '#dc5a32' },
                    { id: 'b', label: `column`, color: '#dc5a32' },
                    { id: 'c', label: `column`, color: '#dc5a32' },
                ]}
            />
            <BoxLegendSvg
                {...legendProps}
                anchor="left"
                translateX={260}
                direction="row"
                data={[
                    { id: 'a', label: `row`, color: '#dc5a32' },
                    { id: 'b', label: `row`, color: '#dc5a32' },
                    { id: 'c', label: `row`, color: '#dc5a32' },
                ]}
            />
        </svg>
    </div>
)
