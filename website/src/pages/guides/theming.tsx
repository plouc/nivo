import React, { useState } from 'react'
import styled from 'styled-components'
import {
    // @ts-ignore
    defaultTheme,
    Theme,
} from '@nivo/core'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
// @ts-ignore
import Layout from '../../components/Layout'
import { Seo } from '../../components/Seo'
import { ComponentPage } from '../../components/components/ComponentPage'
import { ComponentHeader } from '../../components/components/ComponentHeader'
import { Markdown } from '../../components/Markdown'
// @ts-ignore
import ComponentSettings from '../../components/components/ComponentSettings'
import media from '../../theming/mediaQueries'
import { ChartProperty } from '../../types'

const initialTheme: Theme = {
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

const controlGroups: {
    name: string
    group: string
    properties: ChartProperty[]
}[] = [
    {
        name: 'Theme',
        group: 'Theme',
        properties: [
            {
                name: 'background',
                help: 'main background color.',
                control: { type: 'colorPicker' },
            },
            {
                name: 'textColor',
                help: 'main text color.',
                control: { type: 'colorPicker' },
            },
            // fontFamily: 'sans-serif',
            {
                name: 'fontSize',
                help: 'main font size.',
                control: {
                    type: 'range',
                    unit: 'px',
                    min: 6,
                    max: 36,
                },
            },
            {
                name: 'axis',
                control: {
                    type: 'object',
                    isOpenedByDefault: true,
                    props: [
                        {
                            key: 'ticks',
                            control: {
                                type: 'object',
                                isOpenedByDefault: true,
                                props: [
                                    {
                                        key: 'line',
                                        control: {
                                            type: 'object',
                                            isOpenedByDefault: true,
                                            props: [
                                                {
                                                    key: 'strokeWidth',
                                                    control: { type: 'lineWidth' },
                                                },
                                                {
                                                    key: 'stroke',
                                                    control: { type: 'colorPicker' },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            key: 'domain',
                            control: {
                                type: 'object',
                                isOpenedByDefault: true,
                                props: [
                                    {
                                        key: 'line',
                                        control: {
                                            type: 'object',
                                            isOpenedByDefault: true,
                                            props: [
                                                {
                                                    key: 'strokeWidth',
                                                    control: { type: 'lineWidth' },
                                                },
                                                {
                                                    key: 'stroke',
                                                    control: { type: 'colorPicker' },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            {
                name: 'grid',
                control: {
                    type: 'object',
                    isOpenedByDefault: true,
                    props: [
                        {
                            key: 'line',
                            control: {
                                type: 'object',
                                isOpenedByDefault: true,
                                props: [
                                    {
                                        key: 'stroke',
                                        control: { type: 'colorPicker' },
                                    },
                                    {
                                        key: 'strokeWidth',
                                        control: { type: 'lineWidth' },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        ],
    },
]

const description = `
**nivo** supports theming via the \`theme\` property, this property
must contain an object which defines various styles to be applied to your
charts. If you don't provide a theme, the default theme will be used. When
you provide a theme, you don't have to provide all properties as it will get
merged with the default theme.

There are a few things to notice while theming your components. Values for
font-size, borders… are **unitless** as nivo supports several
implementations (SVG, HTML, Canvas), however you can pass extra CSS
attributes when using a specific implementation, for example, you might add
a stroke-dasharray to the grid lines when using the SVG implementation of
the Bar component, however it will have no effect on BarCanvas as it doesn't
support it. The theme only drives the base style of the charts, for things
such as symbol colors, patterns, legends, you'll have to use the dedicated
properties.
`

const Theming = () => {
    const [theme, setTheme] = useState(initialTheme)
    const [mode, setMode] = useState('demo')

    return (
        <Layout>
            <ComponentPage>
                <Seo title="Theming Guide" />
                <ComponentHeader chartClass="Theming" />
                <Description>
                    <Markdown source={description} />
                </Description>
                <Charts>
                    <Nav>
                        <NavItem isCurrent={mode === 'demo'} onClick={() => setMode('demo')}>
                            demo
                        </NavItem>
                        <NavItem isCurrent={mode === 'code'} onClick={() => setMode('code')}>
                            theme object
                        </NavItem>
                    </Nav>
                    {mode === 'demo' && (
                        <>
                            <div>
                                <ResponsiveBar
                                    margin={{
                                        top: 40,
                                        right: 60,
                                        bottom: 50,
                                        left: 60,
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
                                    axisBottom={{
                                        legend: 'X axis legend',
                                        legendPosition: 'middle',
                                        legendOffset: 40,
                                    }}
                                    axisLeft={{
                                        legend: 'Y axis',
                                        legendPosition: 'middle',
                                        legendOffset: -40,
                                    }}
                                />
                            </div>
                            <div>
                                <ResponsiveLine
                                    margin={{
                                        top: 40,
                                        right: 60,
                                        bottom: 50,
                                        left: 60,
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
                                    enablePoints
                                    enablePointLabel
                                    pointSize={10}
                                    theme={theme}
                                    animate={false}
                                    axisBottom={{
                                        legend: 'X axis legend',
                                        legendPosition: 'middle',
                                        legendOffset: 40,
                                    }}
                                    axisLeft={{
                                        legend: 'Y axis legend',
                                        legendPosition: 'middle',
                                        legendOffset: -40,
                                    }}
                                />
                            </div>
                        </>
                    )}
                    {mode === 'code' && (
                        <Code>
                            {`// You can pass this object to the \`theme\` property\n`}
                            {JSON.stringify(theme, null, '    ')}
                        </Code>
                    )}
                </Charts>
                <ComponentSettings
                    component="theming"
                    settings={theme}
                    onChange={setTheme}
                    groups={controlGroups}
                    flavors={[]}
                    currentFlavor="svg"
                />
            </ComponentPage>
        </Layout>
    )
}

export default Theming

const Description = styled.div`
    margin: 30px 0 50px;

    ${media.desktopLarge`
        & {
            padding: 0 40px;
        }
    `}

    ${media.desktop`
        & {
            padding: 0 30px;
        }
    `}

    ${media.tablet`
        & {
            padding: 0 20px;
        }
    `}

    ${media.mobile`
        & {
            padding: 0 20px;
            margin-bottom: 30px;
        }
    `}

    code {
        display: inline-block;
        background: ${({ theme }) => theme.colors.cardBackground};
        border-radius: 2px;
        font-size: 0.9em;
        padding: 5px 7px;
        line-height: 1em;
    }
`

const Nav = styled.nav`
    height: 46px;
    background: ${({ theme }) => theme.colors.background};
    font-size: 15px;
    position: relative;
    display: flex;

    ${media.mobile`
        & {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    `}
`

const NavItem = styled.span`
    cursor: pointer;
    height: 46px;
    display: flex;
    padding: 0 24px;
    justify-content: center;
    align-items: center;
    background: ${({ isCurrent, theme }) =>
        isCurrent ? theme.colors.cardBackground : 'transparent'};
    color: ${({ isCurrent, theme }) => (isCurrent ? theme.colors.text : '#aaa')};

    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
`

const Charts = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.dimensions.headerHeight}px;
    right: 0;
    width: 60%;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    width: calc(var(--innerWidth) * 0.55);
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: var(--innerHeight);
    z-index: 10;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.cardBackground};
    display: flex;
    flex-direction: column;

    & > div:nth-child(2),
    & > div:nth-child(3) {
        height: calc(var(--innerHeight) / 2);
    }

    ${media.tablet`
        & {
            top: ${({ theme }) => theme.dimensions.headerHeight}px;
            right: 0;
            width: 55%;
            height: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
        }
    `}

    ${media.mobile`
        & {
            position: relative;
            top: auto;
            right: auto;
            width: auto;
            height: 520px;
            z-index: 0;
            border-top: 1px solid ${({ theme }) => theme.colors.border};
        }
    `}
`

const Code = styled.pre`
    height: calc(100% - 46px);
    margin: 0;
    background-color: ${({ theme }) => theme.highlight.plain.backgroundColor};
    color: ${({ theme }) => theme.highlight.plain.color};
    font-size: 0.8rem;
    line-height: 1.7;
    padding: 12px 20px;
`
