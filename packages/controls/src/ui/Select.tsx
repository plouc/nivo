import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import ReactSelect, {
    Props,
    CSSObjectWithLabel,
    ControlProps,
    GroupBase,
    SingleValueProps,
    OptionProps,
} from 'react-select'

/**
 * Extends `react-select` default component with styles
 * derived from our custom `styled-components` theme.
 */
export const Select = <Option extends any = unknown, IsMulti extends boolean = boolean>(
    props: Props<Option, IsMulti>
) => {
    const theme = useTheme()
    const styles = useMemo(
        () => ({
            menu: (provided: CSSObjectWithLabel) => ({
                ...provided,
                backgroundColor: theme.colors.panelBackground,
                borderRadius: '2px',
            }),
            option: (
                provided: CSSObjectWithLabel,
                state: OptionProps<Option, IsMulti, GroupBase<Option>>
            ) => {
                let backgroundColor = 'transparent'
                let color = theme.colors.text
                let fontWeight = 400

                if (state.isSelected) {
                    color = theme.colors.accent
                    fontWeight = 600
                }

                if (state.isFocused) {
                    backgroundColor = theme.colors.inputBackground
                }

                return {
                    ...provided,
                    backgroundColor,
                    color,
                    fontWeight,
                }
            },
            control: (
                provided: CSSObjectWithLabel,
                state: ControlProps<Option, IsMulti, GroupBase<Option>>
            ) => {
                let boxShadow = 'none'
                if (state.isFocused) {
                    boxShadow = `0 0 0 2px ${theme.colors.accent}`
                }

                return {
                    ...provided,
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                    minHeight: '24px',
                    borderColor: theme.colors.border,
                    borderRadius: '2px',
                    boxShadow,
                }
            },
            valueContainer: (provided: CSSObjectWithLabel) => {
                return {
                    ...provided,
                    padding: '6px 6px',
                }
            },
            singleValue: (
                provided: CSSObjectWithLabel,
                state: SingleValueProps<Option, IsMulti, GroupBase<Option>>
            ) => {
                return {
                    ...provided,
                    color: state.isDisabled ? theme.colors.textLight : theme.colors.text,
                }
            },
            dropdownIndicator: (provided: CSSObjectWithLabel) => {
                return {
                    ...provided,
                    padding: '4px 6px',
                }
            },
            indicatorSeparator: (provided: CSSObjectWithLabel) => {
                return {
                    ...provided,
                    display: 'none',
                }
            },
        }),
        [theme]
    )

    return <ReactSelect<Option, IsMulti> styles={styles} {...props} />
}
