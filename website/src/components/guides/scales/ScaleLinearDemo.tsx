import React, { useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import { linearScaleDefaults, ScaleLinearSpec } from '@nivo/scales'
import { ResponsiveBar } from '@nivo/bar'
import { sets } from '@nivo/generators'
import { ChartProperty } from '../../../types'
import { ControlsGroup } from '../../controls/ControlsGroup'
import { SCALES_CONFIG_PROPS } from './scalesConfig'
import {
    ScaleDemoContainer,
    ScaleDemoHeader,
    ScaleDemoControls,
    ScaleDemoConfigObject,
    ScaleDemoChartWrapper,
    ScaleDemoChartContainer,
} from './demo'
import { RangeControlConfig } from '../../controls/types'

const SCALE_PROPS: ChartProperty[] = [
    {
        ...SCALES_CONFIG_PROPS.min,
        control: {
            ...SCALES_CONFIG_PROPS.min.control,
            min: 0,
            max: 120,
        } as RangeControlConfig,
    },
    {
        ...SCALES_CONFIG_PROPS.max,
        control: {
            ...SCALES_CONFIG_PROPS.max.control,
            min: 0,
            max: 120,
        } as RangeControlConfig,
    },
    SCALES_CONFIG_PROPS.nice,
    SCALES_CONFIG_PROPS.round,
    SCALES_CONFIG_PROPS.reverse,
    SCALES_CONFIG_PROPS.clamp,
]

export const ScaleLinearDemo = ({ onClose }: { onClose: () => void }) => {
    const theme = useTheme()

    const [config, setConfig] = useState<ScaleLinearSpec>({
        ...linearScaleDefaults,
    })

    const data = useMemo(() => sets.averageHeightByAge.filter(d => d.age % 5 === 0), [])

    return (
        <ScaleDemoContainer>
            <ScaleDemoHeader type="linear" onClose={onClose} />
            <ScaleDemoConfigObject>
                {`scale={{ type: 'linear', min: ${typeof config.min === 'string' ? `'${config.min}'` : config.min}, max: ${typeof config.max === 'string' ? `'${config.max}'` : config.max}, nice: ${config.nice}, round: ${config.round}, reverse: ${config.reverse}, clamp: ${config.clamp} }}`}
            </ScaleDemoConfigObject>
            <ScaleDemoControls>
                <ControlsGroup
                    name="linear"
                    controls={SCALE_PROPS}
                    settings={config}
                    onChange={setConfig}
                    context={{
                        path: ['linear'],
                    }}
                />
            </ScaleDemoControls>
            <ScaleDemoChartWrapper>
                <ScaleDemoChartContainer style={{ height: '340px' }}>
                    <ResponsiveBar
                        keys={['male', 'female']}
                        indexBy="age"
                        groupMode="grouped"
                        margin={{
                            top: 12,
                            right: 20,
                            bottom: 60,
                            left: 60,
                        }}
                        valueScale={config}
                        padding={0.16}
                        innerPadding={1}
                        valueFormat={v => `${v} cm`}
                        colors={['rgb(151, 227, 213)', 'rgb(243,135,117)']}
                        theme={theme.nivo}
                        axisBottom={{
                            tickSize: 0,
                            tickPadding: 7,
                            format: v => `${v} yrs`,
                            tickRotation: -90,
                            legend: 'Age',
                            legendPosition: 'start',
                            legendOffset: 46,
                        }}
                        enableLabel={false}
                        axisLeft={{
                            tickSize: 0,
                            tickPadding: 7,
                            format: v => `${v} cm`,
                            legend: 'Height',
                            legendPosition: 'end',
                            legendOffset: 14,
                        }}
                        animate={false}
                        isInteractive={false}
                        data={data}
                        debounceResize={200}
                    />
                </ScaleDemoChartContainer>
            </ScaleDemoChartWrapper>
        </ScaleDemoContainer>
    )
}
