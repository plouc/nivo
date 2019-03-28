/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import className from 'classnames'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'

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

const RadioControl = memo(({ property, options, value, onChange }) => {
    const handleUpdate = useCallback(event => onChange(event.target.value), [onChange])

    return (
        <Control description={property.description}>
            <PropertyHeader {...property} />
            <Container>
                {options.choices.map(choice => (
                    <Item isSelected={choice.value === value} key={choice.value}>
                        <input
                            type="radio"
                            value={choice.value}
                            checked={value === choice.value}
                            onChange={handleUpdate}
                        />
                        {choice.label}
                    </Item>
                ))}
            </Container>
            <Help>{property.help}</Help>
        </Control>
    )
})

RadioControl.displayName = 'RadioControl'
RadioControl.propTypes = {
    property: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.shape({
        choices: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default RadioControl
