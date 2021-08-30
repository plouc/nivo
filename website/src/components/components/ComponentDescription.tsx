import React, { memo } from 'react'
import styled from 'styled-components'
import { Markdown } from '../Markdown'
import media from '../../theming/mediaQueries'

export const ComponentDescription = memo(({ description }: { description: string }) => (
    <Description>
        <Markdown source={description} />
    </Description>
))

const Description = styled.div`
    padding: 30px 0;
    margin-bottom: 50px;

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

    code {
        display: inline-block;
        background: ${({ theme }) => theme.colors.cardBackground};
        border-radius: 2px;
        font-size: 0.9em;
        padding: 5px 7px;
        line-height: 1em;
    }
`
