/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { useTheme } from '../../theming/context'

const Label = styled.span`
    display: flex;
    position: absolute;
    left: 110%;
    top: 50%;
    height: 30px;
    font-size: 13px;
    font-weight: 600;
    white-space: pre;
    align-items: center;
    background: ${({ theme }) => theme.colors.accent};
    color: white;
    text-decoration: none;
    margin-top: -15px;
    padding: 0 10px;
    border-radius: 2px;
    z-index: 3;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    min-width: ${({ theme }) => theme.dimensions.miniNavItemSize}px;
    pointer-events: none;
    transform: translate3d(20px, 0, 0);
    opacity: 0;
    transition: opacity 200ms, transform 200ms;
    display: none;
`

const Item = styled(Link)`
    display: block;
    cursor: pointer;
    width: ${({ theme }) => theme.dimensions.miniNavWidth}px;
    height: ${({ theme }) => theme.dimensions.miniNavItemSize}px;
    position: relative;
    text-decoration: none;

    &:before {
        content: '';
        position: absolute;
        display: block;
        width: ${({ theme }) => theme.dimensions.miniNavItemSize}px;
        height: ${({ theme }) => theme.dimensions.miniNavItemSize}px;
        border-radius: 100%;
        background: ${({ theme }) => theme.colors.background};
        opacity: 0;
        top: 0;
        left: ${({ theme }) =>
            (theme.dimensions.miniNavWidth - theme.dimensions.miniNavItemSize) / 2}px;
        transform: scale(0.6);
        transition: opacity 200ms, transform 400ms;
        z-index: 1;
    }

    &:hover:before {
        opacity: 1;
        transform: scale(0.96);
    }

    &:hover ${Label} {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`

const Icon = styled.span`
    display: block;
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
    transform: scale(0.76);
    transform-origin: top left;
    z-index: 2;
    pointer-events: none;
`

const MiniNavLink = memo(({ path, icon, label }) => {
    const theme = useTheme()
    const getProps = ({ isPartiallyCurrent }) => {
        return {
            children: (
                <>
                    <Icon
                        className={`sprite-icons-${icon}-${theme.id}-${
                            isPartiallyCurrent ? 'colored' : 'neutral'
                        }`}
                    />
                    <Label>{label}</Label>
                </>
            ),
        }
    }

    return <Item to={path} getProps={getProps} />
})

MiniNavLink.displayName = 'MiniNavLink'

export default MiniNavLink
