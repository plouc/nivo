/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import media from '../../theming/mediaQueries'

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

const Flavor = styled(Link)`
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

const labelByFlavor = {
    svg: 'svg',
    html: 'html',
    canvas: 'canvas',
    api: 'http api',
}

const ComponentFlavorSelector = ({ flavors, current }) => {
    return (
        <Container>
            {flavors.map(flavor => {
                return (
                    <Flavor
                        key={flavor.flavor}
                        to={flavor.path}
                        className={current === flavor.flavor ? 'isCurrent' : ''}
                    >
                        {labelByFlavor[flavor.flavor]}
                    </Flavor>
                )
            })}
        </Container>
    )
}

ComponentFlavorSelector.propTypes = {
    flavors: PropTypes.arrayOf(
        PropTypes.shape({
            flavor: PropTypes.oneOf(['svg', 'html', 'canvas', 'api']),
            path: PropTypes.string.isRequired,
        })
    ).isRequired,
    current: PropTypes.string.isRequired,
}

export default ComponentFlavorSelector
