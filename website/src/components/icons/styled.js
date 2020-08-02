/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import styled from 'styled-components'
import theme from '../../theming/theme'

export const ICON_SIZE = 104

export const Container = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${ICON_SIZE + 20}px, 1fr));
    background: ${({ theme }) => theme.colors.background};

    .isCapturing & {
        grid-template-columns: repeat(auto-fit, minmax(${ICON_SIZE}px, 1fr));
        background: transparent;
    }
`

export const colors = {
    lightNeutral: {
        background: theme.light.nivo.background,
        text: theme.light.colors.text,
        colors: theme.light.colors.neutralRange,
    },
    lightColored: {
        background: theme.light.nivo.background,
        text: theme.light.colors.text,
        colors: theme.light.colors.coloredRange,
    },
    darkNeutral: {
        background: theme.dark.nivo.background,
        text: theme.dark.colors.text,
        colors: theme.dark.colors.neutralRange,
    },
    darkColored: {
        background: theme.dark.nivo.background,
        text: theme.dark.colors.text,
        colors: theme.dark.colors.coloredRange,
    },
}

export const Icon = styled.div`
    width: ${ICON_SIZE + 20}px;
    height: ${ICON_SIZE + 20}px;
    padding: 10px;
    background-repeat: no-repeat;
    background-size: ${ICON_SIZE}px ${ICON_SIZE}px;
    background-position: center center;
    background-color: ${({ type = 'lightNeutral' }) => colors[type].background};
    color: ${({ type = 'lightNeutral' }) => colors[type].text};

    .isCapturing & {
        width: ${ICON_SIZE}px;
        height: ${ICON_SIZE}px;
        padding: 0;
        background: transparent;
    }
`

export const Colors = styled.div`
    display: grid;
    grid-template-columns: 20px auto;
    font-size: 0.7rem;
    padding: 10px;
`

export const IconImg = ({ url }) => (
    <Icon
        style={{
            backgroundImage: `url(${url})`,
        }}
    />
)
