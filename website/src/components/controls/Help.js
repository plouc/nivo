import React from 'react'
import styled from 'styled-components'
import dedent from 'dedent-js'
import Markdown from '../Markdown'

export const Container = styled.div`
    display: inline;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textLight};
    
    p {
        display: inline;
    }
    
    a {
        color: ${({ theme }) => theme.colors.text};
    }
`

export const Help = ({ children }) => (
    <Container>
        <Markdown source={dedent(children)} />
    </Container>
)
