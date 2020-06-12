/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { formatSpecifier as parseFormat, FormatSpecifier } from 'd3-format'
import { components } from 'react-select'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import TextInput from './TextInput'
import Switch from './Switch'
import Select from './Select'
import { Help } from './styled'
import CollapseIcon from 'react-icons/lib/fa/chevron-up'
import ExpandIcon from 'react-icons/lib/fa/chevron-down'

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

const typeOptions = [
    {
        value: undefined,
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

const alignOptions = [
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

const signOptions = [
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

const symbolOptions = [
    {
        value: undefined,
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

const Option = props => (
    <components.Option {...props}>
        {props.value === undefined && 'none'}
        {props.value !== undefined && (
            <>
                <strong>{props.label}</strong> {props.data.description}
            </>
        )}
    </components.Option>
)

const ValueFormatControl = memo(({ id, property, flavors, currentFlavor, value, onChange }) => {
    const [isEditing, setIsEditing] = useState(false)
    const formatSpecifier = useMemo(() => parseFormat(value.format), [value.format])

    const handleSwitch = useCallback(
        enabled => {
            onChange({
                format: formatSpecifier.toString(),
                enabled,
            })
        },
        [formatSpecifier, onChange]
    )

    const updateFormat = useCallback(
        (property, propertyValue) => {
            const updatedFormatSpecifier = new FormatSpecifier({
                ...formatSpecifier,
                [property]: propertyValue,
            })

            onChange({
                format: updatedFormatSpecifier.toString(),
                enabled: value.enabled,
            })
        },
        [formatSpecifier, onChange, value.enabled]
    )

    const handleTypeChange = option => {
        updateFormat('type', option.value)
    }

    const handleFillChange = e => {
        updateFormat('fill', e.target.value.slice(1))
    }

    const handleAlignChange = option => {
        updateFormat('align', option.value)
    }

    const handleSignChange = option => {
        updateFormat('sign', option.value)
    }

    const handleSymbolChange = option => {
        updateFormat('symbol', option.value)
    }

    const handleZeroChange = flag => {
        updateFormat('zero', flag)
    }

    const handleWidthChange = e => {
        updateFormat('width', e.target.value)
    }

    const handleCommaChange = flag => {
        updateFormat('comma', flag)
    }

    const handlePrecisionChange = e => {
        updateFormat('precision', e.target.value)
    }

    const handleTrimChange = flag => {
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
            <PropertyHeader id={id} {...property} />
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
                    {isEditing ? <CollapseIcon /> : <ExpandIcon />}
                </ToggleButton>
            </MainControls>
            {isEditing && (
                <SubControls>
                    <label>type</label>
                    <Select
                        options={typeOptions}
                        value={typeOptions.find(option => option.value === formatSpecifier.type)}
                        clearable={false}
                        onChange={handleTypeChange}
                        components={{ Option }}
                    />

                    <label>sign</label>
                    <Select
                        options={signOptions}
                        value={signOptions.find(option => option.value === formatSpecifier.sign)}
                        clearable={false}
                        onChange={handleSignChange}
                        components={{ Option }}
                    />

                    <label>symbol</label>
                    <Select
                        options={symbolOptions}
                        value={symbolOptions.find(
                            option => option.value === formatSpecifier.symbol
                        )}
                        clearable={false}
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
                    <Select
                        options={alignOptions}
                        value={alignOptions.find(option => option.value === formatSpecifier.align)}
                        clearable={false}
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
})

ValueFormatControl.displayName = 'ValueFormatControl'

export default ValueFormatControl
