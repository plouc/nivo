import React, { PropsWithChildren, ReactNode, useState } from 'react'
import styled from 'styled-components'

interface CollapsibleTextExplanationProps {
    title: string
    icon?: ReactNode
    isOpenByDefault?: boolean
}

export const CollapsibleTextExplanation = ({
    title,
    icon = null,
    isOpenByDefault = false,
    children,
}: PropsWithChildren<CollapsibleTextExplanationProps>) => {
    const [isOpen, setIsOpen] = useState(isOpenByDefault)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Container>
            <Header onClick={toggle}>
                {icon}
                {title}
            </Header>
            {isOpen && <Content>{children}</Content>}
        </Container>
    )
}

const Container = styled.div``

const Header = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 6px 12px;
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    color: ${({ theme }) => theme.colors.textLight};
    user-select: none;

    svg {
        color: ${({ theme }) => theme.colors.accent};
        opacity: 0.5;
        margin-right: 9px;
    }

    &:hover {
        color: ${({ theme }) => theme.colors.text};

        svg {
            opacity: 1;
        }
    }
`

const Content = styled.div`
    padding: 9px 16px 16px;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    border-top-width: 0;

    p:last-child {
        margin-bottom: 0;
    }

    code {
        font-size: 14px;
    }
`
