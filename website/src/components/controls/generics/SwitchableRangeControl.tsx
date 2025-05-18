import React, { useCallback, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import pick from 'lodash/pick.js'
import { ControlContext, SwitchableRangeControlConfig } from '../types'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { Control, TextInput, Switch } from '../ui'

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
    property: ChartPropertyWithControl<SwitchableRangeControlConfig>
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
    onChange,
    context,
}: SwitchableRangeControlProps) => {
    const [isSliderEnabled, setIsSliderEnabled] = useState(value !== property.control.disabledValue)
    const [sliderValue, setSliderValue] = useState(
        value === property.control.disabledValue ? property.control.defaultValue : value
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
                onChange(property.control.disabledValue)
            }
        },
        [onChange, property.control.disabledValue, sliderValue, setIsSliderEnabled]
    )

    return (
        <Control
            id={id}
            property={property}
            flavors={flavors}
            currentFlavor={currentFlavor}
            context={context}
        >
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
                    {property.control.disabledValue}
                </span>
            </SwitchRow>
            {isSliderEnabled && (
                <RangeRow>
                    <TextInput
                        value={value}
                        unit={property.control.unit}
                        isNumber={true}
                        disabled={true}
                    />
                    <input
                        id={`${id}.slider`}
                        type="range"
                        value={sliderValue}
                        onChange={handleSliderUpdate}
                        {...pick(property.control, ['min', 'max', 'step'])}
                    />
                </RangeRow>
            )}
        </Control>
    )
}
