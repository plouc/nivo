import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import media from '../../../theming/mediaQueries'
import Layout from '../../Layout'
import { Seo } from '../../Seo'
import { ControlsNav } from './ControlsNav'

export const ControlsLayout = ({ title, children }: PropsWithChildren<{ title: string }>) => {
    return (
        <Layout>
            <Seo title={title} description="Easily add controls to your nivo charts." />
            <Container>
                <Header>
                    <Title>{title}</Title>
                    <Tags>
                        <Tag>@nivo/controls</Tag>
                    </Tags>
                </Header>
                <Sidebar>
                    <ControlsNav />
                </Sidebar>
                <Content>{children}</Content>
            </Container>
        </Layout>
    )
}

const Container = styled.div`
    display: grid;
    padding: 0 24px 24px;
    grid-template-columns: 240px auto;
    grid-template-rows: 140px auto;
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    grid-template-areas:
        '-   header'
        'nav content';

    ${media.tablet`
        & {
            padding: 0 16px 16px;
            grid-column-gap: 16px;
            grid-row-gap: 16px;
        }
    `}

    ${media.mobile`
        & {
            padding: 0 12px 12px;
            grid-template-columns: 1fr;
            grid-template-rows: 140px auto auto;
            grid-row-gap: 16px;
            grid-template-areas:
                'header'
                'content'
                'nav';
        }
    `}
`

const Header = styled.header`
    grid-area: header;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 10px;
`

const Title = styled.h1`
    color: white;
    margin: 0 0 10px;
`

const Tags = styled.div`
    display: flex;
`

const Tag = styled.span`
    display: inline-block;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.accent};
    font-size: 0.8rem;
    font-weight: 500;
    padding: 3px 11px;
    border-radius: 2px;
    margin-right: 7px;
`

const Sidebar = styled.aside`
    grid-area: nav;
`

const Content = styled.div`
    grid-area: content;
    display: flex;
    flex-direction: column;
`
