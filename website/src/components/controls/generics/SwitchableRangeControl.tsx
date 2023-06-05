import React, { useCallback, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import pick from 'lodash/pick'
import { ControlContext, SwitchableRangeControlConfig } from '../types'
import { ChartProperty, Flavor } from '../../../types'
import { Control, PropertyHeader, Help, TextInput, Switch } from '../ui'

const SwitchRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    & > *:first-child {
        margin-right: 9px;
    }
`

const RangeRow = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 9px;
    align-items: center;
    max-width: 240px;
    margin-bottom: 5px;
`

interface SwitchableRangeControlProps {
    id: string
    property: ChartProperty
    config: SwitchableRangeControlConfig
    flavors: Flavor[]
    currentFlavor: Flavor
    value: number | string
    onChange: (value: number | string) => void
    context?: ControlContext
}

export const SwitchableRangeControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    config,
    onChange,
    context,
}: SwitchableRangeControlProps) => {
    const [isSliderEnabled, setIsSliderEnabled] = useState(value !== config.disabledValue)
    const [sliderValue, setSliderValue] = useState(
        value === config.disabledValue ? config.defaultValue : value
    )

    const handleSliderUpdate = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setSliderValue(Number(e.target.value))
            onChange(Number(e.target.value))
        },
        [setSliderValue, onChange]
    )

    const handleSwitchUpdate = useCallback(
        (checked: boolean) => {
            if (!checked) {
                setIsSliderEnabled(true)
                onChange(Number(sliderValue))
            } else {
                setIsSliderEnabled(false)
                onChange(config.disabledValue)
            }
        },
        [onChange, config.disabledValue, sliderValue, setIsSliderEnabled]
    )

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} context={context} />
            <SwitchRow>
                <Switch
                    id={`${id}.switch`}
                    value={!isSliderEnabled}
                    onChange={handleSwitchUpdate}
                />
                <span
                    style={{
                        color: isSliderEnabled ? '#bbbbbb' : 'inherit',
                    }}
                >
                    {config.disabledValue}
                </span>
            </SwitchRow>
            {isSliderEnabled && (
                <RangeRow>
                    <TextInput value={value} unit={config.unit} isNumber={true} disabled={true} />
                    <input
                        id={`${id}.slider`}
                        type="range"
                        value={sliderValue}
                        onChange={handleSliderUpdate}
                        {...pick(config, ['min', 'max', 'step'])}
                    />
                </RangeRow>
            )}
            <Help>{property.help}</Help>
        </Control>
    )
}
