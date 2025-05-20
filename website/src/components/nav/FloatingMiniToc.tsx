import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { FaCaretRight } from 'react-icons/fa'

interface FloatingMiniTocProps {
    title: ReactNode
    items: {
        label: ReactNode
        anchor: string
    }[]
}

export const FloatingMiniToc = ({ title, items }: FloatingMiniTocProps) => {
    return (
        <Card>
            <Title>{title}</Title>
            <Container>
                {items.map((item, index) => (
                    <Item key={index} href={`#${item.anchor}`}>
                        <FaCaretRight />
                        {item.label}
                    </Item>
                ))}
            </Container>
        </Card>
    )
}

const Card = styled.div`
    position: fixed;
    bottom: 24px;
    right: 24px;
    min-width: 180px;
    max-width: 240px;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 3px 7px 1px rgba(0, 0, 0, 0.05);
`

const Title = styled.h3`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 16px;
    margin: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6px 16px 12px;
`

const Item = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 14px;

    svg {
        color: ${({ theme }) => theme.colors.textLight};
        opacity: 0.5;
        margin-right: 3px;
    }

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        text-decoration: underline;

        svg {
            color: ${({ theme }) => theme.colors.accent};
            opacity: 1;
        }
    }
`
