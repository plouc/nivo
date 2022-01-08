import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FiX, FiMenu, FiExternalLink, FiChevronDown } from 'react-icons/fi'
import media from '../../theming/mediaQueries'
import ThemeSelector from '../ThemeSelector'
import * as nav from '../../data/nav'

interface HeaderNavProps {
    isNavOpen: boolean
    toggleNav: () => void
}

export const HeaderNav = ({ isNavOpen, toggleNav }: HeaderNavProps) => {
    return (
        <Container>
            <HeaderItem>
                Why nivo? <FiChevronDown />
                <HeaderSub>
                    <HeaderSubItem to="/about/">About</HeaderSubItem>
                    <HeaderSubItem to="/references/">References</HeaderSubItem>
                </HeaderSub>
            </HeaderItem>
            <HeaderInternalLink to="/components/">Components</HeaderInternalLink>
            <HeaderItem>
                Guides <FiChevronDown />
                <HeaderSub>
                    {nav.guides.map(guide => (
                        <HeaderSubItem key={guide.path} to={guide.path}>
                            {guide.label}
                        </HeaderSubItem>
                    ))}
                </HeaderSub>
            </HeaderItem>
            <HeaderExternalLink
                href="https://nivo.rocks/storybook/"
                target="_blank"
                rel="noopener noreferrer"
            >
                storybook
                <FiExternalLink />
            </HeaderExternalLink>
            <HeaderExternalLink
                href="https://opencollective.com/nivo"
                target="_blank"
                rel="noopener noreferrer"
            >
                Donate
                <FiExternalLink />
            </HeaderExternalLink>
            <ThemeSelector />
            <IconExternalLink
                href="https://github.com/plouc/nivo"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
            >
                <FaGithub />
            </IconExternalLink>
            <IconExternalLink
                href="https://twitter.com/benitteraphael"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
            >
                <FaTwitter />
            </IconExternalLink>
            <NavToggleButton onClick={toggleNav}>
                {isNavOpen && <FiX />}
                {!isNavOpen && <FiMenu />}
            </NavToggleButton>
        </Container>
    )
}

const Container = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    height: ${({ theme }) => theme.dimensions.headerHeight}px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    ${media.tablet`
        & {
            left: 0;
            flex-direction: row-reverse;
            padding-right: 16px;
            justify-content: space-between;
        }
    `}

    ${media.mobile`
        & {
            left: 0;
            flex-direction: row-reverse;
            padding-right: 16px;
            justify-content: space-between;
        }
    `}
`

const HeaderSub = styled.span`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: ${({ theme }) => theme.colors.cardBackground};
    z-index: 1000;
    border-radius: 2px;
    padding: 10px 0;
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.2);
    font-size: 12px;
    font-weight: 600;
    min-width: 160px;
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
        font-size: 16px;
        opacity: 0.5;
        margin-left: 5px;
    }

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

const IconExternalLink = styled.a`
    cursor: pointer;
    font-size: 22px;
    color: #ffffff;
    margin-left: 20px;
    display: flex;
    align-items: center;

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

const NavToggleButton = styled.div`
    height: ${({ theme }) => theme.dimensions.headerHeight}px;
    width: ${({ theme }) => theme.dimensions.headerHeight}px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    margin-left: 12px;
    font-size: 24px;
    color: white;

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
