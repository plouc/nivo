/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 14px;
    border-right-width: 0;
    border-bottom-width: 0;
    max-width: 240px;
`

const Item = styled.label`
    cursor: pointer;
    padding: 5px 10px;
    white-space: nowrap;
    text-align: center;
    font-weight: ${({ isSelected }) => (isSelected ? 500 : 400)};
    background: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.cardBackground : theme.colors.background};
    color: ${({ isSelected, theme }) => (isSelected ? theme.colors.text : theme.colors.textLight)};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-top-width: 0;
    border-left-width: 0;
    user-select: none;
    box-shadow: ${({ isSelected }) => (isSelected ? 'none' : '0 1px 1px rgba(0, 0, 0, 0.1) inset')};

    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }

    input {
        display: none;
    }
`

const Radio = memo(({ options, value, onChange }) => {
    return (
        <Container>
            {options.map(option => (
                <Item isSelected={option.value === value} key={option.value}>
                    <input
                        type="radio"
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                    />
                    {option.label}
                </Item>
            ))}
        </Container>
    )
})

Radio.displayName = 'Radio'
Radio.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Radio
