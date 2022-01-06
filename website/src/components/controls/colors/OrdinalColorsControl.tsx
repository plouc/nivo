import React, { useCallback } from 'react'
import {
    colorSchemeIds,
    colorSchemes,
    isCategoricalColorScheme,
    isDivergingColorScheme,
    isSequentialColorScheme,
} from '@nivo/colors'
// @ts-ignore
import { components } from 'react-select'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, OrdinalColorsControlConfig } from '../types'
import { Control, PropertyHeader, Help, Select } from '../ui'
import { ColorsControlItem } from './ColorsControlItem'
import { humanizeColorSchemeId } from './humanizeColorSchemeId'

const options = colorSchemeIds.map(scheme => {
    let colors: string[] = []
    if (isCategoricalColorScheme(scheme)) {
        colors = colorSchemes[scheme] as string[]
    } else if (isDivergingColorScheme(scheme)) {
        colors = colorSchemes[scheme][11] as string[]
    } else if (isSequentialColorScheme(scheme)) {
        colors = colorSchemes[scheme][9] as string[]
    }

    return {
        label: humanizeColorSchemeId(scheme),
        value: scheme,
        colors,
    }
})

const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
        <ColorsControlItem id={props.data.label} colors={props.data.colors} />
    </components.SingleValue>
)

const Option = (props: any) => (
    <components.Option {...props}>
        <ColorsControlItem id={props.label} colors={props.data.colors} />
    </components.Option>
)

interface OrdinalColorsControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: OrdinalColorsControlConfig
    value: { scheme: string }
    onChange: (value: { scheme: string }) => void
    context?: ControlContext
}

export const OrdinalColorsControl = ({
    id,
    property,
    flavors,
    currentFlavor,
    value,
    onChange,
    context,
}: OrdinalColorsControlProps) => {
    const selectedOption = options.find(o => o.value === value.scheme)
    const handleChange = useCallback(
        option => {
            onChange({ scheme: option.value })
        },
        [onChange]
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
            {/*
            <Value>
                {`{ scheme: `}
                <code className="code-string">'{value.scheme}'</code>
                {` }`}
            </Value>
            */}
            <Help>{property.help}</Help>
        </Control>
    )
}
