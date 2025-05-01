import React, { memo, useCallback, useMemo, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { formatSpecifier as parseFormat, FormatSpecifier } from 'd3-format'
// @ts-ignore
import { components } from 'react-select'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, ValueFormatControlConfig } from '../types'
import { Control, PropertyHeader, Help, TextInput, Switch, Select } from '../ui'

interface Option<Value = string> {
    value: Value
    label: string
    description: string
}

type TypeOption = Option<FormatSpecifier['type']>
const typeOptions: TypeOption[] = [
    {
        value: '',
        label: 'none',
        description: 'none',
    },
    {
        value: 'e',
        label: 'e',
        description: 'exponent notation.',
    },
    {
        value: 'f',
        label: 'f',
        description: 'fixed point notation.',
    },
    {
        value: 'g',
        label: 'g',
        description: 'either decimal or exponent notation, rounded to significant digits.',
    },
    {
        value: 'r',
        label: 'r',
        description: 'decimal notation, rounded to significant digits.',
    },
    {
        value: 's',
        label: 's',
        description: 'decimal notation with an SI prefix, rounded to significant digits.',
    },
    {
        value: '%',
        label: '%',
        description: 'multiply by 100, and then decimal notation with a percent sign.',
    },
    {
        value: 'p',
        label: 'p',
        description:
            'multiply by 100, round to significant digits, and then decimal notation with a percent sign.',
    },
    {
        value: 'b',
        label: 'b',
        description: 'binary notation, rounded to integer.',
    },
    {
        value: 'o',
        label: 'o',
        description: 'octal notation, rounded to integer.',
    },
    {
        value: 'd',
        label: 'd',
        description: 'decimal notation, rounded to integer.',
    },
    {
        value: 'x',
        label: 'x',
        description: 'hexadecimal notation, using lower-case letters, rounded to integer.',
    },
    {
        value: 'X',
        label: 'X',
        description: 'hexadecimal notation, using upper-case letters, rounded to integer.',
    },
    {
        value: 'c',
        label: 'c',
        description: 'converts the integer to the corresponding unicode character before printing.',
    },
]

type AlignOption = Option<FormatSpecifier['align']>
const alignOptions: AlignOption[] = [
    {
        value: '>',
        label: '>',
        description: 'Force the field to be right-aligned within the available space.',
    },
    {
        value: '<',
        label: '<',
        description: 'Force the field to be left-aligned within the available space.',
    },
    {
        value: '^',
        label: '^',
        description: 'Force the field to be centered within the available space.',
    },
    {
        value: '=',
        label: '=',
        description: 'like >, but with any sign and symbol to the left of any padding.',
    },
]

type SignOption = Option<FormatSpecifier['sign']>
const signOptions: SignOption[] = [
    {
        value: '-',
        label: '-',
        description: 'nothing for zero or positive and a minus sign for negative.',
    },
    {
        value: '+',
        label: '+',
        description: 'a plus sign for zero or positive and a minus sign for negative.',
    },
    {
        value: '(',
        label: '(',
        description: 'nothing for zero or positive and parentheses for negative.',
    },
    {
        value: ' ',
        label: '(space)',
        description: 'a space for zero or positive and a minus sign for negative.',
    },
]

type SymbolOption = Omit<Option<FormatSpecifier['symbol']>, 'description'>
const symbolOptions: SymbolOption[] = [
    {
        value: '',
        label: 'none',
    },
    {
        value: '#',
        label: '#',
    },
    {
        value: '$',
        label: '$',
    },
]

const Option = (props: any) => (
    <components.Option {...props}>
        {props.value === undefined && 'none'}
        {props.value !== undefined && (
            <>
                <strong>{props.label}</strong> {props.data.description}
            </>
        )}
    </components.Option>
)

interface ValueFormatControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: ValueFormatControlConfig
    value: { format: string; enabled: boolean }
    onChange: (value: { format: string; enabled: boolean }) => void
    context?: ControlContext
}

export const ValueFormatControl = memo(
    ({
        id,
        property,
        flavors,
        currentFlavor,
        value,
        onChange,
        context,
    }: ValueFormatControlProps) => {
        const [isEditing, setIsEditing] = useState(false)
        const formatSpecifier = useMemo(() => parseFormat(value.format), [value.format])

        const handleSwitch = useCallback(
            (enabled: boolean) => {
                onChange({
                    format: formatSpecifier.toString(),
                    enabled,
                })
            },
            [formatSpecifier, onChange]
        )

        const updateFormat = useCallback(
            <P extends keyof FormatSpecifier>(property: P, propertyValue: FormatSpecifier[P]) => {
                // Not the most performant way to create a new format specifier, but it's simple enough
                const updatedFormatSpecifier = parseFormat(formatSpecifier.toString())
                updatedFormatSpecifier[property] = propertyValue

                onChange({
                    format: updatedFormatSpecifier.toString(),
                    enabled: value.enabled,
                })
            },
            [formatSpecifier, onChange, value.enabled]
        )

        const handleTypeChange = (option: TypeOption | null) => {
            updateFormat('type', option!.value)
        }

        const handleFillChange = (e: ChangeEvent<HTMLInputElement>) => {
            updateFormat('fill', e.target.value.slice(1))
        }

        const handleAlignChange = (option: AlignOption | null) => {
            updateFormat('align', option!.value)
        }

        const handleSignChange = (option: SignOption | null) => {
            updateFormat('sign', option!.value)
        }

        const handleSymbolChange = (option: SymbolOption | null) => {
            updateFormat('symbol', option!.value)
        }

        const handleZeroChange = (flag: boolean) => {
            updateFormat('zero', flag)
        }

        const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
            updateFormat('width', e.target.value ? Number(e.target.value) : undefined)
        }

        const handleCommaChange = (flag: boolean) => {
            updateFormat('comma', flag)
        }

        const handlePrecisionChange = (e: ChangeEvent<HTMLInputElement>) => {
            updateFormat('precision', e.target.value ? Number(e.target.value) : undefined)
        }

        const handleTrimChange = (flag: boolean) => {
            updateFormat('trim', flag)
        }

        return (
            <Control
                id={id}
                description={property.description}
                flavors={flavors}
                currentFlavor={currentFlavor}
                supportedFlavors={property.flavors}
            >
                <PropertyHeader id={id} {...property} context={context} />
                <MainControls>
                    <Switch value={value.enabled} id={`${id}-enable`} onChange={handleSwitch} />
                    <label
                        htmlFor={`${id}-enable.switch`}
                        style={{ gridColumnStart: 2, gridColumnEnd: 4 }}
                    >
                        enable formatting
                    </label>

                    <label>format</label>
                    <TextInput value={value.format} readOnly />
                    <ToggleButton onClick={() => setIsEditing(flag => !flag)}>
                        <span>{isEditing ? 'close' : 'open'} editor</span>
                        {isEditing ? <FaChevronUp /> : <FaChevronDown />}
                    </ToggleButton>
                </MainControls>
                {isEditing && (
                    <SubControls>
                        <label>type</label>
                        <Select<TypeOption>
                            options={typeOptions}
                            value={typeOptions.find(
                                option => option.value === formatSpecifier.type
                            )}
                            isClearable={false}
                            onChange={handleTypeChange}
                            components={{ Option }}
                        />

                        <label>sign</label>
                        <Select<SignOption>
                            options={signOptions}
                            value={signOptions.find(
                                option => option.value === formatSpecifier.sign
                            )}
                            isClearable={false}
                            onChange={handleSignChange}
                            components={{ Option }}
                        />

                        <label>symbol</label>
                        <Select<SymbolOption>
                            options={symbolOptions}
                            value={symbolOptions.find(
                                option => option.value === formatSpecifier.symbol
                            )}
                            isClearable={false}
                            onChange={handleSymbolChange}
                        />

                        <label>precision</label>
                        <TextInput
                            value={formatSpecifier.precision}
                            isNumber
                            onChange={handlePrecisionChange}
                        />

                        <label>width</label>
                        <TextInput
                            value={formatSpecifier.width}
                            isNumber
                            onChange={handleWidthChange}
                        />

                        <label htmlFor={`${id}.fill`}>fill</label>
                        <TextInput
                            id={`${id}.fill`}
                            value={formatSpecifier.fill}
                            onChange={handleFillChange}
                        />

                        <label>align</label>
                        <Select<AlignOption>
                            options={alignOptions}
                            value={alignOptions.find(
                                option => option.value === formatSpecifier.align
                            )}
                            isClearable={false}
                            onChange={handleAlignChange}
                            components={{ Option }}
                        />

                        <Switch
                            value={formatSpecifier.zero}
                            id={`${id}zero`}
                            onChange={handleZeroChange}
                        />
                        <label htmlFor={`${id}zero.switch`}>zero-padding</label>

                        <Switch
                            value={formatSpecifier.comma}
                            id={`${id}comma`}
                            onChange={handleCommaChange}
                        />
                        <label htmlFor={`${id}comma.switch`}>comma</label>

                        <Switch
                            value={formatSpecifier.trim}
                            id={`${id}trim`}
                            onChange={handleTrimChange}
                        />
                        <label htmlFor={`${id}trim.switch`}>trim trailing zeros</label>
                    </SubControls>
                )}
                <Help>{property.help}</Help>
            </Control>
        )
    }
)

const MainControls = styled.div`
    display: grid;
    grid-template-columns: 60px auto 100px;
    align-items: center;
    row-gap: 9px;
    column-gap: 9px;
    margin: 12px 0;
`

const SubControls = styled.div`
    display: grid;
    grid-template-columns: 60px auto 60px auto;
    align-items: center;
    row-gap: 9px;
    column-gap: 9px;
    margin: 12px 0;
`

const ToggleButton = styled.span`
    cursor: pointer;
    display: grid;
    grid-template-columns: auto 24px;
    grid-column-gap: 9px;
    align-items: center;
    white-space: nowrap;
    color: ${props => props.theme.colors.accent};

    path {
        fill: ${props => props.theme.colors.border};
    }
`
