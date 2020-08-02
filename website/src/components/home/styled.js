/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import styled from 'styled-components'
import { Link } from 'gatsby'
import media from '../../theming/mediaQueries'

export const Container = styled.div`
    position: fixed;
    background: ${({ theme }) => theme.colors.coloredRange[2]};
    width: 100%;
    height: 100%;
    padding: 10px;
    display: grid;

    ${media.desktopLarge`
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
    `}

    ${media.desktop`
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
    `}

    ${media.tablet`
        grid-template-columns: 1fr 1fr;
        overflow-y: auto;
    `}

    ${media.mobile`
        grid-template-columns: 1fr 1fr;
        overflow-y: auto;
    `}
`

export const HomeItemLabel = styled.span`
    display: block;
    position: absolute;
    text-align: center;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -12px;
    opacity: 0;
    transform: translate(0, 15px);
    transition: all 400ms;

    & span {
        background: #fff;
        color: ${({ theme }) => theme.colors.accent};
        font-size: 14px;
        line-height: 1em;
        padding: 5px 9px;
        border-radius: 2px;
    }
`

export const HomeItem = styled(Link)`
    overflow: hidden;
    padding: 15px;
    position: relative;
    display: block;

    &:hover {
        background: ${({ theme }) => theme.colors.coloredRange[1]};

        ${HomeItemLabel} {
            opacity: 1;
            transform: translate(0, 0);
        }
    }

    ${media.tablet`
        height: 240px;
    `}

    ${media.mobile`
        height: 180px;
    `}
`

export const HomeLogo = styled(Link)`
    background-position: center center;
    background-size: 60%;
    background-repeat: no-repeat;

    &:hover {
        background-color: ${({ theme }) => theme.colors.coloredRange[1]};
    }

    ${media.tablet`
        grid-column-start: 1;
        grid-row-start: 1;
        height: 120px;
        background-size: 40%;
    `}

    ${media.mobile`
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        height: 90px;
        padding: 0 50px;
        background-size: 30%;
    `}
`

export const HomeBaseline = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-weight: 300;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 26px;
    padding: 0 20px;

    ${media.tablet`
        grid-column-start: 2;
        grid-row-start: 1;
        height: 120px;
        padding: 0 20px;
    `}

    ${media.mobile`
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 2;
        height: auto;
        padding: 20px 50px 30px;
    `}
`
