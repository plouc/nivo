/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SearchIcon from 'react-icons/lib/md/search'
import ClearIcon from 'react-icons/lib/md/close'

const ComponentsSearch = memo(({ term, onChange, style }) => {
    const handleSearch = useCallback(event => onChange(event.target.value), [onChange])
    const handleClear = useCallback(() => onChange(''), [onChange])

    return (
        <Container style={style}>
            <Input type="text" onChange={handleSearch} placeholder="Search" value={term} />
            <StyledSearchIcon />
            {term.length > 0 && (
                <Clear onClick={handleClear}>
                    <ClearIcon />
                </Clear>
            )}
        </Container>
    )
})

ComponentsSearch.displayName = 'ComponentsSearch'
ComponentsSearch.propTypes = {
    term: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
}

export default ComponentsSearch

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

const StyledSearchIcon = styled(SearchIcon)`
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
