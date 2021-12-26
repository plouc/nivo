import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import { MdSearch, MdClose } from 'react-icons/md'

interface ComponentsSearchProps {
    term: string
    onChange: (term: string) => void
}

export const ComponentsSearch = memo(({ term, onChange }: ComponentsSearchProps) => {
    const handleSearch = useCallback(event => onChange(event.target.value), [onChange])
    const handleClear = useCallback(() => onChange(''), [onChange])

    return (
        <Container>
            <Input type="text" onChange={handleSearch} placeholder="Search" value={term} />
            <StyledSearchIcon />
            {term.length > 0 && (
                <Clear onClick={handleClear}>
                    <MdClose />
                </Clear>
            )}
        </Container>
    )
})

const Container = styled.div`
    position: relative;
    width: 100%;
`

const Input = styled.input`
    width: 100%;
    padding: 0 44px;
    height: 42px;
    line-height: 38px;
    border: 2px solid ${({ theme }) => theme.colors.borderLight};
    font-size: inherit;
    border-radius: 21px;
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    box-shadow: none;

    &::-webkit-input-placeholder,
    &:-ms-input-placeholder,
    &::-moz-placeholder {
        color: ${({ theme }) => theme.colors.textLight};
    }

    &:focus {
        outline: 0;
        border-color: ${({ theme }) => theme.colors.accent};
        cursor: auto;
    }
`

const StyledSearchIcon = styled(MdSearch)`
    color: ${({ theme }) => theme.colors.accent};
    font-size: 26px;
    position: absolute;
    top: 8px;
    left: 12px;
    cursor: pointer;
`

const Clear = styled.span`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.cardBackground};
    width: 26px;
    height: 26px;
    font-size: 18px;
    border-radius: 13px;
    position: absolute;
    top: 8px;
    right: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        color: white;
    }
`
