/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import styled from 'styled-components'

const LabelElement = styled.label`
    display: block;
    white-space: nowrap;
    padding-top: 3px;
    margin: 0;
    font-weight: 500;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.text};
`

export default class Label extends Component {
    render() {
        const { children, ...rest } = this.props

        return <LabelElement {...rest}>{children}</LabelElement>
    }
}
