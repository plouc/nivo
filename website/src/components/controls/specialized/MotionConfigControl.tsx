import React, { ChangeEvent, memo, useCallback, useState } from 'react'
import { config as springConfig } from '@react-spring/web'
import { isString } from 'lodash'
import styled from 'styled-components'
import { ChartProperty, Flavor } from '../../../types'
import { ControlContext, MotionConfigControlConfig } from '../types'
import { Control, PropertyHeader, Help, Radio, Select, Switch } from '../ui'

const presetOptions = Object.keys(springConfig).map(presetId => ({
    value: presetId,
    label: presetId,
}))

const defaultConfig = {
    mass: 1,
    tension: 170,
    friction: 26,
    clamp: false,
    precision: 0.01,
    velocity: 0,
}

interface MotionConfigControlProps {
    id: string
    property: ChartProperty
    flavors: Flavor[]
    currentFlavor: Flavor
    config: MotionConfigControlConfig
    value: any
    onChange: (value: any) => void
    context?: ControlContext
}

export const MotionConfigControl = memo(
    ({
        id,
        property,
        flavors,
        currentFlavor,
        value,
        onChange,
        context,
    }: MotionConfigControlProps) => {
        const type = isString(value) ? 'preset' : 'custom'
        const [preset, setPreset] = useState(type === 'preset' ? value : 'default')
        const [customConfig, setCustomConfig] = useState(type === 'custom' ? value : defaultConfig)

        const handleTypeChange = useCallback(
            event => {
                const newType = event.target.value
                if (newType === 'preset') {
                    onChange(preset)
                } else {
                    onChange(customConfig)
                }
            },
            [onChange]
        )

        const handlePresetChange = useCallback(
            option => {
                setPreset(option.value)
                onChange(option.value)
            },
            [onChange]
        )

        const handleMassChange = (event: ChangeEvent<HTMLInputElement>) => {
            const mass = Number(event.target.value)
            const newCustomConfig = {
                ...customConfig,
                mass,
            }
            setCustomConfig(newCustomConfig)
            onChange(newCustomConfig)
        }

        const handleTensionChange = (event: ChangeEvent<HTMLInputElement>) => {
            const tension = Number(event.target.value)
            const newCustomConfig = {
                ...customConfig,
                tension,
            }
            setCustomConfig(newCustomConfig)
            onChange(newCustomConfig)
        }

        const handleFrictionChange = (event: ChangeEvent<HTMLInputElement>) => {
            const friction = Number(event.target.value)
            const newCustomConfig = {
                ...customConfig,
                friction,
            }
            setCustomConfig(newCustomConfig)
            onChange(newCustomConfig)
        }

        const handleClampChange = (clamp: boolean) => {
            const newCustomConfig = {
                ...customConfig,
                clamp,
            }
            setCustomConfig(newCustomConfig)
            onChange(newCustomConfig)
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
                <Row>
                    <Radio
                        options={[
                            { value: 'preset', label: 'preset' },
                            { value: 'custom', label: 'custom' },
                        ]}
                        value={type}
                        onChange={handleTypeChange}
                    />
                    {type === 'preset' && (
                        <Select
                            options={presetOptions}
                            value={presetOptions.find(option => option.value === value)}
                            onChange={handlePresetChange}
                        />
                    )}
                    {type === 'custom' && (
                        <CustomControls>
                            <label>mass</label>
                            <code className="code-number">{value.mass}</code>
                            <input
                                type="range"
                                value={value.mass}
                                onChange={handleMassChange}
                                min={1}
                                max={500}
                            />

                            <label>tension</label>
                            <code className="code-number">{value.tension}</code>
                            <input
                                type="range"
                                value={value.tension}
                                onChange={handleTensionChange}
                                min={1}
                                max={500}
                            />

                            <label>friction</label>
                            <code className="code-number">{value.friction}</code>
                            <input
                                type="range"
                                value={value.friction}
                                onChange={handleFrictionChange}
                                min={1}
                                max={500}
                            />

                            <Switch
                                value={value.clamp}
                                id={`${id}clamp`}
                                onChange={handleClampChange}
                            />
                            <span />
                            <label htmlFor={`${id}clamp.switch`}>clamp</label>
                        </CustomControls>
                    )}
                </Row>
                <Help>{property.help}</Help>
            </Control>
        )
    }
)

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 9px;
`

const CustomControls = styled.div`
    display: grid;
    grid-template-columns: 50px 25px auto 50px 25px auto;
    align-items: center;
    column-gap: 9px;
    row-gap: 9px;
    margin-bottom: 9px;
`
