import React from 'react'
import styled from 'styled-components'

interface ApiSubmitProps {
    loading: boolean
    onClick: () => void
}

export const ApiSubmit = ({ loading, onClick }: ApiSubmitProps) => {
    return <Button onClick={onClick}>{loading ? 'sending' : 'generate'}</Button>
}

const Button = styled.span`
    display: block;
    background-color: ${({ theme }) => theme.colors.accent};
    color: #fff;
    text-align: center;
    padding: 12px 24px;
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
`
