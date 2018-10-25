import React, { Component } from 'react'
import styled from 'styled-components'

const LabelElement = styled.label`
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
`

export default class Label extends Component {
    render() {
        const { children, ...rest } = this.props

        return <LabelElement {...rest}>{children}</LabelElement>
    }
}
