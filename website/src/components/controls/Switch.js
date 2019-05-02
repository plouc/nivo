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

const Switch = memo(({ id, value, onChange, colors = {} }) => {
    const handleChange = useCallback(event => onChange(event.target.checked), [onChange])

    return (
        <Wrapper>
            <Input
                id={`${id}.switch`}
                type="checkbox"
                checked={value}
                onChange={handleChange}
                colors={colors}
            />
            <label htmlFor={`${id}.switch`} />
        </Wrapper>
    )
})

Switch.displayName = 'Switch'
Switch.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    colors: PropTypes.shape({
        on: PropTypes.string,
        off: PropTypes.string,
        dot: PropTypes.string,
    }),
}

export default Switch

const Wrapper = styled.span`
    display: inline-block;
    vertical-align: text-bottom;
    margin: 0;
`

const Input = styled.input`
    position: absolute;
    margin-left: -9999px;
    visibility: hidden;

    & + label {
        display: block;
        position: relative;
        cursor: pointer;
        outline: none;
        user-select: none;
        padding: 2px;
        width: 36px;
        height: 18px;
        background-color: ${({ colors }) => colors.off || '#e98473'};
        border-radius: 9px;
        transition: border-color 120ms, background-color 120ms;
    }

    & + label:after {
        content: '';
        display: block;
        position: absolute;
        top: 3px;
        left: 3px;
        width: 12px;
        height: 12px;
        background-color: ${({ colors, theme }) => colors.dot || theme.colors.cardBackground};
        border-radius: 6px;
        transform: translate3d(0, 0, 0);
        transition: transform 120ms;
    }

    &:checked + label {
        background-color: ${({ colors }) => colors.on || '#6dc6b7'};
    }

    &:checked + label:after {
        transform: translate3d(18px, 0, 0);
    }
`
