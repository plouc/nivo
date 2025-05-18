import styled from 'styled-components'
import dedent from 'dedent-js'
import { Markdown } from './Markdown'

interface HelpProps {
    children?: string | undefined
}

export const ControlHelp = ({ children }: HelpProps) => {
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

    a,
    code {
        color: ${({ theme }) => theme.colors.text};

        code {
            color: ${({ theme }) => theme.colors.text};
        }
    }
`
