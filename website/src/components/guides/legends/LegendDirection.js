/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { BoxLegendSvg } from '@nivo/legends'
import { useTheme } from '../../../theming/context'

const legendProps = {
    containerWidth: 800,
    containerHeight: 90,
    itemWidth: 70,
    itemHeight: 24,
}

const LegendDirection = () => {
    const theme = useTheme()

    return (
        <div>
            <h2>Legend direction</h2>
            <p>
                Legends support two directions, using the <code>direction</code> property,{' '}
                <code>column</code> or <code>row</code>.
            </p>
            <svg width={legendProps.containerWidth} height={legendProps.containerHeight}>
                <BoxLegendSvg
                    {...legendProps}
                    itemTextColor={theme.colors.text}
                    anchor="left"
                    direction="column"
                    data={[
                        { id: 'a', label: `column`, color: theme.colors.accent },
                        { id: 'b', label: `column`, color: theme.colors.accent },
                        { id: 'c', label: `column`, color: theme.colors.accent },
                    ]}
                />
                <BoxLegendSvg
                    {...legendProps}
                    itemTextColor={theme.colors.text}
                    anchor="left"
                    translateX={260}
                    direction="row"
                    data={[
                        { id: 'a', label: `row`, color: theme.colors.accent },
                        { id: 'b', label: `row`, color: theme.colors.accent },
                        { id: 'c', label: `row`, color: theme.colors.accent },
                    ]}
                />
            </svg>
        </div>
    )
}

export default LegendDirection
