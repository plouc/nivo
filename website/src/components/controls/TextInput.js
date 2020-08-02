/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    height: 28px;
    width: 100%;
`

const Unit = styled.span`
    position: absolute;
    top: 1px;
    right: 1px;
    font-size: 12px;
    height: 26px;
    display: flex;
    align-items: center;
    padding: 0 7px;
    pointer-events: none;
    color: ${({ theme }) => theme.colors.textLight};
`

const InputElement = styled.input`
    height: 100%;
    width: 100%;
    font-size: 12px;
    padding: 0 7px;
    padding-right: ${({ hasUnit }) => (hasUnit ? 26 : 7)}px;
    border-radius: 1px;
    background: ${({ theme }) => theme.colors.inputBackground};
    border: 1px solid ${({ theme }) => theme.colors.border};
    cursor: pointer;
    color: inherit;
    text-align: ${({ isNumber }) => (isNumber ? 'right' : 'left')};

    &:focus {
        outline: 0;
        cursor: auto;
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.text};
        box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.accent};
    }

    &:disabled {
        cursor: not-allowed;
        color: ${({ theme }) => theme.colors.textLight};
    }
`

const TextInput = memo(({ unit, isNumber = false, ...props }) => {
    const hasUnit = !!unit

    return (
        <Container>
            <InputElement type="text" hasUnit={hasUnit} isNumber={isNumber} {...props} />
            {hasUnit && <Unit>{unit}</Unit>}
        </Container>
    )
})

TextInput.displayName = 'TextInput'
TextInput.propTypes = {
    isNumber: PropTypes.bool,
    unit: PropTypes.oneOf(['px', '°']),
}

export default TextInput
