import styled from 'styled-components'

interface HelpProps {
    children?: string | undefined
}

export const Help = ({ children }: HelpProps) => {
    if (!children) return null

    return <Container>{children}</Container>
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
