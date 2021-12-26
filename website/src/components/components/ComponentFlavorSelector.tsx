import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import media from '../../theming/mediaQueries'
import { Flavor } from '../../types'

const labelByFlavor: Record<Flavor, string> = {
    svg: 'svg',
    html: 'html',
    canvas: 'canvas',
    api: 'http api',
}

interface ComponentFlavorSelectorProps {
    flavors: {
        flavor: Flavor
        path: string
    }[]
    current: Flavor
}

export const ComponentFlavorSelector = ({ flavors, current }: ComponentFlavorSelectorProps) => {
    return (
        <Container>
            {flavors.map(flavor => {
                return (
                    <FlavorItem
                        key={flavor.flavor}
                        to={flavor.path}
                        className={current === flavor.flavor ? 'isCurrent' : ''}
                    >
                        {labelByFlavor[flavor.flavor]}
                    </FlavorItem>
                )
            })}
        </Container>
    )
}

const Container = styled.div`
    font-size: 0.8rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    margin-bottom: 40px;
    background: ${({ theme }) => theme.colors.cardBackground};

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
        }
    `}
`

const FlavorItem = styled(Link)`
    display: inline-block;
    position: relative;
    font-weight: 600;
    padding: 16px 0 14px;
    margin-right: 24px;
    text-decoration: none;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textLight};

    &:after {
        content: ' ';
        position: absolute;
        width: 100%;
        background: ${({ theme }) => theme.colors.textLight};
        height: 3px;
        left: 0;
        bottom: 0;
        opacity: 0;
        transform: scale3d(0.4, 1, 1);
        transition: opacity 200ms, transform 200ms;
    }

    &:first-child {
        padding-left: 0;
    }

    &:hover {
        &:after {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
    }

    &.isCurrent {
        color: ${({ theme }) => theme.colors.accent};

        &:after {
            opacity: 1;
            background: ${({ theme }) => theme.colors.accent};
            transform: scale3d(1, 1, 1);
        }
    }
`
