import React, { useMemo } from 'react'
import { generateChordData } from '@nivo/generators'
import { ResponsiveChordCanvas } from '@nivo/chord'
import { HomeItem, HomeItemLabel } from './styled'

export const HomeChord = ({ colors }: { colors: string[] }) => {
    const { matrix, keys } = useMemo(() => generateChordData({ size: 7 }), [])

    return (
        <HomeItem to="/chord/">
            <ResponsiveChordCanvas
                data={matrix}
                keys={keys}
                colors={colors}
                padAngle={0.04}
                innerRadiusRatio={0.9}
                enableLabel={false}
                isInteractive={false}
                animate={false}
                arcBorderWidth={0}
                ribbonBorderWidth={0}
            />
            <HomeItemLabel>
                <span>Chord documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}
