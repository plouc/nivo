/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import GitHubIcon from 'react-icons/lib/fa/github'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import media from '../theming/mediaQueries'
import * as nav from '../data/nav'
import ThemeSelector from './ThemeSelector'

const HeaderNav = () => {
    return (
        <Container>
            <HeaderInternalLink to="/about">About</HeaderInternalLink>
            <HeaderInternalLink to="/references">References</HeaderInternalLink>
            <HeaderInternalLink to="/components">Components</HeaderInternalLink>
            <HeaderItem>
                Guides
                <HeaderSub>
                    {nav.guides.map(guide => (
                        <HeaderSubItem key={guide.path} to={guide.path}>
                            {guide.label}
                        </HeaderSubItem>
                    ))}
                </HeaderSub>
            </HeaderItem>
            <HeaderInternalLink to="/faq">FAQ</HeaderInternalLink>
            <HeaderExternalLink
                href="https://nivo.rocks/storybook/"
                target="_blank"
                rel="noopener noreferrer"
            >
                storybook
            </HeaderExternalLink>
            <HeaderExternalLink
                href="https://opencollective.com/nivo"
                target="_blank"
                rel="noopener noreferrer"
            >
                Donate
            </HeaderExternalLink>
            <ThemeSelector />
            <HeaderExternalLink
                href="https://github.com/plouc/nivo"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
            >
                <GitHubIcon />
            </HeaderExternalLink>
            <HeaderExternalLink
                href="https://twitter.com/benitteraphael"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
            >
                <TwitterIcon />
            </HeaderExternalLink>
        </Container>
    )
}

export default HeaderNav

const Container = styled.nav`
    position: absolute;
    top: 0;
    right: 50px;
    height: ${({ theme }) => theme.dimensions.headerHeight}px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    ${media.tablet`
        & {
            right: ${({ theme }) => theme.dimensions.contentMarginSmall}px;
        }
    `}

    ${media.mobile`
        & {
            display: none;
        }
    `}
`

const HeaderSub = styled.span`
    display: none;
    position: absolute;
    top: 100%;
    left: -15px;
    background: ${({ theme }) => theme.colors.cardBackground};
    z-index: 1000;
    border-radius: 2px;
    padding: 10px 0;
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.2);
    font-size: 12px;
    font-weight: 600;
`

const HeaderSubItem = styled(Link)`
    display: block;
    padding: 7px 15px;
    line-height: 1em;
    text-decoration: none;

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};
    }
`

const itemStyle = css`
    color: white;
    text-decoration: none;
    margin-left: 20px;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    border-bottom: none;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    padding: 6px 0;

    & svg {
        font-size: 22px;
    }
`

const HeaderItem = styled.span`
    ${itemStyle}

    &:hover ${HeaderSub} {
        display: block;
    }
`
const HeaderInternalLink = styled(Link)`
    ${itemStyle}
`
const HeaderExternalLink = styled.a`
    ${itemStyle}
`
