/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import styled from 'styled-components'

export const ICON_SIZE = 104

export const Container = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(8, ${ICON_SIZE}px);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    // background: black;
`

export const Icon = styled.div`
    width: ${ICON_SIZE}px;
    height: ${ICON_SIZE}px;
    background-repeat: no-repeat;
    background-size: ${ICON_SIZE}px ${ICON_SIZE}px;
`
