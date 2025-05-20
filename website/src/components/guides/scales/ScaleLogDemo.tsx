import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { ScaleLogSpec, logScaleDefaults } from '@nivo/scales'
import { ResponsiveLine } from '@nivo/line'
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
import { SCALES_CONFIG_PROPS } from './scalesConfig'
import { RangeControlConfig } from '../../controls/types'

const SCALE_PROPS: ChartProperty[] = [
    {
        ...SCALES_CONFIG_PROPS.min,
        control: {
            ...SCALES_CONFIG_PROPS.min.control,
            min: 1,
            max: 1000,
        } as RangeControlConfig,
    },
    {
        ...SCALES_CONFIG_PROPS.max,
        control: {
            ...SCALES_CONFIG_PROPS.max.control,
            min: 10,
            max: 2000,
        } as RangeControlConfig,
    },
    SCALES_CONFIG_PROPS.nice,
    SCALES_CONFIG_PROPS.round,
    SCALES_CONFIG_PROPS.reverse,
]

export const ScaleLogDemo = ({ onClose }: { onClose: () => void }) => {
    const theme = useTheme()

    const [config, setConfig] = useState<ScaleLogSpec>({
        ...logScaleDefaults,
        min: 1,
        max: 1000,
    })

    const nivoTheme = {
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
            <ScaleDemoHeader type="log" onClose={onClose} />
            <ScaleDemoConfigObject>
                {`scale={{ type: 'log', min: ${typeof config.min === 'string' ? `'${config.min}'` : config.min}, max: ${typeof config.max === 'string' ? `'${config.max}'` : config.max}, nice: ${config.nice}, round: ${config.round}, reverse: ${config.reverse} }}`}
            </ScaleDemoConfigObject>
            <ScaleDemoControls>
                <ControlsGroup
                    name="log"
                    controls={SCALE_PROPS}
                    settings={config}
                    onChange={setConfig}
                    context={{
                        path: ['log'],
                    }}
                />
            </ScaleDemoControls>
            <ScaleDemoChartWrapper>
                <ScaleDemoChartContainer style={{ height: '300px' }}>
                    <ResponsiveLine
                        margin={{
                            top: 26,
                            right: 46,
                            bottom: 26,
                            left: 46,
                        }}
                        xScale={{
                            type: 'point',
                        }}
                        yScale={config}
                        lineWidth={3}
                        pointSize={9}
                        enablePointLabel={true}
                        colors={['rgb(243,135,117)']}
                        theme={nivoTheme}
                        axisLeft={{ tickValues: [1, 10, 100, 1000], tickSize: 0, tickPadding: 7 }}
                        axisBottom={{}}
                        animate={false}
                        isInteractive={false}
                        data={[
                            {
                                id: 'A',
                                data: [
                                    { x: 'Jan', y: 10 },
                                    { x: 'Feb', y: 1 },
                                    { x: 'Mar', y: 100 },
                                    { x: 'Apr', y: 1000 },
                                    { x: 'May', y: 700 },
                                    { x: 'Jun', y: 300 },
                                    { x: 'Jul', y: 100 },
                                    { x: 'Aug', y: 10 },
                                    { x: 'Sep', y: 1 },
                                    { x: 'Oct', y: 10 },
                                    { x: 'Dec', y: 1000 },
                                ],
                            },
                        ]}
                        debounceResize={200}
                    />
                </ScaleDemoChartContainer>
            </ScaleDemoChartWrapper>
        </ScaleDemoContainer>
    )
}
