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

export default styled.div`
    margin: 0 50px;
    position: relative;

    ${media.tablet`
        & {
            margin: 0 30px;
        }
    `}

    ${media.mobile`
        & {
            margin: 0 15px;
        }
    `}
`
