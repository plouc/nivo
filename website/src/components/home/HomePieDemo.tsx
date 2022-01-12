import React, { useMemo } from 'react'
import { generateProgrammingLanguageStats } from '@nivo/generators'
import { Pie } from '@nivo/pie'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomePieDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()
    const data = useMemo(
        () =>
            generateProgrammingLanguageStats(true, 12).map(d => ({
                id: d.label,
                ...d,
            })),
        []
    )

    return (
        <div id="pie">
            <Pie
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={data}
                innerRadius={0.6}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                colors={colors}
                borderWidth={1}
                borderColor={colors[3]}
                animate={false}
                isInteractive={false}
                theme={nivoTheme}
            />
        </div>
    )
}
