/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState } from 'react'
import styled from 'styled-components'
import { defaultTheme } from '@nivo/core'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import PageContent from '../../components/PageContent'
import ControlsGroups from '../../components/controls/ControlsGroups'
import { DescriptionBlock } from '../../components/styled'

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
        properties: [
            {
                name: 'background',
                help: 'main background color.',
                controlType: 'colorPicker',
            },
            {
                name: 'textColor',
                help: 'main text color.',
                controlType: 'colorPicker',
            },
            // fontFamily: 'sans-serif',
            {
                name: 'fontSize',
                help: 'main font size.',
                controlType: 'range',
                controlOptions: {
                    unit: 'px',
                    min: 6,
                    max: 36,
                },
            },
        ],
    },
    {
        name: 'Axis',
        properties: [
            {
                name: 'axis.domain.line.stroke',
                controlType: 'colorPicker',
            },
            {
                name: 'axis.domain.line.strokeWidth',
                controlType: 'range',
                controlOptions: {
                    unit: 'px',
                    min: 0,
                    max: 32,
                },
            },
            {
                name: 'axis.ticks.line.stroke',
                controlType: 'colorPicker',
            },
            {
                name: 'axis.ticks.line.strokeWidth',
                controlType: 'range',
                controlOptions: {
                    unit: 'px',
                    min: 0,
                    max: 32,
                },
            },
        ],
    },
    {
        name: 'Grid',
        properties: [
            {
                name: 'grid.line.stroke',
                controlType: 'colorPicker',
            },
            {
                name: 'grid.line.strokeWidth',
                controlType: 'range',
                controlOptions: {
                    unit: 'px',
                    min: 0,
                    max: 32,
                },
            },
        ],
    },
]

const Theming = () => {
    const [theme, setTheme] = useState(initialTheme)

    return (
        <Layout>
            <PageContent>
                <SEO title="Theming Guide" />
                <div className="guide__header">
                    <h1>Theming</h1>
                </div>
                <DescriptionBlock>
                    <p>
                        nivo supports theming via the <code>theme</code> property, this property
                        must contain an object which defines various styles to be applied to your
                        charts. If you don't provide a theme, the default theme will be used. When
                        you provide a theme, you don't have to provide all properties as it will get
                        merged with the default theme.
                    </p>
                    <p>
                        There are a few things to notice while theming your components. Values for
                        font-size, borders… are <strong>unitless</strong> as nivo supports several
                        implementations (SVG, HTML, Canvas), however you can pass extra CSS
                        attributes when using a specific implementation, for example, you might add
                        a stroke-dasharray to the grid lines when using the SVG implementation of
                        the Bar component, however it will have no effect on BarCanvas as it doesn'r
                        support it. The theme only drives the base style of the charts, for things
                        such as symbol colors, patterns, legends, you'll have to use the dedicated
                        properties.
                    </p>
                    <Container>
                        <div>
                            <ControlsGroups
                                groups={controlGroups}
                                value={theme}
                                onChange={setTheme}
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
        </Layout>
    )
}

export default Theming
