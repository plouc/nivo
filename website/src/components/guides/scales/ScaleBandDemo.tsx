import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { ScaleBandSpec, bandScaleDefaults } from '@nivo/scales'
import { ResponsiveBar } from '@nivo/bar'
import { ChartProperty } from '../../../types'
import { ControlsGroup } from '../../controls/ControlsGroup'
import {
    ScaleDemoContainer,
    ScaleDemoHeader,
    ScaleDemoControls,
    ScaleDemoConfigObject,
    ScaleDemoChartWrapper,
    ScaleDemoChartContainer,
} from './demo'

const SCALE_PROPS: ChartProperty[] = [
    {
        group: 'scale',
        name: 'round',
        key: 'round',
        help: `Round positions and bandwidth to the nearest integer.`,
        type: `boolean`,
        control: {
            type: 'switch',
        },
    },
]

export const ScaleBandDemo = ({ onClose }: { onClose: () => void }) => {
    const theme = useTheme()

    const [config, setConfig] = useState<ScaleBandSpec>(bandScaleDefaults)

    const chartsTheme = {
        ...theme.nivo,
        labels: {
            ...theme.nivo.labels,
            text: {
                ...theme.nivo.labels!.text,
                fontWeight: 600,
            },
        },
    }

    return (
        <ScaleDemoContainer>
            <ScaleDemoHeader type="band" onClose={onClose} />
            <ScaleDemoConfigObject>{`scale={{ type: 'band', round: ${config.round} }}`}</ScaleDemoConfigObject>
            <ScaleDemoControls>
                <ControlsGroup
                    name="band"
                    controls={SCALE_PROPS}
                    settings={config}
                    onChange={setConfig}
                    context={{
                        path: ['band'],
                    }}
                />
            </ScaleDemoControls>
            <ScaleDemoChartWrapper>
                <ScaleDemoChartContainer style={{ height: '320px', maxWidth: '600px' }}>
                    <ResponsiveBar
                        indexScale={config}
                        margin={{
                            top: 30,
                            right: 20,
                            bottom: 66,
                            left: 20,
                        }}
                        colors={['rgb(151, 227, 213)']}
                        theme={chartsTheme}
                        enableGridY={false}
                        enableLabel={false}
                        label="indexValue"
                        labelTextColor="#000000"
                        axisLeft={null}
                        borderRadius={2}
                        padding={0.03}
                        axisBottom={{
                            legend: 'Band scale used on the x-axis of a bar chart',
                            tickSize: 0,
                            tickPadding: 8,
                            legendOffset: 36,
                        }}
                        animate={false}
                        isInteractive={false}
                        data={[
                            {
                                id: 'Band A',
                                value: 100,
                            },
                            {
                                id: 'Band B',
                                value: 75,
                            },
                            {
                                id: 'Band C',
                                value: 50,
                            },
                            {
                                id: 'Band D',
                                value: 25,
                            },
                            {
                                id: 'Band E',
                                value: 50,
                            },
                            {
                                id: 'Band F',
                                value: 75,
                            },
                            {
                                id: 'Band G',
                                value: 100,
                            },
                        ]}
                    />
                </ScaleDemoChartContainer>
            </ScaleDemoChartWrapper>
        </ScaleDemoContainer>
    )
}
