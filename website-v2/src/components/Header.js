import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import GitHubIcon from 'react-icons/lib/fa/github'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import nav from '../constants/nav.yml'

const topNav = nav.find(({ id }) => id === 'top-nav')

const NavToggle = styled.span`
    display: block;
    // height: $header-height;
    cursor: pointer;
    //background-image: url('../assets/nivo-nav-bars.png');
    background-size: 26px 26px;
    background-repeat: no-repeat;
    background-position: center center;
`

const HeaderElement = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-image: linear-gradient(-90deg, #dc5a32, #c44a67);
    height: ${({ theme }) => theme.headerHeight}px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 10;
`

const HeaderNav = styled.nav`
    position: absolute;
    top: 0;
    right: 50px;
    height: $header-height;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const navItemStyle = css`
    color: ${({ theme }) => theme.colors.background};
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

    svg {
        font-size: 22px;
    }
`

const NavItemLink = styled(Link)`
    ${navItemStyle};
`

const NavItemLinkExt = styled.a`
    ${navItemStyle};
`

const HeaderNavItemSub = styled.span`
    display: none;
    position: absolute;
    top: 100%;
    left: -15px;
    background: ${({ theme }) => theme.colors.cardBackground};
    z-index: 1000;
    border-radius: 2px;
    padding: 10px 0;
    box-shadow: ${({ theme }) => theme.topCardShadow};
`

const HeaderNavItemSubItem = styled(Link)`
    display: block;
    padding: 6px 15px;
    line-height: 1em;
    text-decoration: none;

    &:hover {
        background: ${({ theme }) => theme.colors.cardAltBackground};
    }
`

const NavItem = styled.span`
    ${navItemStyle} &:hover {
        ${HeaderNavItemSub} {
            display: block;
        }
    }
`

export default class Header extends Component {
    static propTypes = {
        // onNavToggle: PropTypes.func.isRequired,
        onThemeChange: PropTypes.func.isRequired,
    }

    handleThemeChange = themeId => () => {
        this.props.onThemeChange(themeId)
    }

    render() {
        const { onNavToggle } = this.props

        return (
            <HeaderElement>
                <NavToggle onClick={onNavToggle} />
                <Link className="brand" to="/" />
                <HeaderNav>
                    {topNav.children.map(child => {
                        if (child.children) {
                            return (
                                <NavItem key={child.label}>
                                    {child.label}
                                    <HeaderNavItemSub>
                                        {child.children.map(subChild => (
                                            <HeaderNavItemSubItem
                                                key={subChild.path}
                                                to={subChild.path}
                                            >
                                                {subChild.label}
                                            </HeaderNavItemSubItem>
                                        ))}
                                    </HeaderNavItemSub>
                                </NavItem>
                            )
                        }

                        return (
                            <NavItemLink key={child.path} to={child.path}>
                                {child.label}
                            </NavItemLink>
                        )
                    })}
                    <NavItemLinkExt
                        href="http://nivo.rocks/storybook/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        storybook
                    </NavItemLinkExt>
                    <NavItemLinkExt
                        href="https://github.com/plouc/nivo"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                    >
                        <GitHubIcon />
                    </NavItemLinkExt>
                    <NavItemLinkExt
                        href="https://twitter.com/benitteraphael"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Twitter"
                    >
                        <TwitterIcon />
                    </NavItemLinkExt>
                    <span onClick={this.handleThemeChange('light')}>light</span>
                    <span onClick={this.handleThemeChange('dark')}>dark</span>
                </HeaderNav>
            </HeaderElement>
        )
    }
}
