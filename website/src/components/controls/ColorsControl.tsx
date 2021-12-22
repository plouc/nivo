import React, { useCallback } from 'react'
import range from 'lodash/range'
import {
    colorSchemeIds,
    colorSchemes,
    colorInterpolatorIds,
    colorInterpolators,
} from '@nivo/colors'
// @ts-ignore
import { components } from 'react-select'
import { ColorsControlItem } from './ColorsControlItem'
import { Control } from './Control'
import { PropertyHeader } from './PropertyHeader'
import { Help } from './Help'
import Select from './Select'
import { ChartProperty, Flavor } from '../../types'
import { ColorsControlConfig } from './types'

const colors = colorSchemeIds.map(id => ({
    id,
    colors: colorSchemes[id],
}))

const sequentialColors = colorInterpolatorIds.map(id => ({
    id: `seq:${id}`,
    colors: range(0, 1, 0.05).map(t => colorInterpolators[id](t)),
}))

const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
        <ColorsControlItem id={props.data.label} colors={props.data.colors} />
    </components.SingleValue>
)

const Option = (props: any) => (
    <components.Option {...props}>
        <ColorsControlItem id={props.value} colors={props.data.colors} />
    </components.Option>
)

interface ColorsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    onChange: any
    value: string
    config: ColorsControlConfig
    context?: any
}

export const ColorsControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    config,
    onChange,
}: ColorsControlProps) => {
    const handleChange = useCallback(
        value => {
            onChange(value.value)
        },
        [onChange]
    )

    let options: any[] = colors
    if (config.includeSequential === true) {
        options = options.concat(sequentialColors)
    }
    options = options.map(({ id, colors }) => ({
        label: id,
        value: id,
        colors,
    }))
    const selectedOption = options.find(o => o.value === value)

    return (
        <Control
            id={id}
            description={property.description}
            flavors={flavors}
            currentFlavor={currentFlavor}
            supportedFlavors={property.flavors}
        >
            <PropertyHeader {...property} />
            <Select
                options={options}
                onChange={handleChange}
                value={selectedOption}
                isSearchable
                components={{
                    SingleValue,
                    Option,
                }}
            />
            <Help>{property.help}</Help>
        </Control>
    )
}
