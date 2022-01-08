import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { MiniNavLink } from './MiniNavLink'
import logoImg from '../../assets/icons/nivo-icon.png'
import media from '../../theming/mediaQueries'
import * as nav from '../../data/nav'

export const MiniNav = () => {
    return (
        <Wrapper>
            <Logo to="/">
                <span className="sprite-icons-nivo-logo" />
            </Logo>
            <Container>
                {nav.components.map(item => (
                    <MiniNavLink key={item.id} {...item} />
                ))}
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.aside`
    position: fixed;
    top: 0;
    box-shadow: ${({ theme }) => theme.cardShadow};
    bottom: 0;
    left: 0;
    width: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    z-index: 30;
    background: ${({ theme }) => theme.colors.cardBackground};

    ${media.tablet`
        & {
            display: none;
        }
    `}

    ${media.mobile`
        & {
            display: none;
        }
    `}
`

const Container = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.dimensions.headerHeight}px;
    bottom: 0;
    left: 0;
    width: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    padding-bottom: 20px;
    overflow-x: hidden;
    overflow-y: auto;
`

const Logo = styled(Link)`
    cursor: pointer;
    width: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    height: ${({ theme }) => theme.dimensions.headerHeight}px;
    display: block;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    background-image: url(${logoImg});
    background-size: 60%;
    background-position: center center;
    background-repeat: no-repeat;
`
