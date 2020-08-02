/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import ReactSelect from 'react-select'
import { useTheme } from '../../theming/context'

const Select = props => {
    const theme = useTheme()

    const styles = {
        control: (styles, { isFocused }) => {
            return {
                ...styles,
                backgroundColor: theme.colors.inputBackground,
                borderColor: isFocused ? theme.colors.accent : theme.colors.border,
                marginBottom: '5px',
                boxShadow: isFocused ? `0 0 0 1px ${theme.colors.accent}` : null,
                '&:hover': {
                    borderColor: isFocused ? theme.colors.accent : theme.colors.border,
                },
            }
        },
        menu: styles => {
            return {
                ...styles,
                backgroundColor: theme.colors.cardBackground,
            }
        },
        option: (styles, { isSelected, isFocused, isDisabled }) => {
            return {
                ...styles,
                backgroundColor: isSelected
                    ? theme.colors.accent
                    : isFocused
                    ? theme.colors.background
                    : 'transparent',
                color: isDisabled ? theme.colors.textLight : isSelected ? 'white' : 'inherit',
                ':active': {
                    backgroundColor: isSelected ? theme.colors.accent : theme.colors.background,
                },
            }
        },
        singleValue: (styles, { isDisabled }) => {
            return {
                ...styles,
                color: isDisabled ? theme.colors.textLight : theme.colors.text,
            }
        },
        indicatorSeparator: (styles, { isDisabled }) => {
            return {
                ...styles,
                background: isDisabled ? 'rgba(0,0,0,0)' : theme.colors.border,
            }
        },
        dropdownIndicator: styles => {
            return {
                ...styles,
                color: theme.colors.border,
            }
        },
    }

    return <ReactSelect styles={styles} {...props} />
}

export default Select
