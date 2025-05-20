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
            <Header onClick={toggle} $isOpened={isOpen}>
                {icon}
                {title}
            </Header>
            {isOpen && <Content>{children}</Content>}
        </Container>
    )
}

const Container = styled.div``

const Header = styled.div<{
    $isOpened: boolean
}>`
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    padding: 7px 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textLight};
    user-select: none;
    border-radius: ${({ $isOpened }) => ($isOpened ? '3px 3px 0 0' : '3px')};

    svg {
        color: ${({ theme }) => theme.colors.accent};
        margin-right: 9px;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.cardBackground};
    }
`

const Content = styled.div`
    padding: 9px 16px 16px;
    background-color: ${({ theme }) => theme.colors.cardAltBackground};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-top-width: 0;
    border-radius: 0 0 3px 3px;

    p:last-child {
        margin-bottom: 0;
    }

    code {
        font-size: 14px;
    }
`
