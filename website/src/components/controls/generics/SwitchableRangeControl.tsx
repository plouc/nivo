import React, { useCallback, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { ControlContext, SwitchableRangeControlConfig } from '../types'
import { ChartPropertyWithControl, Flavor } from '../../../types'
import { Control, TextInput, Switch } from '../ui'

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
    const { disabledValue, defaultValue, min, max, step } = property.control

    const [isSliderEnabled, setIsSliderEnabled] = useState(value !== disabledValue)
    const [sliderValue, setSliderValue] = useState(value === disabledValue ? defaultValue : value)

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
                onChange(disabledValue)
            }
        },
        [onChange, disabledValue, sliderValue, setIsSliderEnabled]
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
                <DisabledValue $isCurrent={!isSliderEnabled}>{disabledValue}</DisabledValue>
            </SwitchRow>
            <RangeRow $isEnabled={isSliderEnabled}>
                <TextInput
                    value={sliderValue}
                    unit={property.control.unit}
                    isNumber={true}
                    disabled={true}
                />
                <input
                    id={`${id}.slider`}
                    type="range"
                    value={sliderValue}
                    onChange={handleSliderUpdate}
                    min={min}
                    max={max}
                    step={step}
                    disabled={!isSliderEnabled}
                />
            </RangeRow>
        </Control>
    )
}

const SwitchRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    & > *:first-child {
        margin-right: 9px;
    }
`

const DisabledValue = styled.span<{ $isCurrent?: boolean }>`
    opacity: ${({ $isCurrent }) => ($isCurrent ? 1 : 0.35)};
    font-weight: 500;
`

const RangeRow = styled.div<{ $isEnabled?: boolean }>`
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 9px;
    align-items: center;
    max-width: 240px;
    margin-bottom: 5px;
    opacity: ${({ $isEnabled }) => ($isEnabled ? 1 : 0.75)};
`
