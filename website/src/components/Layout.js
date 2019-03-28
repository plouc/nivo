/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from './Header'
import media from '../theming/mediaQueries'
import MiniNav from './nav/MiniNav'

const Layout = ({ children }) => {
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

Layout.propTypes = {
    children: PropTypes.node.isRequired,
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
