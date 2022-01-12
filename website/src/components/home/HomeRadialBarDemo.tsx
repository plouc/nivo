import React, { useMemo } from 'react'
import { RadialBar } from '@nivo/radial-bar'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

const generateData = () => {
    const ids = ['Supermarket', 'Combini', 'Online', 'Marché']
    const categories = ['Vegetables', 'Fruits', 'Meat']

    return ids.map(id => ({
        id,
        data: categories.map(category => ({
            x: category,
            y: Math.round(Math.random() * 300),
        })),
    }))
}

export const HomeRadialBarDemo = () => {
    const data = useMemo(() => generateData(), [])
    const { colors, nivoTheme } = useHomeTheme()

    return (
        <div id="radial-bar">
            <RadialBar
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                tracksColor={`${colors[0]}44`}
                colors={colors.slice(1)}
                endAngle={315}
                borderWidth={1}
                borderColor={colors[3]}
                padding={0.3}
                isInteractive={false}
                animate={false}
                theme={nivoTheme}
                enableLabels={false}
                radialAxisStart={null}
                circularAxisOuter={null}
            />
        </div>
    )
}
