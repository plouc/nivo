import React from 'react'
import styled from 'styled-components'
import dedent from 'dedent-js'
import { Markdown } from '../Markdown'

interface HelpProps {
    children?: string | undefined
}

export const Help = ({ children }: HelpProps) => {
    if (!children) return null

    return (
        <Container>
            <Markdown source={dedent(children)} />
        </Container>
    )
}

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
