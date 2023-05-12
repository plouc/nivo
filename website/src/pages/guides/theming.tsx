import React, { useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { Seo } from '../../components/Seo'
import { ComponentPage } from '../../components/components/ComponentPage'
import { ComponentHeader } from '../../components/components/ComponentHeader'
import { Markdown } from '../../components/Markdown'
import { ComponentSettings } from '../../components/components/ComponentSettings'
import media from '../../theming/mediaQueries'
import {
    themeProps,
    defaultTheme,
    ThemedBar,
    ThemedHeatMap,
    ThemedLine,
    ThemedRadialBar,
} from '../../components/guides/theming'

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
    const [theme, setTheme] = useState(defaultTheme)
    const [mode, setMode] = useState<'demo' | 'code'>('demo')

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
                            <ThemedBar theme={theme} />
                            <ThemedLine theme={theme} />
                            <ThemedRadialBar theme={theme} />
                            <ThemedHeatMap theme={theme} />
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
                    settings={theme}
                    onChange={setTheme}
                    groups={themeProps}
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

const Charts = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.dimensions.headerHeight}px;
    right: 0;
    --innerWidth: calc(100% - ${({ theme }) => theme.dimensions.miniNavWidth}px);
    --innerInnerWidth: calc(var(--innerWidth) * 0.55);
    width: var(--innerInnerWidth);
    --innerHeight: calc(100% - ${({ theme }) => theme.dimensions.headerHeight}px);
    height: var(--innerHeight);
    z-index: 10;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.cardBackground};
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: 46px minmax(0, 1fr) minmax(0, 1fr);

    ${media.tablet`
        & {
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
            height: 500px;
            z-index: 0;
            border-top: 1px solid ${({ theme }) => theme.colors.border};
        }
    `}
`

const Nav = styled.nav`
    grid-column-start: 1;
    grid-column-end: 3;
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

const NavItem = styled.span<{
    isCurrent: boolean
}>`
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

const Code = styled.pre`
    margin: 0;
    background-color: ${({ theme }) => theme.highlight.plain.backgroundColor};
    color: ${({ theme }) => theme.highlight.plain.color};
    font-size: 0.8rem;
    line-height: 1.7;
    padding: 12px 20px;
    overflow-y: auto;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
`
