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

const CodeBlock = ({ children }) => {
    return <Code>{children}</Code>
}

export default CodeBlock

const Code = styled.pre`
    margin: 0;
    background-color: ${({ theme }) => theme.highlight.plain.backgroundColor};
    color: ${({ theme }) => theme.highlight.plain.color};
    font-size: 0.8rem;
    line-height: 1.7;
    padding: 12px 20px;
`
