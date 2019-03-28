/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import styled from 'styled-components'
import media from '../theming/mediaQueries'

export const FullWidthBanner = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    margin-bottom: 40px;
    padding: 20px;
`

export const DescriptionBlock = styled.div`
    max-width: 800px;
    margin: 0 auto 50px;

    ${media.tablet`
        & {
            margin: 0 15px 50px;
        }
    `}

    ${media.mobile`
        & {
            margin: 0 15px 50px;
        }
    `}
`

export const Card = styled.div`
    background: ${({ theme }) => theme.colors.cardBackground};
    box-shadow: ${({ theme }) => theme.cardShadow};
`
