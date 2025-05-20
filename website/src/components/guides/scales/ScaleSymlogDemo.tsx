import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { ScaleSymlogSpec } from '@nivo/scales'
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
        name: 'min',
        key: 'min',
        type: `number | 'auto'`,
        help: `Minimum value, if \`auto\`, it's inferred from the data.`,
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 0,
            min: -1000,
            max: -1,
        },
    },
    {
        group: 'scale',
        name: 'max',
        key: 'max',
        help: `Maximum value, if \`auto\`, it's inferred from the data.`,
        type: `number | 'auto'`,
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 1000,
            min: 1,
            max: 1000,
        },
    },
    {
        group: 'scale',
        name: 'nice',
        key: 'nice',
        help: `Expands the values to “round” human-friendly values.`,
        type: `boolean`,
        control: {
            type: 'switch',
        },
    },
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
    {
        group: 'scale',
        name: 'reverse',
        key: 'reverse',
        help: `Reverse the scale output range (e.g. x/y position).`,
        type: `boolean`,
        control: {
            type: 'switch',
        },
    },
]

const CHARTS_PROPS = {
    margin: {
        top: 26,
        right: 46,
        bottom: 26,
        left: 46,
    },
    ticks: 5,
    debounceResize: 200,
    colorProfit: 'rgb(151, 227, 213)',
    colorLoss: 'rgb(243,135,117)',
}

export const ScaleSymlogDemo = ({ onClose }: { onClose: () => void }) => {
    const theme = useTheme()

    const [config, setConfig] = useState<ScaleSymlogSpec>({
        type: 'symlog',
        min: -1000,
        max: 1000,
        nice: true,
        round: false,
        reverse: false,
    })

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
            <ScaleDemoHeader type="symlog" onClose={onClose} />
            <ScaleDemoConfigObject>
                {`scale={{ type: 'symlog', min: ${typeof config.min === 'string' ? `'${config.min}'` : config.min}, max: ${typeof config.max === 'string' ? `'${config.max}'` : config.max}, nice: ${config.nice}, round: ${config.round}, reverse: ${config.reverse} }}`}
            </ScaleDemoConfigObject>
            <ScaleDemoControls>
                <ControlsGroup
                    name="symlog"
                    controls={SCALE_PROPS}
                    settings={config}
                    onChange={setConfig}
                    context={{
                        path: ['symlog'],
                    }}
                />
            </ScaleDemoControls>
            <ScaleDemoChartWrapper>
                <ScaleDemoChartContainer style={{ height: '300px' }}>
                    <ResponsiveBar
                        keys={['loss', 'profit']}
                        margin={CHARTS_PROPS.margin}
                        valueScale={config}
                        padding={0.03}
                        valueFormat=">-$"
                        layout="horizontal"
                        colors={[CHARTS_PROPS.colorLoss, CHARTS_PROPS.colorProfit]}
                        theme={chartsTheme}
                        enableGridX
                        gridXValues={CHARTS_PROPS.ticks}
                        enableGridY={false}
                        axisTop={{
                            tickValues: CHARTS_PROPS.ticks,
                        }}
                        axisBottom={null}
                        axisLeft={{ tickSize: 0, tickPadding: 7 }}
                        labelTextColor="#000000"
                        animate={false}
                        isInteractive={false}
                        data={[
                            {
                                id: 'Q4',
                                loss: -150,
                                profit: 10,
                            },
                            {
                                id: 'Q3',
                                loss: -100,
                                profit: 100,
                            },
                            {
                                id: 'Q2',
                                loss: -10,
                                profit: 500,
                            },
                            {
                                id: 'Q1',
                                loss: -1,
                                profit: 750,
                            },
                        ]}
                        debounceResize={CHARTS_PROPS.debounceResize}
                    />
                </ScaleDemoChartContainer>
                {/*
                The behaviour of the min/max values in auto mode with negative values
                is not the same as the one in the bar chart.
                <div style={{ height: '300px' }}>
                    <ResponsiveLine
                        margin={CHARTS_PROPS.margin}
                        data={[
                            {
                                id: 'A',
                                data: [
                                    { x: 'Jan', y: 100 },
                                    { x: 'Feb', y: 10 },
                                    { x: 'Mar', y: 500 },
                                    { x: 'Apr', y: 1000 },
                                    { x: 'May', y: 500 },
                                    { x: 'Jun', y: 500 },
                                    { x: 'Jul', y: 500 },
                                    { x: 'Aug', y: 500 },
                                    { x: 'Sep', y: 500 },
                                    { x: 'Oct', y: 500 },
                                    { x: 'Dec', y: 500 },
                                ],
                            },
                            {
                                id: 'B',
                                data: [
                                    { x: 'Jan', y: -10 },
                                    { x: 'Feb', y: -500 },
                                    { x: 'Mar', y: -10 },
                                    { x: 'Apr', y: -1 },
                                    { x: 'May', y: -500 },
                                    { x: 'Jun', y: -700 },
                                    { x: 'Jul', y: 500 },
                                    { x: 'Aug', y: 500 },
                                    { x: 'Sep', y: 500 },
                                    { x: 'Oct', y: 500 },
                                    { x: 'Dec', y: 500 },
                                ],
                            },
                        ]}
                        colors={[CHARTS_PROPS.colorProfit, CHARTS_PROPS.colorLoss]}
                        enableGridX={false}
                        xScale={{ type: 'point' }}
                        yScale={config}
                        gridYValues={CHARTS_PROPS.ticks}
                        axisLeft={{
                            tickValues: CHARTS_PROPS.ticks,
                        }}
                        axisBottom={{
                            tickSize: 0,
                            tickPadding: 7,
                        }}
                        animate={false}
                        isInteractive={false}
                        debounceResize={CHARTS_PROPS.debounceResize}
                        theme={chartsTheme}
                    />
                </div>
                */}
            </ScaleDemoChartWrapper>
        </ScaleDemoContainer>
    )
}
