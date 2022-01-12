import React, { useMemo } from 'react'
import { generateChordData } from '@nivo/generators'
import { ChordCanvas } from '@nivo/chord'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

export const HomeChordDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()
    const { matrix, keys } = useMemo(() => generateChordData({ size: 7 }), [])

    return (
        <div id="chord">
            <ChordCanvas
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                data={matrix}
                keys={keys}
                colors={colors}
                padAngle={0.04}
                innerRadiusRatio={0.9}
                enableLabel={false}
                isInteractive={false}
                animate={false}
                arcBorderWidth={1}
                arcBorderColor={colors[3]}
                ribbonBorderWidth={1}
                ribbonBorderColor={colors[3]}
                theme={nivoTheme}
            />
        </div>
    )
}
