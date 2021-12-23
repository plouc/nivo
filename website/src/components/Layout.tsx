import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Header from './Header'
import media from '../theming/mediaQueries'
// @ts-ignore
import MiniNav from './nav/MiniNav'

const Layout = ({ children }: PropsWithChildren<{}>) => {
    return (
        <>
            <Header />
            <MiniNav />
            <Content>
                <InnerContent>{children}</InnerContent>
            </Content>
        </>
    )
}

export default Layout

const Content = styled.div`
    margin-top: ${({ theme }) => theme.dimensions.headerHeight}px;
    margin-left: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    overflow-x: hidden;

    .isCapturing & {
        background: transparent;
    }

    ${media.tablet`
        & {
            margin-left: 0;
        }
    `}

    ${media.mobile`
        & {
            margin-left: 0;
        }
    `}
`

const InnerContent = styled.div`
    padding-top: 10px;
    background-image: linear-gradient(
        -90deg,
        ${({ theme }) => theme.colors.gradientColor0},
        ${({ theme }) => theme.colors.gradientColor1}
    );
    background-size: 100% 150px;
    background-repeat: no-repeat;
    background-position: top left;

    .isCapturing & {
        background: transparent;
    }
`
