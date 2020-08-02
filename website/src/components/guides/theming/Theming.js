import React, { useState } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { defaultTheme } from '@nivo/core'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import PageContent from '../../PageContent'
import ChartControlGroups from '../../controls/ChartControlGroups'
import { DescriptionBlock } from '../../styled'

const Container = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 24px;
`

const initialTheme = {
    background: '#ffffff', // defaultTheme.background,
    textColor: defaultTheme.textColor,
    fontSize: defaultTheme.fontSize,
    axis: {
        domain: {
            line: {
                stroke: '#777777', // defaultTheme.axis.domain.line.stroke,
                strokeWidth: defaultTheme.axis.domain.line.strokeWidth,
            },
        },
        ticks: {
            line: {
                stroke: defaultTheme.axis.ticks.line.stroke,
                strokeWidth: defaultTheme.axis.ticks.line.strokeWidth,
            },
        },
    },
    grid: {
        line: {
            stroke: defaultTheme.grid.line.stroke,
            strokeWidth: defaultTheme.grid.line.strokeWidth,
        },
    },
}

const controlGroups = [
    {
        name: 'Global',
        controls: [
            {
                name: 'background',
                help: 'main background color.',
                type: 'colorPicker',
            },
            {
                name: 'textColor',
                help: 'main text color.',
                type: 'colorPicker',
            },
            // fontFamily: 'sans-serif',
            {
                name: 'fontSize',
                help: 'main font size.',
                type: 'range',
                unit: 'px',
                min: 6,
                max: 36,
            },
        ],
    },
    {
        name: 'Axis',
        controls: [
            {
                name: 'axis.domain.line.stroke',
                type: 'colorPicker',
            },
            {
                name: 'axis.domain.line.strokeWidth',
                type: 'range',
                unit: 'px',
                min: 0,
                max: 32,
            },
            {
                name: 'axis.ticks.line.stroke',
                type: 'colorPicker',
            },
            {
                name: 'axis.ticks.line.strokeWidth',
                type: 'range',
                unit: 'px',
                min: 0,
                max: 32,
            },
        ],
    },
    {
        name: 'Grid',
        controls: [
            {
                name: 'grid.line.stroke',
                type: 'colorPicker',
            },
            {
                name: 'grid.line.strokeWidth',
                type: 'range',
                unit: 'px',
                min: 0,
                max: 32,
            },
        ],
    },
]

const Theming = () => {
    const [theme, setTheme] = useState(initialTheme)

    return (
        <PageContent>
            <Helmet title="Theming" />
            <div className="guide__header">
                <h1>Theming</h1>
            </div>
            <DescriptionBlock>
                <p>
                    nivo supports theming via the <code>theme</code> property, this property must
                    contain an object which defines various styles to be applied to your charts. If
                    you don't provide a theme, the default theme will be used. When you provide a
                    theme, you don't have to provide all properties as it will get merged with the
                    default theme.
                </p>
                <p>
                    There are a few things to notice while theming your components. Values for
                    font-size, borders… are <strong>unitless</strong> as nivo supports several
                    implementations (SVG, HTML, Canvas), however you can pass extra CSS attributes
                    when using a specific implementation, for example, you might add a
                    stroke-dasharray to the grid lines when using the SVG implementation of the Bar
                    component, however it will have no effect on BarCanvas as it doesn'r support it.
                    The theme only drives the base style of the charts, for things such as symbol
                    colors, patterns, legends, you'll have to use the dedicated properties.
                </p>
                <Container>
                    <div>
                        <ChartControlGroups
                            ns="theming"
                            scope="*"
                            group="Global"
                            settings={theme}
                            onChange={setTheme}
                            groups={controlGroups}
                        />
                    </div>
                    <div>
                        <div style={{ height: 160 }}>
                            <ResponsiveBar
                                margin={{
                                    top: 10,
                                    right: 10,
                                    bottom: 30,
                                    left: 30,
                                }}
                                data={[
                                    { id: 'A', value: 12 },
                                    { id: 'B', value: 17 },
                                    { id: 'C', value: 9 },
                                    { id: 'D', value: 15 },
                                    { id: 'E', value: 23 },
                                ]}
                                theme={theme}
                                animate={false}
                            />
                        </div>
                        <div style={{ height: 160 }}>
                            <ResponsiveLine
                                margin={{
                                    top: 10,
                                    right: 10,
                                    bottom: 30,
                                    left: 30,
                                }}
                                data={[
                                    {
                                        id: 'default',
                                        data: [
                                            { x: 'A', y: 12 },
                                            { x: 'B', y: 17 },
                                            { x: 'C', y: 9 },
                                            { x: 'D', y: 15 },
                                            { x: 'E', y: 23 },
                                        ],
                                    },
                                ]}
                                enableDots={true}
                                enableDotLabel={true}
                                theme={theme}
                                animate={false}
                            />
                        </div>
                    </div>
                </Container>
            </DescriptionBlock>
        </PageContent>
    )
}

export default Theming
