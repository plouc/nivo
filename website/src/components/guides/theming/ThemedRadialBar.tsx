import React, { useMemo } from 'react'
import { CompleteTheme } from '@nivo/core'
import { ResponsiveRadialBar } from '@nivo/radial-bar'

export const ThemedRadialBar = ({ theme }: { theme: CompleteTheme }) => {
    const data = useMemo(
        () => [
            {
                id: 'Supermarket',
                data: [
                    {
                        x: 'Vegetables',
                        y: 60,
                    },
                    {
                        x: 'Fruits',
                        y: 22,
                    },
                    {
                        x: 'Meat',
                        y: 46,
                    },
                ],
            },
            {
                id: 'Combini',
                data: [
                    {
                        x: 'Vegetables',
                        y: 264,
                    },
                    {
                        x: 'Fruits',
                        y: 148,
                    },
                    {
                        x: 'Meat',
                        y: 246,
                    },
                ],
            },
            {
                id: 'Online',
                data: [
                    {
                        x: 'Vegetables',
                        y: 98,
                    },
                    {
                        x: 'Fruits',
                        y: 224,
                    },
                    {
                        x: 'Meat',
                        y: 83,
                    },
                ],
            },
        ],
        []
    )
    return (
        <ResponsiveRadialBar
            margin={{
                top: 36,
                bottom: 36,
            }}
            data={data}
            theme={theme}
            animate={false}
        />
    )
}
